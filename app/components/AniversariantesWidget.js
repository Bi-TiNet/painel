// app/components/AniversariantesWidget.js
'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { funcionarios } from '@/app/data';

const WidgetContainer = styled.div`
  height: 35%; /* Ajustado para 35% */
  background-color: #0a1e3e;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 0; /* Para flexbox funcionar corretamente */
`;

// ... (O resto do arquivo permanece o mesmo) ...
const Title = styled.h2`...`;
const Content = styled.div`...`;
const TodaySection = styled.div`...`;
const TodayTitle = styled.h3`...`;
const BirthdayPerson = styled.div`...`;
const UpcomingTitle = styled.h3`...`;
const UpcomingPerson = styled.div`...`;
const Day = styled.span`...`;

export default function AniversariantesWidget() {
  const hoje = new Date();
  const diaAtual = hoje.getDate();
  const mesAtual = hoje.getMonth() + 1;

  const aniversariantesDoDia = funcionarios.filter(f => f.dia === diaAtual && f.mes === mesAtual);
  const proximosAniversariantes = funcionarios.filter(f => f.mes === mesAtual && f.dia > diaAtual).sort((a, b) => a.dia - b.dia).slice(0, 4);

  return (
    <WidgetContainer>
      <Title>🎂 Aniversariantes</Title>
      <Content>
        {/* ... Lógica de renderização ... */}
      </Content>
    </WidgetContainer>
  );
}