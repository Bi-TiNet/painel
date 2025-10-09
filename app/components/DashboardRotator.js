// app/components/DashboardRotator.js
'use client';
import styled from 'styled-components';

const IframeContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;
const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

export default function DashboardRotator({ dashboard }) {
  if (!dashboard) {
    return null;
  }
  return (
    <IframeContainer>
      <StyledIframe
        key={dashboard.url}
        src={dashboard.url}
        title={dashboard.nome}
        allowFullScreen
      />
    </IframeContainer>
  );
}