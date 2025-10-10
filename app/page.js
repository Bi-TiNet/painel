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
  grid-template-columns: 1fr 35%; /* 65% (1fr) para conteúdo, 35% para sidebar */
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
  height: 25%; /* Altura para a seção de KPIs */
`;

const Sidebar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  min-height: 0; /* Essencial para o flexbox */
`;

const initialKpis = [
  { titulo: "Clientes Ativos", valor: "1.245", cor: "#4ade80" },
  { titulo: "Tickets Abertos", valor: "27", cor: "#facc15" },
  { titulo: "Bloqueados Hoje", valor: "8", cor: "#f87171" },
  { titulo: "OS Finalizadas", valor: "93", cor: "#60a5fa" }
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
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Efeito para login persistente
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    localStorage.setItem('loggedInUser', user);
    setLoggedInUser(user);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };
  
  // ... (Resto do código de useEffects para Firebase, rotação, etc. permanece igual) ...

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
            loggedInUser={loggedInUser}
            onAdminClick={() => setShowLogin(true)}
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

        {showLogin && (
          <Admin
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            onLoginSuccess={handleLoginSuccess}
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