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
  // Refs para rastrear se a música já tocou hoje nesses horários
  const playedAt11Ref = useRef(false);
  const playedAt15Ref = useRef(false);

  useEffect(() => {
    if (!aniversariante) {
      return; // Não faz nada se não houver aniversariante
    }

    // Reseta os rastreadores se o aniversariante mudar
    playedAt11Ref.current = false;
    playedAt15Ref.current = false;

    // Cria um intervalo para verificar a hora a cada segundo
    const intervalId = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const audio = audioRef.current;

      if (!audio) return;

      // --- Tocar às 11:00:00 ---
      if (hour === 11 && minutes === 0 && seconds === 0 && !playedAt11Ref.current) {
        audio.currentTime = 0; // Garante que a música comece do início
        audio.play().catch(error => {
          console.error("Erro ao tocar música às 11h:", error);
        });
        playedAt11Ref.current = true; // Marca como tocado
      }

      // --- Tocar às 15:00:00 ---
      if (hour === 15 && minutes === 0 && seconds === 0 && !playedAt15Ref.current) {
        audio.currentTime = 0; // Garante que a música comece do início
        audio.play().catch(error => {
          console.error("Erro ao tocar música às 15h:", error);
        });
        playedAt15Ref.current = true; // Marca como tocado
      }

      // --- Resetar os rastreadores à meia-noite ---
      if (hour === 0 && minutes === 0 && seconds === 0) {
        playedAt11Ref.current = false;
        playedAt15Ref.current = false;
      }

    }, 1000); // Verifica a cada segundo

    // Função de limpeza: remove o intervalo quando o componente é desmontado
    return () => {
      clearInterval(intervalId);
    };
  }, [aniversariante]); // Depende apenas do aniversariante

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