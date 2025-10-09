'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { adminUsers } from '@/app/data';

// --- Styled Components ---

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Modal = styled.div`
  background: #0d1b2a; 
  border: 1px solid rgba(0, 224, 255, 0.4); 
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  border-bottom: 1px solid rgba(0, 224, 255, 0.2);
  padding-bottom: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid rgba(0, 224, 255, 0.4); 
  background-color: rgba(0, 224, 255, 0.1); 
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  /* CORREÇÃO APLICADA AQUI */
  option {
    background: #0d1b2a;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid rgba(0, 224, 255, 0.4); 
  background-color: rgba(0, 224, 255, 0.1); 
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.kpi.red};
  margin: 0;
  text-align: center;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

// --- Componente de Login ---
function LoginModal({ onLoginSuccess, onClose }) {
  const [selectedUser, setSelectedUser] = useState(adminUsers[0].user);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = adminUsers.find(u => u.user === selectedUser);
    if (user && user.pass === password) {
      onLoginSuccess(user.user);
    } else {
      setError('Senha incorreta.');
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Title>Login Administrativo</Title>
        <Select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
          {adminUsers.map(u => <option key={u.user} value={u.user}>{u.user}</option>)}
        </Select>
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
        <Button onClick={handleLogin}>Entrar</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Modal>
    </Overlay>
  );
}


// --- Componente do Painel de Admin ---
function AdminPanel({ user, onClose, kpis, setKpis, comunicados, setComunicados }) {
    const [tempKpis, setTempKpis] = useState([...kpis]);
    const [tempComunicados, setTempComunicados] = useState([...comunicados]);
  
    const handleKpiChange = (index, field, value) => {
      const newKpis = [...tempKpis];
      newKpis[index][field] = value;
      setTempKpis(newKpis);
    };
  
    const handleComunicadoChange = (index, value) => {
        const newComunicados = [...tempComunicados];
        newComunicados[index].texto = value;
        setTempComunicados(newComunicados);
    };

    const handleSave = () => {
      setKpis(tempKpis);
      setComunicados(tempComunicados);
      onClose(); // Fecha o modal após salvar
    };
  
    return (
      <Overlay onClick={onClose}>
        <Modal onClick={e => e.stopPropagation()}>
          <Title>Painel de Configuração (Bem-vindo, {user})</Title>
  
          <FormSection>
            <h3>Editar Metas (KPIs)</h3>
            {tempKpis.map((kpi, index) => (
              <FormRow key={index}>
                <Input value={kpi.titulo} onChange={(e) => handleKpiChange(index, 'titulo', e.target.value)} />
                <Input value={kpi.valor} onChange={(e) => handleKpiChange(index, 'valor', e.target.value)} />
              </FormRow>
            ))}
          </FormSection>
          
          <FormSection>
            <h3>Editar Comunicados</h3>
            {tempComunicados.map((comunicado, index) => (
                <Input key={comunicado.id} value={comunicado.texto} onChange={(e) => handleComunicadoChange(index, e.target.value)} />
            ))}
          </FormSection>
  
          <Button onClick={handleSave}>Salvar e Fechar</Button>
        </Modal>
      </Overlay>
    );
  }

// --- Componente Principal ---
export default function Admin({ showLogin, setShowLogin, loggedInUser, setLoggedInUser, kpis, setKpis, comunicados, setComunicados }) {
    if (!showLogin && !loggedInUser) {
      return null;
    }
  
    const handleLoginSuccess = (user) => {
      setLoggedInUser(user);
      setShowLogin(false); // Esconde o modal de login e mostra o painel
    };

    const handleLogout = () => {
        setLoggedInUser(null);
    }
  
    if (loggedInUser) {
      return <AdminPanel user={loggedInUser} onClose={handleLogout} kpis={kpis} setKpis={setKpis} comunicados={comunicados} setComunicados={setComunicados} />;
    }
    
    return <LoginModal onLoginSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />;
  }

