'use client';
import styled from 'styled-components';

const WidgetContainer = styled.div`
    height: 100%; /* Ocupa toda a altura do wrapper */
    width: 100%;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 8px;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;
const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary}50;
`;
const KpiGrid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Sempre 4 colunas */
  gap: 1.5rem; /* Espaçamento aumentado */
`;
const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const CardTitle = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 0.25rem 0;
  font-weight: 600;
`;
const CardValue = styled.p`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
  color: ${props => props.color || props.theme.colors.text};
  line-height: 1.1;
`;

// ... (Resto do código do componente permanece o mesmo) ...