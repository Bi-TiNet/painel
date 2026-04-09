'use client';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

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

const OverlayBackground = styled.div`
  position: fixed;
  inset: 0;
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
`;

const ErrorText = styled.p`
  margin-top: 1rem;
  color: #fca5a5;
  font-size: 1rem;
`;

export default function BirthdayOverlay({ aniversariantes, onClose }) {
  const audioRef = useRef(null);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [audioError, setAudioError] = useState('');

  useEffect(() => {
    if (!aniversariantes || aniversariantes.length === 0) return;
    if (!audioRef.current) return;

    setAudioBlocked(false);
    setAudioError('');

    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.volume = 1;
    audio.load();

    const tentarTocar = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error('Falha no autoplay:', error);
        setAudioBlocked(true);
      }
    };

    const onCanPlay = () => {
      tentarTocar();
    };

    audio.addEventListener('canplaythrough', onCanPlay, { once: true });

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
    };
  }, [aniversariantes]);

  const handleManualPlay = async () => {
    try {
      if (!audioRef.current) return;
      await audioRef.current.play();
      setAudioBlocked(false);
      setAudioError('');
    } catch (error) {
      console.error('Falha ao tocar manualmente:', error);
      setAudioError('O arquivo não pôde ser reproduzido. Verifique o caminho e o formato do MP3.');
    }
  };

  if (!aniversariantes || aniversariantes.length === 0) return null;

  return (
    <OverlayBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
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

        {audioBlocked && (
          <PlayButton onClick={handleManualPlay}>
            🎵 Iniciar Música
          </PlayButton>
        )}

        {audioError && <ErrorText>{audioError}</ErrorText>}
      </ModalContent>

      <audio
        ref={audioRef}
        src="/singles/padrao.mp3"
        onEnded={onClose}
        preload="auto"
        onLoadedData={() => console.log('Áudio carregado')}
        onError={() => {
          console.error('Erro ao carregar áudio:', audioRef.current?.currentSrc);
          setAudioError('Não foi possível carregar o áudio. Confira se /public/singles/padrao.mp3 existe.');
        }}
      />
    </OverlayBackground>
  );
}