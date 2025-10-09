'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Clock = styled.div`
  font-size: 2.25rem;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 4px 16px;
  border-radius: 8px;
  min-width: 140px;
  text-align: center;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ControlButton = styled.button`
  background-color: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  margin-top: 8px;
  padding: 8px;
  z-index: 10;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
`;

const DropdownItem = styled.a`
  display: block;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;


export default function Header({ titulo, isPaused, onTogglePause, onSelectPanel, panels, onAdminClick }) {
    const [hora, setHora] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const data = new Date();
            const horaFormatada = data.toLocaleTimeString('pt-BR', {
                hour: '2-digit', minute: '2-digit', second: '2-digit',
            });
            setHora(horaFormatada);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <HeaderContainer>
            <LogoContainer>
                <Image src="/logo ti.net.png" alt="Logo Ti.Net" width={120} height={40} priority />
                <Title>{titulo}</Title>
            </LogoContainer>

            <ControlsContainer>
                <ControlButton onClick={onAdminClick}>
                  Admin
                </ControlButton>
                <div style={{ position: 'relative' }}>
                    <ControlButton onClick={() => setShowDropdown(!showDropdown)}>
                        Selecionar Painel ▾
                    </ControlButton>
                    {showDropdown && (
                        <DropdownMenu onMouseLeave={() => setShowDropdown(false)}>
                            {panels.map((panel, index) => (
                                <DropdownItem key={panel.nome} onClick={() => {
                                    onSelectPanel(index);
                                    setShowDropdown(false);
                                }}>
                                    {panel.nome}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    )}
                </div>
                <ControlButton onClick={onTogglePause}>
                    {isPaused ? '▶️ Retomar' : '⏸️ Pausar'}
                </ControlButton>
                <Clock>{hora}</Clock>
            </ControlsContainer>
        </HeaderContainer>
    );
}
