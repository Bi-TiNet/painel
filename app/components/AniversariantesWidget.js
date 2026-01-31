'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { funcionarios } from '@/app/data';

const WidgetContainer = styled.div`
  height: 35%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 0;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 1rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}50;
`;

const Content = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 1rem;
  margin-right: -1rem;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const TodaySection = styled.div`
  margin-bottom: 1.5rem;
`;

const TodayTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.75rem;
`;

const BirthdayPerson = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
`;

const UpcomingTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
`;

const UpcomingPerson = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Day = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  width: 2rem;
`;

export default function AniversariantesWidget() {
  const hoje = new Date();
  const diaAtual = hoje.getDate();
  const mesAtual = hoje.getMonth() + 1;

  const aniversariantesDoDia = funcionarios.filter(f => f.dia === diaAtual && f.mes === mesAtual);
  const proximosAniversariantes = funcionarios
    .filter(f => f.mes === mesAtual && f.dia > diaAtual)
    .sort((a, b) => a.dia - b.dia)
    .slice(0, 5);

  return (
    <WidgetContainer>
      <Title>🎂 Aniversariantes</Title>
      <Content>
        {aniversariantesDoDia.length > 0 && (
          <TodaySection>
            <TodayTitle>Parabéns para:</TodayTitle>
            {aniversariantesDoDia.map(pessoa => (
              <BirthdayPerson key={pessoa.nome}>
                <Image src={pessoa.foto} alt={pessoa.nome} width={50} height={50} style={{ borderRadius: '50%' }} />
                <span>{pessoa.nome}</span>
              </BirthdayPerson>
            ))}
          </TodaySection>
        )}

        {proximosAniversariantes.length > 0 && (
          <div>
            <UpcomingTitle>Próximos do Mês</UpcomingTitle>
            {proximosAniversariantes.map(pessoa => (
              <UpcomingPerson key={pessoa.nome}>
                <Day>{String(pessoa.dia).padStart(2, '0')}</Day>
                <span>{pessoa.nome}</span>
              </UpcomingPerson>
            ))}
          </div>
        )}

        {aniversariantesDoDia.length === 0 && proximosAniversariantes.length === 0 && (
          <p>Nenhum aniversariante no momento.</p>
        )}
      </Content>
    </WidgetContainer>
  );
}
