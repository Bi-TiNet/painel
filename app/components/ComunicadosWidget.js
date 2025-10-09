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

const Content = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Aviso = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const Dot = styled.span`
  margin-top: 6px;
  min-width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const Texto = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

export default function ComunicadosWidget({ comunicados }) {
  const getCorDoTipo = (tipo) => {
    switch (tipo) {
      case 'AVISO': return '#f59e0b';
      case 'META': return '#22c55e';
      case 'EVENTO': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  if (!comunicados) return null;

  return (
    <WidgetContainer>
      <Title>📢 Comunicados</Title>
      <Content>
        {comunicados.map(comunicado => (
          <Aviso key={comunicado.id}>
            <Dot color={getCorDoTipo(comunicado.tipo)}></Dot>
            <Texto>{comunicado.texto}</Texto>
          </Aviso>
        ))}
      </Content>
    </WidgetContainer>
  );
}
