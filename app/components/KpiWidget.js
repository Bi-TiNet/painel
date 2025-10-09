'use client';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  height: 33.33%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;
  border-bottom: 2px solid rgba(0, 224, 255, 0.3);
  padding-bottom: 8px;
`;

const KpiGrid = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-around;
`;

const KpiRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: 8px;
  flex: 1;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardTitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  font-weight: 600;
`;

const CardValue = styled.p`
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
  color: ${props => props.color || props.theme.colors.text};
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
  // Garante que o componente não quebre se os kpis não forem carregados
  if (!kpis || kpis.length < 4) {
    return (
        <WidgetContainer>
            <Title>📊 Indicadores Chave</Title>
            <p>Carregando dados...</p>
        </WidgetContainer>
    );
  }

  return (
    <WidgetContainer>
      <Title>📊 Metas</Title>
      <KpiGrid>
        <KpiRow>
          <KpiCard titulo={kpis[0].titulo} valor={kpis[0].valor} cor={kpis[0].cor} />
          <KpiCard titulo={kpis[1].titulo} valor={kpis[1].valor} cor={kpis[1].cor} />
        </KpiRow>
        <KpiRow>
          <KpiCard titulo={kpis[2].titulo} valor={kpis[2].valor} cor={kpis[2].cor} />
          <KpiCard titulo={kpis[3].titulo} valor={kpis[3].valor} cor={kpis[3].cor} />
        </KpiRow>
      </KpiGrid>
    </WidgetContainer>
  );
}
