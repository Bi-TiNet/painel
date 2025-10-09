'use client';
import styled, { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { theme } from '@/app/theme';
import { db } from '@/app/firebaseConfig';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

// ... (todas as outras importações e styled-components)
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
  grid-template-columns: 1fr 350px;
  grid-template-rows: 100vh;
  width: 100vw;
  height: 100vh;
  padding: 8px;
  gap: 8px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    height: auto;
    overflow-y: auto;
  }
`;

const MainColumn = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 100%;
    height: auto;
  }
`;

const DashboardWrapper = styled.div`
  width: 100%;
  flex-grow: 1;

  @media (max-width: 1200px) {
    height: 60vh;
  }
`;

const Sidebar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 100%;
    height: auto;
  }
`;
const initialKpis = [
  { titulo: "Clientes Ativos", valor: "1.245", cor: "#4ade80" },
  { titulo: "Tickets Abertos", valor: "27", cor: "#facc15" },
  { titulo: "Bloqueados Hoje", valor: "8", cor: "#f87171" },
  { titulo: "OS Finalizadas", valor: "93", cor: "#60a5fa" }
];
const initialComunicados = [
  { id: 1, tipo: 'AVISO', texto: 'Reunião geral de alinhamento amanhã às 10:00.' },
  { id: 2, tipo: 'META', texto: 'Parabéns à equipe de Suporte por atingir a meta de satisfação!' }
];


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aniversarianteHoje, setAniversarianteHoje] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [kpis, setKpis] = useState(initialKpis); // Inicia com os dados padrão para evitar tela vazia
  const [comunicados, setComunicados] = useState(initialComunicados); // Inicia com os dados padrão
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const docRef = doc(db, 'paineis', 'dados');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setKpis(data.kpis || initialKpis);
        setComunicados(data.comunicados || initialComunicados);
      } else {
        console.log("Documento não encontrado no Firebase. Criando com dados iniciais...");
        setDoc(docRef, { kpis: initialKpis, comunicados: initialComunicados })
          .catch(error => console.error("Erro ao criar documento:", error));
      }
    }, (error) => {
        console.error("Erro no listener do Firestore:", error);
    });
    return () => unsubscribe();
  }, []);

  const saveKpis = async (newKpis) => {
    try {
      const docRef = doc(db, 'paineis', 'dados');
      await updateDoc(docRef, { kpis: newKpis });
      console.log("KPIs salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar KPIs:", error);
    }
  };

  const saveComunicados = async (newComunicados) => {
    try {
      const docRef = doc(db, 'paineis', 'dados');
      await updateDoc(docRef, { comunicados: newComunicados });
      console.log("Comunicados salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar Comunicados:", error);
    }
  };

  // ... (O resto do arquivo continua exatamente o mesmo)
  // Rotação do Dashboard
  useEffect(() => {
    if (isPaused) return;
    const rotationTimer = setInterval(() => {
      if (!aniversarianteHoje) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % links.length);
      }
    }, 25000);
    return () => clearInterval(rotationTimer);
  }, [aniversarianteHoje, isPaused]);

  // Checagem de Aniversário
  useEffect(() => {
    const checkBirthday = () => {
      const agora = new Date();
      const dia = agora.getDate();
      const mes = agora.getMonth() + 1;
      const hora = agora.getHours();
      const minuto = agora.getMinutes();
      const celebrationTimes = ["10:00", "16:30"];
      const currentTime = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;

      if (celebrationTimes.includes(currentTime)) {
        const aniversariantesDoDia = funcionarios.find(f => f.dia === dia && f.mes === mes);
        if (aniversariantesDoDia) {
          setAniversarianteHoje(aniversariantesDoDia);
        }
      }
    };
    checkBirthday();
    const checkInterval = setInterval(checkBirthday, 60000);
    return () => clearInterval(checkInterval);
  }, []);

  // Recarregamento da Página
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 1800000); // 30 minutos

    return () => clearInterval(refreshInterval);
  }, []);

  const handleSelectPanel = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
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
            onTogglePause={handleTogglePause}
            onSelectPanel={handleSelectPanel}
            panels={links}
            onAdminClick={() => loggedInUser ? setLoggedInUser(null) : setShowLogin(true)}
          />
          <DashboardWrapper>
            <DashboardRotator dashboard={currentDashboard} />
          </DashboardWrapper>
        </MainColumn>

        <Sidebar>
          <AniversariantesWidget />
          <KpiWidget kpis={kpis} />
          <ComunicadosWidget comunicados={comunicados} />
        </Sidebar>

        <Admin
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          kpis={kpis}
          setKpis={saveKpis}
          comunicados={comunicados}
          setComunicados={saveComunicados}
        />

        <BirthdayOverlay
          aniversariante={aniversarianteHoje}
          onMusicEnd={() => setAniversarianteHoje(null)}
        />
      </MainContainer>
    </ThemeProvider>
  );
}

