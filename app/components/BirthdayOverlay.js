// app/components/BirthdayOverlay.js
'use client';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { useEffect, useRef } from 'react'; 

// ... (Seus styled-components: Overlay, Panel, Title, etc. não mudam) ...
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Panel = styled.div`
  background: linear-gradient(145deg, #061633, #1a2a47);
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 2px solid #22d3ee;
`;
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;
const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-top: 24px;
  color: #fde047; /* yellow-300 */
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
const Name = styled.p`
  font-size: 2.25rem;
  margin-top: 16px;
`;
const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-top: 8px;
  color: #d1d5db; /* gray-300 */
`;

// ATUALIZADO: A assinatura agora recebe 'musicaSrc'
export default function BirthdayOverlay({ aniversariante, musicaSrc, onMusicEnd }) {
  const audioRef = useRef(null);

  // --- useEffect TOTALMENTE SUBSTITUÍDO ---
  // Removemos toda a lógica de 'setInterval' e 'new Date()' daqui.
  // Este useEffect agora só toca a música quando o componente aparece.
  useEffect(() => {
    if (aniversariante && audioRef.current && musicaSrc) {
      console.log("Overlay apareceu, tentando tocar:", musicaSrc);
      
      // Define o src aqui para garantir que é o correto
      audioRef.current.src = musicaSrc;

      audioRef.current.play().catch(error => {
        // Se o autoplay for bloqueado pelo navegador
        console.error("Erro ao tocar música (autoplay bloqueado?):", error);
        // Chama onMusicEnd() para não travar a tela
        onMusicEnd();
      });
    }
  }, [aniversariante, musicaSrc, onMusicEnd]); // Depende das props

  // A verificação 'if (!aniversariante)' foi removida
  // porque o 'page.js' agora controla a renderização.

  return (
    <Overlay>
      <Panel>
        <Image
          src={aniversariante.foto}
          alt={aniversariante.nome}
          width={180}
          height={180}
          style={{ borderRadius: '50%', margin: '0 auto', border: '4px solid #facc15' }}
M-^       />
        <Title>Feliz Aniversário!</Title>
        <Name>{aniversariante.nome}</Name>
        <Subtitle>A Ti.Net te deseja tudo de melhor!</Subtitle>
      </Panel>
      <audio
        ref={audioRef}
        // ATUALIZADO: O src agora vem das props
        src={musicaSrc} 
        onEnded={onMusicEnd}
      />
    </Overlay>
  );
}