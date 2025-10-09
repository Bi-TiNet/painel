'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { funcionarios } from '@/app/data';

const WidgetContainer = styled.div`
  height: 33.33%;
  background-color: #0a1e3e;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #22d3ee;
  margin-bottom: 12px;
  border-bottom: 2px solid rgba(34, 211, 238, 0.5);
  padding-bottom: 8px;
`;

const Content = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 8px;

  /* --- ESTILOS DA BARRA DE ROLAGEM ADICIONADOS AQUI --- */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

const TodaySection = styled.div`
  margin-bottom: 16px;
`;

const TodayTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #facc15; /* amber-400 */
`;

const BirthdayPerson = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  padding: 8px;
  background-color: rgba(250, 204, 21, 0.2);
  border-radius: 8px;
`;

const UpcomingTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #d1d5db; /* gray-300 */
`;

const UpcomingPerson = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  color: #d1d5db;
`;

const Day = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
  width: 32px;
  color: #67e8f9; /* cyan-300 */
`;

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
        {aniversariantesDoDia.length > 0 && (
          <TodaySection>
            <TodayTitle>HOJE! 🎉</TodayTitle>
            {aniversariantesDoDia.map(f => (
              <BirthdayPerson key={f.nome}>
                <Image src={f.foto} alt={f.nome} width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                <span style={{ fontWeight: 500, color: 'white' }}>{f.nome}</span>
              </BirthdayPerson>
            ))}
          </TodaySection>
        )}
        <UpcomingTitle>Próximos do Mês</UpcomingTitle>
        {proximosAniversariantes.length > 0 ? (
          proximosAniversariantes.map(f => (
            <UpcomingPerson key={f.nome}>
              <Day>{f.dia}</Day>
              <span>{f.nome}</span>
            </UpcomingPerson>
          ))
        ) : (
          <p style={{ color: '#6b7280', marginTop: '8px' }}>Nenhum outro aniversariante este mês.</p>
        )}
      </Content>
    </WidgetContainer>
  );
}
