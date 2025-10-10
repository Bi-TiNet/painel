// app/components/ComunicadosWidget.js
'use client';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  height: 65%; /* Ajustado para 65% */
  background-color: ${({ theme }) => theme.colors.surface};
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
const Aviso = styled.div`...`;
const Dot = styled.span`...`;
const Texto = styled.p`...`;

export default function ComunicadosWidget({ comunicados }) {
  // ... (Lógica do componente permanece a mesma) ...

  return (
    <WidgetContainer>
      <Title>📢 Comunicados</Title>
      <Content>
        {/* ... Lógica de renderização ... */}
      </Content>
    </WidgetContainer>
  );
}