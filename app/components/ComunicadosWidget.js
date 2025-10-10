'use client';
import styled from 'styled-components';
import { tiposDeComunicado } from '@/app/data';

// Mapeia o TIPO para a cor correspondente
const getColorForType = (type) => {
  const tipo = tiposDeComunicado.find(t => t.id.toUpperCase() === type);
  return tipo ? tipo.cor : '#9ca3af'; // Retorna a cor do tipo ou uma cor padrão
};

const WidgetContainer = styled.div`
  height: 65%;
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

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const Aviso = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Dot = styled.span`
  min-width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color}; /* Cor dinâmica */
  margin-top: 0.5rem;
`;

const Texto = styled.p`
  margin: 0;
  line-height: 1.6;
  font-size: 0.9rem;
  white-space: pre-wrap; /* Mágica para preservar espaços e quebras de linha */
`;


export default function ComunicadosWidget({ comunicados }) {
  if (!comunicados || comunicados.length === 0) {
    return (
      <WidgetContainer>
        <Title>📢 Comunicados</Title>
        <Content>
          <p>Nenhum comunicado no momento.</p>
        </Content>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer>
      <Title>📢 Comunicados</Title>
      <Content>
        {comunicados.map((comunicado) => (
          <Aviso key={comunicado.id}>
            <Dot color={getColorForType(comunicado.tipo)} />
            <Texto>{comunicado.texto}</Texto>
          </Aviso>
        ))}
      </Content>
    </WidgetContainer>
  );
}