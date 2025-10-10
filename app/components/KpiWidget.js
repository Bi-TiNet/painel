'use client';
import styled from 'styled-components';
import { departamentos } from '@/app/data';

// Função para encontrar a cor do departamento
const getCorDoDepartamento = (nomeDepartamento) => {
  const depto = departamentos.find(d => d.nome === nomeDepartamento);
  return depto ? depto.cor : '#e5e7eb'; // Retorna a cor ou uma cor padrão
};

const WidgetContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 1.5rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary}50;
`;

const KpiGrid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem; 
`;

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1.25rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribui o espaço */
  text-align: left; /* Alinha o texto à esquerda */
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary}80;
  }
`;

const CardHeader = styled.div``;

const CardDept = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0;
  color: ${props => props.color};
`;

const CardTitle = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.25rem 0 0 0;
`;

const CardValue = styled.p`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: ${props => props.color};
  line-height: 1.1;
  text-shadow: 0 0 10px ${props => props.color}90;
  align-self: flex-end; /* Alinha o valor no final do card */
`;

function KpiCard({ departamento, nome, valor }) {
  const cor = getCorDoDepartamento(departamento);
  return (
    <Card>
      <CardHeader>
        <CardDept color={cor}>{departamento}</CardDept>
        <CardTitle>{nome}</CardTitle>
      </CardHeader>
      <CardValue color={cor}>{valor}</CardValue>
    </Card>
  );
}

export default function KpiWidget({ kpis }) {
  if (!kpis || kpis.length === 0) {
    return (
        <WidgetContainer>
            <Title>📊 Metas</Title>
            <p>Carregando dados...</p>
        </WidgetContainer>
    );
  }

  return (
    <WidgetContainer>
      <Title>📊 Metas</Title>
      <KpiGrid>
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} departamento={kpi.departamento} nome={kpi.nome} valor={kpi.valor} />
        ))}
      </KpiGrid>
    </WidgetContainer>
  );
}