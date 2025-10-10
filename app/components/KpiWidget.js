'use client';
import styled from 'styled-components';

const WidgetContainer = styled.div`
    height: 33.33%;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 0.5rem;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;
const Title = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary}50;
    padding-bottom: 0.8rem;
`;
const KpiGrid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;
const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.8rem;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const CardTitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const CardValue = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: ${props => props.color || props.theme.colors.text};
  line-height: 1.2;
`;

function KpiCard({ titulo, valor, cor }) {
  return (
    <Card>
      <CardTitle>{titulo}</CardTitle>
      <CardValue color={cor}>{valor}</CardValue>
    </Card>
  );
}

export default function KpiWidget({ kpis }) {
  const displayKpis = Array.isArray(kpis) ? kpis : [];

  return (
    <WidgetContainer>
      <Title>📊 Metas</Title>
      <KpiGrid>
        {displayKpis.map((kpi, index) => (
          <KpiCard key={index} titulo={kpi.titulo} valor={kpi.valor} cor={kpi.cor} />
        ))}
      </KpiGrid>
    </WidgetContainer>
  );
}