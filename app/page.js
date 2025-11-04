'use client';
import styled, { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { theme } from '@/app/theme';
import { db } from '@/app/firebaseConfig';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

import Header from "@/app/components/Header";
import DashboardRotator from "@/app/components/DashboardRotator";
import AniversariantesWidget from "@/app/components/AniversariantesWidget";
import KpiWidget from "@/app/components/KpiWidget";
import ComunicadosWidget from "@/app/components/ComunicadosWidget";
import BirthdayOverlay from "@/app/components/BirthdayOverlay";
import Admin from "@/app/components/Admin";
// Importamos 'funcionarios' do seu data.js
import { links, funcionarios } from '@/app/data';

// ... (Seus styled-components: MainContainer, MainColumn, etc. não mudam) ...
// CORREÇÃO: Substituímos '...' por template literals vazios ``
// Você deve preencher com seus estilos reais.
const MainContainer = styled.main`
  /* Insira seus estilos para MainContainer aqui */
`;
const MainColumn = styled.div`
  /* Insira seus estilos para MainColumn aqui */
`;
const DashboardWrapper = styled.div`
  /* Insira seus estilos para DashboardWrapper aqui */
`;
const KpiWrapper = styled.div`
  /* Insira seus estilos para KpiWrapper aqui */
`;
const Sidebar = styled.div`
  /* Insira seus estilos para Sidebar aqui */
`;

// ... (Seus initialKpis e initialComunicados não mudam) ...
// CORREÇÃO: Substituímos '[...]' por arrays vazios '[]'
const initialKpis = [];
const initialComunicados = [];


// --- NOVA LÓGICA DE ANIVERSÁRIO ---

// 1. Defina os horários e músicas
const birthdaySongs = [
  { time: '11:00', path: '/singles/padrao.mp3' },
  { time: '15:00', path: '/singles/padrao.mp3' }
];

// 2. Log para não tocar a música mais de uma vez
let musicPlayLog = {};
// --- FIM DA NOVA LÓGICA ---


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // O estado 'aniversarianteHoje' será usado para mostrar o overlay
  const [aniversarianteHoje, setAniversarianteHoje] = useState(null); 
  // NOVO ESTADO: Controla qual música tocar
  const [musicaParaTocar, setMusicaParaTocar] = useState(null);

  const [isPaused, setIsPaused] = useState(false);
  const [kpis, setKpis] = useState(initialKpis);
  const [comunicados, setComunicados] = useState(initialComunicados);
  const [showAdmin, setShowAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Efeito para login persistente e Firebase (não muda)
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }

    const docRef = doc(db, 'paineis', 'dados');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setKpis(data.kpis || initialKpis);
        setComunicados(data.comunicados || initialComunicados);
      } else {
        setDoc(docRef, { kpis: initialKpis, comunicados: initialComunicados });
      }
    });

    return () => unsubscribe();
  }, []);

  // Funções de Admin e Firebase (não mudam)
  const handleLoginSuccess = (user) => {
    localStorage.setItem('loggedInUser', user);
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    setShowAdmin(false);
  };
  
  const saveKpis = async (newKpis) => {
    // ... (lógica de salvar kpis) ...
    try {
      const docRef = doc(db, 'paineis', 'dados');
      await updateDoc(docRef, { kpis: newKpis });
    } catch (error) {
      console.error("Erro ao salvar KPIs:", error);
    }
  };

  const saveComunicados = async (newComunicados) => {
    // ... (lógica de salvar comunicados) ...
     try {
      const docRef = doc(db, 'paineis', 'dados');
      await updateDoc(docRef, { comunicados: newComunicados });
    } catch (error) {
      console.error("Erro ao salvar Comunicados:", error);
    }
  };

  // useEffect da rotação (não muda)
  useEffect(() => {
    if (isPaused) return;
    const rotationTimer = setInterval(() => {
      // Verificamos 'aniversarianteHoje' do estado
      if (!aniversarianteHoje) { 
        setCurrentIndex((prevIndex) => (prevIndex + 1) % links.length);
      }
    }, 25000);
    return () => clearInterval(rotationTimer);
  }, [aniversarianteHoje, isPaused, links.length]);

  // --- useEffect DE ANIVERSÁRIO (SUBSTITUÍDO) ---
  // Substituímos o useEffect 'checkBirthday' por este:
  useEffect(() => {
    const checkBirthdayMusic = () => {
      const now = new Date();
      const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      // 1. Reseta o log se for um novo dia
      if (!musicPlayLog[todayKey]) {
        musicPlayLog = { [todayKey]: [] };
        console.log("Novo dia! Resetando log de músicas.");
      }

      // 2. Encontra aniversariantes do dia
      const diaAtual = now.getDate();
      const mesAtual = now.getMonth() + 1;
      // Usamos 'dia' e 'mes' como definido no seu data.js
      const aniversariantesHoje = funcionarios.filter(f => f.dia === diaAtual && f.mes === mesAtual);

      if (aniversariantesHoje.length === 0) {
        return; // Ninguém faz aniversário hoje
      }

      const aniversariante = aniversariantesHoje[0]; // Pega o primeiro

      // 3. Verifica se é hora de tocar
      const songToPlay = birthdaySongs.find(song => song.time === currentTime);

      if (songToPlay && !musicPlayLog[todayKey].includes(songToPlay.time)) {
        console.log(`Hora de tocar! ${currentTime} para ${aniversariante.nome}`);
        
        // Marca como tocado
        musicPlayLog[todayKey].push(songToPlay.time);
        
        // ATIVA O OVERLAY!
        setAniversarianteHoje(aniversariante);
        setMusicaParaTocar(songToPlay.path);
      }
    };

    // 4. Roda o verificador a cada 60 segundos
    const intervalId = setInterval(checkBirthdayMusic, 60000);
    
    // 5. Limpa o intervalo
    return () => clearInterval(intervalId);
  }, []); // Roda apenas uma vez na montagem

  // ATUALIZADO: Função para fechar o overlay
  const handleMusicEnd = () => {
    console.log("Música terminou, fechando overlay.");
    setAniversarianteHoje(null);
    setMusicaParaTocar(null);
  };

  const currentDashboard = links[currentIndex];
  const tituloPainel = currentDashboard ? currentDashboard.nome : "Carregando...";

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <MainColumn>
          <Header
            titulo={tituloPainel}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused(!isPaused)}
            onSelectPanel={(index) => { setCurrentIndex(index); setIsPaused(true); }}
            panels={links}
            loggedInUser={loggedInUser}
            onAdminClick={() => setShowAdmin(true)}
            onLogout={handleLogout}
          />
          <DashboardWrapper>
            <DashboardRotator dashboard={currentDashboard} />
          </DashboardWrapper>
          <KpiWrapper>
            <KpiWidget kpis={kpis} />
          </KpiWrapper>
        </MainColumn>

        <Sidebar>
          <AniversariantesWidget />
          <ComunicadosWidget comunicados={comunicados} />
        </Sidebar>

        {showAdmin && (
          <Admin
            loggedInUser={loggedInUser}
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setShowAdmin(false)}
            kpis={kpis}
            setKpis={saveKpis}
            comunicados={comunicados}
            setComunicados={saveComunicados}
          />
        )}

        {/* ATUALIZADO: Renderização condicional e props corretas */}
        {aniversarianteHoje && (
          <BirthdayOverlay
            aniversariante={aniversarianteHoje}
            musicaSrc={musicaParaTocar}
            onMusicEnd={handleMusicEnd}
          />
        )}
      </MainContainer>
    </ThemeProvider>
  );
}