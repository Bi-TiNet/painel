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
import Admin from "@/app/components/Admin";
import { links, funcionarios } from '@/app/data';

// --- Dados Iniciais ---
const initialKpis = [
  { titulo: "Clientes Ativos", valor: "1.245", cor: "#4ade80" },
  { titulo: "Tickets Abertos", valor: "27", cor: "#facc15" },
  { titulo: "Bloqueados Hoje", valor: "8", cor: "#f87171" },
  { titulo: "OS Finalizadas", valor: "93", cor: "#60a5fa" }
];
const initialComunicados = [
  { id: 1, tipo: 'AVISO', texto: 'Reunião geral de alinhamento amanhã às 10:00.' },
  { id: 2, tipo: 'META', texto: 'Parabéns à equipe de Suporte por atingir a meta de satisfação!' },
  { id: 3, tipo: 'EVENTO', texto: 'Nossa confraternização de fim de ano será no dia 15/12.' },
];

// --- Componentes de Layout ---
const MainContainer = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 8px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;
const MainColumn = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 8px;
  box-sizing: border-box;
`;
const DashboardWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
`;
const Sidebar = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
`;

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aniversarianteHoje, setAniversarianteHoje] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const [kpis, setKpis] = useState(initialKpis);
  const [comunicados, setComunicados] = useState(initialComunicados);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (isPaused) return;
    const rotationTimer = setInterval(() => {
      if (!aniversarianteHoje) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % links.length);
      }
    }, 25000);
    return () => clearInterval(rotationTimer);
  }, [aniversarianteHoje, isPaused]);

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
            onAdminClick={() => setShowLogin(true)}
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
