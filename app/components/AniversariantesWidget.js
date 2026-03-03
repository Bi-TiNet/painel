'use client';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { funcionarios } from '@/app/data';

// --- ANIMAÇÕES ---
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-15px); }
  60% { transform: translateY(-7px); }
`;

// --- ESTILOS COMPARTILHADOS E DO MODO NORMAL ---
const WidgetContainer = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  
  /* Se for Modo Festa, adiciona um brilho especial na borda */
  ${({ isPartyMode, theme }) => isPartyMode && `
    border: 2px solid ${theme.colors.accent || '#facc15'};
    box-shadow: inset 0 0 50px rgba(250, 204, 21, 0.05);
  `}
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}50;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const MonthSelector = styled.select`
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.primary}50;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  outline: none;

  option {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const DynamicBanner = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0 8px 8px 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Content = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 0.5rem;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const PersonCard = styled.div`
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const StatusBadge = styled.div`
  position: absolute;
  top: -12px;
  background-color: ${({ theme, status }) => 
    status === 'passou' ? '#4b5563' : theme.colors.primary};
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  white-space: nowrap;
`;

const DateText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.75rem 0 0.25rem 0;
`;

const NameText = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;


// --- ESTILOS EXCLUSIVOS DO MODO FESTA (HOJE) ---
const ExclusiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
`;

const PartyTitle = styled.h2`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.accent || '#facc15'};
  margin: 0 0 2rem 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(250, 204, 21, 0.3);
  animation: ${bounce} 2s infinite;
`;

const MultiGridExclusive = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  overflow-y: auto;
  padding: 1rem;
  
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.accent || '#facc15'};
    border-radius: 3px;
  }
`;

const HeroCard = styled.div`
  background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
  border: 2px solid ${({ theme }) => theme.colors.accent || '#facc15'};
  border-radius: 24px;
  padding: 3rem 2rem;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 0 30px rgba(250, 204, 21, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.03);
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin-bottom: 1.5rem;
  
  &::after {
    content: '🎉';
    position: absolute;
    bottom: -5px;
    right: -5px;
    font-size: 3rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
  }
`;

const HeroName = styled.h3`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.5rem 0;
  font-weight: 800;
`;

const HeroMessage = styled.p`
  font-size: 1.1rem;
  color: rgba(255,255,255,0.7);
  margin: 0;
  line-height: 1.5;
`;

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function AniversariantesWidget() {
  const hoje = new Date();
  const diaAtual = hoje.getDate();
  const mesAtual = hoje.getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = useState(mesAtual);

  // Verifica se há aniversariantes HOJE
  const aniversariantesHoje = funcionarios.filter(f => f.dia === diaAtual && f.mes === mesAtual);
  const temAniversarianteHoje = aniversariantesHoje.length > 0;

  // ==========================================
  // RENDERIZAÇÃO 1: MODO FESTA (É ANIVERSÁRIO)
  // ==========================================
  if (temAniversarianteHoje) {
    return (
      <WidgetContainer isPartyMode={true}>
        <ExclusiveContainer>
          <PartyTitle>🎂 Dia de Festa! 🎈</PartyTitle>
          <MultiGridExclusive>
            {aniversariantesHoje.map((pessoa, idx) => (
              <HeroCard key={idx}>
                <HeroImageContainer>
                  <Image 
                    src={pessoa.foto} 
                    alt={pessoa.nome} 
                    fill
                    style={{ borderRadius: '50%', objectFit: 'cover', border: `4px solid #facc15` }} 
                  />
                </HeroImageContainer>
                <HeroName>{pessoa.nome}</HeroName>
                <HeroMessage>
                  Feliz aniversário! Desejamos muito sucesso, saúde e alegria no seu dia especial! 🥳🎁
                </HeroMessage>
              </HeroCard>
            ))}
          </MultiGridExclusive>
        </ExclusiveContainer>
      </WidgetContainer>
    );
  }

  // ==========================================
  // RENDERIZAÇÃO 2: MODO NORMAL (MÊS/ANO)
  // ==========================================
  const getStatus = (dia, mes) => {
    if (mes < mesAtual || (mes === mesAtual && dia < diaAtual)) return 'passou';
    return 'futuro';
  };

  const getStatusText = (status) => {
    if (status === 'passou') return 'Já passou';
    return 'Em breve';
  };

  const aniversariantesFiltrados = funcionarios
    .filter(f => selectedMonth === 0 ? true : f.mes === selectedMonth)
    .sort((a, b) => {
      if (selectedMonth === 0) {
        if (a.mes !== b.mes) return a.mes - b.mes;
      }
      return a.dia - b.dia;
    });

  const obterFraseDinamica = (quantidade) => {
    if (selectedMonth === 0) return `Temos ${quantidade} aniversários ao longo de todo o ano! 📅🎉`;
    if (quantidade === 0) return "Poxa, nenhum bolinho para fatiar este mês... 🥲";
    if (quantidade === 1) return "Temos 1 dia super especial para celebrar neste mês! 🎈";
    if (quantidade > 1 && quantidade <= 3) return `Oba! Temos ${quantidade} motivos para comemorar (e comer bolo)! 🍰`;
    if (quantidade > 3 && quantidade <= 6) return `Mês animado! São ${quantidade} festas programadas! 🥳`;
    return `Haja coração (e bolo)! Temos ${quantidade} aniversariantes neste mês! 🎉🎈`;
  };

  return (
    <WidgetContainer isPartyMode={false}>
      <HeaderContainer>
        <Title>🎂 Aniversariantes</Title>
        <MonthSelector 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          <option value={0}>Ano Inteiro</option>
          {meses.map((mes, index) => (
            <option key={index} value={index + 1}>{mes}</option>
          ))}
        </MonthSelector>
      </HeaderContainer>

      <DynamicBanner>
        {obterFraseDinamica(aniversariantesFiltrados.length)}
      </DynamicBanner>

      <Content>
        {aniversariantesFiltrados.length > 0 && (
          <GridContainer>
            {aniversariantesFiltrados.map((pessoa, idx) => {
              const status = getStatus(pessoa.dia, pessoa.mes);
              return (
                <PersonCard key={idx}>
                  <StatusBadge status={status}>
                    {getStatusText(status)}
                  </StatusBadge>
                  <Image 
                    src={pessoa.foto} 
                    alt={pessoa.nome} 
                    width={70} 
                    height={70} 
                    style={{ borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <DateText>{String(pessoa.dia).padStart(2, '0')}/{String(pessoa.mes).padStart(2, '0')}</DateText>
                  <NameText>{pessoa.nome}</NameText>
                </PersonCard>
              );
            })}
          </GridContainer>
        )}
      </Content>
    </WidgetContainer>
  );
}