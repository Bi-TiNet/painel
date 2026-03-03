'use client';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

// --- ANIMAÇÕES ---
const popIn = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  80% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(250, 204, 21, 0.4); }
  50% { box-shadow: 0 0 60px rgba(250, 204, 21, 0.8), 0 0 100px rgba(250, 204, 21, 0.4); }
  100% { box-shadow: 0 0 20px rgba(250, 204, 21, 0.4); }
`;

// --- ESTILOS ---
const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 4px solid #facc15;
  border-radius: 40px;
  padding: 5rem 4rem;
  text-align: center;
  max-width: 1000px;
  width: 90%;
  animation: 
    ${popIn} 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, 
    ${glow} 3s infinite alternate;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  color: #facc15;
  margin: 0 0 3rem 0;
  text-transform: uppercase;
  text-shadow: 2px 4px 10px rgba(0,0,0,0.5);
  animation: ${float} 3s ease-in-out infinite;
`;

const PeopleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
`;

const PersonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 8px solid #facc15;
  overflow: hidden;
  position: relative;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
`;

const Name = styled.h2`
  font-size: 3rem;
  color: #ffffff;
  margin: 0;
  font-weight: 800;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  color: #cbd5e1;
  margin-top: 4rem;
  font-weight: 500;
`;

const PlayButton = styled.button`
  margin-top: 3rem;
  padding: 1rem 2.5rem;
  font-size: 1.5rem;
  background-color: #facc15;
  color: #000;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(250, 204, 21, 0.4);
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export default function BirthdayOverlay({ aniversariantes, onClose }) {
  const audioRef = useRef(null);
  const [audioBlocked, setAudioBlocked] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      
      // O play() retorna uma Promise. Vamos verificar se o navegador rejeita.
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("O navegador bloqueou o autoplay:", error);
          // Se for bloqueado, mostramos o botão
          setAudioBlocked(true);
        });
      }
    }
  }, []);

  const handleManualPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setAudioBlocked(false); // Esconde o botão após iniciar
    }
  };

  if (!aniversariantes || aniversariantes.length === 0) return null;

  return (
    <OverlayBackground onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>🎉 Feliz Aniversário! 🎂</Title>
        
        <PeopleContainer>
          {aniversariantes.map((pessoa, idx) => (
            <PersonCard key={idx}>
              <ImageWrapper>
                <Image 
                  src={pessoa.foto} 
                  alt={pessoa.nome} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              </ImageWrapper>
              <Name>{pessoa.nome}</Name>
            </PersonCard>
          ))}
        </PeopleContainer>

        <Subtitle>A equipa Ti.Net deseja muitas felicidades e sucesso! 🚀</Subtitle>

        {/* Só aparece se o navegador bloquear o áudio automático */}
        {audioBlocked && (
          <PlayButton onClick={handleManualPlay}>
            🎵 Iniciar Música
          </PlayButton>
        )}
      </ModalContent>

      <audio 
        ref={audioRef} 
        src="/singles/padrao.mp3" 
        onEnded={onClose} 
      />
    </OverlayBackground>
  );
}