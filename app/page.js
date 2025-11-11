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
import { links, funcionarios } from '@/app/data';

const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 35%; /* Coluna principal flexível, barra lateral com 35% */
  grid-template-rows: 100vh;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  gap: 1rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;
    overflow-y: auto;
  }
`;

const MainColumn = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0; /* Essencial para o flexbox funcionar corretamente em altura */
`;

const DashboardWrapper = styled.div`
  width: 100%;
  flex: 1; /* Ocupa a maior parte do espaço */
  min-height: 0; /* Permite que o iframe encolha */
  border-radius: 8px;
  overflow: hidden;
`;

const KpiWrapper = styled.div`
  width: 100%;
  height: 25%; /* Altura fixa para a seção de KPIs */
`;

const Sidebar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  min-height: 0;
`;

const initialKpis = [
  { titulo: "Comercial | No...", valor: "90", cor: "#4ade80" },
  { titulo: "Suporte Técni...", valor: "4.70", cor: "#facc15" },
  { titulo: "Comercial | Up...", valor: "25", cor: "#f87171" },
  { titulo: "Equipe Técni...", valor: "300", cor: "#60a5fa" }
];
const initialComunicados = [
  { id: 1, tipo: 'AVISO', texto: 'Escala Final de Semana: Sábado de Manhã - Rafael e Edvanildo | Sáb tarde e Dom - Edmilson e Josenilson | NOC: Folga: Jean e Matheus' },
  { id: 2, tipo: 'EVENTO', texto: 'Reunião geral de alinhamento amanhã, 10 de outubro às 10:00.' }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aniversarianteHoje, setAniversarianteHoje] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [kpis, setKpis] = useState(initialKpis);
  const [comunicados, setComunicados] = useState(initialComunicados);
  const [showAdmin, setShowAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Efeito para login persistente
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
    try {
      const docRef = doc(db, 'paineis', 'dados');
      await updateDoc(docRef, { kpis: newKpis });
    } catch (error) {
      console.error("Erro ao salvar KPIs:", error);
    }
  };

  const saveComunicados = async (newComunicados) => {
    try {
      const docRef = doc(db, 'paineis', 'dados');
      await updateDoc(docRef, { comunicados: newComunicados });
    } catch (error) {
      console.error("Erro ao salvar Comunicados:", error);
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const rotationTimer = setInterval(() => {
      if (!aniversarianteHoje) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % links.length);
      }
    }, 25000);
    return () => clearInterval(rotationTimer);
  }, [aniversarianteHoje, isPaused, links.length]);

  // --- LÓGICA DE ANIVERSÁRIO CORRIGIDA ---
  useEffect(() => {
    // Função que verifica o aniversário e o horário
    const checkBirthday = () => {
      const agora = new Date();
      const diaAtual = agora.getDate();
      const mesAtual = agora.getMonth() + 1;
      const hora = agora.getHours();
      const minuto = agora.getMinutes();

      // 1. VERIFICA O HORÁRIO
      // Define os horários desejados para tocar
      const eHoraDeTocar = (hora === 10 && minuto === 30) || (hora === 15 && minuto === 30);

      // 2. VERIFICA O ANIVERSARIANTE
      // Encontra o aniversariante do dia na sua lista de dados
      const aniversarianteDoDia = funcionarios.find(
        (f) => f.dia === diaAtual && f.mes === mesAtual
      );

      // 3. TOCA A MÚSICA SE AMBAS CONDIÇÕES FOREM VERDADEIRAS
      // Só ativa o overlay se for a hora certa E se houver um aniversariante
      if (eHoraDeTocar && aniversarianteDoDia) {
        setAniversarianteHoje(aniversarianteDoDia);
      }
    };
    
    // 4. VERIFICA A CADA MINUTO
    // Mantém o intervalo de 60 segundos para "pegar" o minuto exato
    const interval = setInterval(checkBirthday, 60000); 

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(interval);
    
  }, []); // O array de dependências vazio está correto
  // --- FIM DA LÓGICA DE ANIVERSÁRIO ---

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

        <BirthdayOverlay
          aniversariante={aniversarianteHoje}
          onMusicEnd={() => setAniversarianteHoje(null)}
        />
      </MainContainer>
    </ThemeProvider>
  );
}