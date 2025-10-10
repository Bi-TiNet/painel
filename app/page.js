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
  grid-template-columns: 1fr 35%;
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
  min-height: 0;
`;

const DashboardWrapper = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  border-radius: 8px;
  overflow: hidden;
`;

const KpiWrapper = styled.div`
  width: 100%;
  height: 25%;
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
  const [showAdmin, setShowAdmin] = useState(false); // Controla a visibilidade do modal/painel
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Verifica se há um usuário logado no localStorage ao carregar a página
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
    setShowAdmin(false); // Fecha o painel admin ao deslogar
  };

  const saveKpis = async (newKpis) => { /* ... */ };
  const saveComunicados = async (newComunicados) => { /* ... */ };

  // ... (outros useEffects e handlers)

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
            onLogout={handleLogout}
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