'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

// ... (styled-components do Header permanecem os mesmos) ...
const HeaderContainer = styled.header`...`;
const LogoContainer = styled.div`...`;
const Title = styled.h1`...`;
const Clock = styled.div`...`;
const ControlsContainer = styled.div`...`;
const ControlButton = styled.button`...`;
const DropdownMenu = styled.div`...`;
const DropdownItem = styled.a`...`;


export default function Header({ titulo, isPaused, onTogglePause, onSelectPanel, panels, loggedInUser, onAdminClick, onLogout }) {
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
                {loggedInUser ? (
                    <ControlButton onClick={onLogout}>
                      Sair ({loggedInUser.split(' ')[0]})
                    </ControlButton>
                ) : (
                    <ControlButton onClick={onAdminClick}>
                      Admin
                    </ControlButton>
                )}
                
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