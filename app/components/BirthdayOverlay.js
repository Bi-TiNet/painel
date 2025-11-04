// app/components/BirthdayOverlay.js
'use client';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

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

export default function BirthdayOverlay({ aniversariante, onMusicEnd }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (aniversariante && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Erro ao tocar música:", error);
        onMusicEnd();
      });
    }
  }, [aniversariante, onMusicEnd]);

  if (!aniversariante) {
    return null;
  }

  return (
    <Overlay>
      <Panel>
        <Image
          src={aniversariante.foto}
          alt={aniversariante.nome}
          width={180}
          height={180}
          style={{ borderRadius: '50%', margin: '0 auto', border: '4px solid #facc15' }}
        />
        <Title>Feliz Aniversário!</Title>
        <Name>{aniversariante.nome}</Name>
        <Subtitle>A Ti.Net te deseja tudo de melhor!</Subtitle>
      </Panel>
      <audio
        ref={audioRef}
        src="/singles/padrao.mp3"
        onEnded={onMusicEnd}
      />
    </Overlay>
  );
}