'use client';
import styled, { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { theme } from '@/app/theme'; 

import Header from "@/app/components/Header";
import DashboardRotator from "@/app/components/DashboardRotator";
import AniversariantesWidget from "@/app/components/AniversariantesWidget";
import KpiWidget from "@/app/components/KpiWidget";
import ComunicadosWidget from "@/app/components/ComunicadosWidget";
import BirthdayOverlay from "@/app/components/BirthdayOverlay";
import Admin from "@/app/components/Admin"; // --- CORREÇÃO ADICIONADA AQUI ---
import { links, funcionarios } from '@/app/data';

// --- Styled Components ---
const MainContainer = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 8px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  /* --- CORREÇÃO DE RESPONSIVIDADE ADICIONADA AQUI --- */
  @media (max-width: 1200px) {
    flex-direction: column;
    height: auto; /* Permite que a página cresça verticalmente */
    overflow-y: auto; /* Adiciona scroll se necessário */
  }
`;

const MainColumn = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 8px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 100%;
    height: auto;
    padding-right: 0;
    margin-bottom: 8px;
  }
`;

const DashboardWrapper = styled.div`
  width: 100%;
  flex-grow: 1;

  @media (max-width: 1200px) {
    height: 60vh; /* Define uma altura mínima para o dashboard em telas menores */
  }
`;

const Sidebar = styled.div`
  width: 30%;
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

// --- DADOS INICIAIS (sem alterações) ---
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
  const [kpis, setKpis] = useState(initialKpis);
  const [comunicados, setComunicados] = useState(initialComunicados);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  // Rotação do Dashboard (sem alterações)
  useEffect(() => {
    if (isPaused) return; 
    const rotationTimer = setInterval(() => {
      if (!aniversarianteHoje) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % links.length);
      }
    }, 25000);
    return () => clearInterval(rotationTimer);
  }, [aniversarianteHoje, isPaused]);

  // Checagem de Aniversário (sem alterações)
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

  // Recarregamento da Página (sem alterações)
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 1800000); 

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
          setKpis={setKpis}
          comunicados={comunicados}
          setComunicados={setComunicados}
        />
        
        <BirthdayOverlay
          aniversariante={aniversarianteHoje}
          onMusicEnd={() => setAniversarianteHoje(null)}
        />
      </MainContainer>
    </ThemeProvider>
  );
}

