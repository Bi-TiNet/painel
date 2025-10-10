'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { adminUsers, departamentos as initialDepartamentos, tiposDeComunicado } from '@/app/data';

// --- Styled Components ---

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
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
  max-width: 900px; /* Aumentado */
  max-height: 90vh;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.75rem; /* Aumentado */
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
  background-color: ${({ theme, variant }) => variant === 'secondary' ? 'rgba(255, 255, 255, 0.1)' : theme.colors.primary};
  color: ${({ theme, variant }) => variant === 'secondary' ? theme.colors.text : theme.colors.background};
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
  gap: 1.5rem; /* Aumentado */
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: center;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 224, 255, 0.2);
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button`
  padding: 1rem 1.5rem;
  border: none;
  background-color: transparent;
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.textSecondary};
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme, active }) => active ? theme.colors.primary : 'transparent'};
  transition: all 0.2s;
`;

const ContentArea = styled.div`
  overflow-y: auto;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
    const [activeTab, setActiveTab] = useState('metas');
    const [tempKpis, setTempKpis] = useState([...kpis]);
    const [tempComunicados, setTempComunicados] = useState([...comunicados]);
    const [departamentos, setDepartamentos] = useState(initialDepartamentos);

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
      // Aqui você também salvaria os departamentos, se necessário
      onClose();
    };
  
    return (
      <Overlay onClick={onClose}>
        <Modal onClick={e => e.stopPropagation()}>
          <Title>Painel de Configuração (Bem-vindo, {user})</Title>
          
          <TabContainer>
            <TabButton active={activeTab === 'metas'} onClick={() => setActiveTab('metas')}>Metas (KPIs)</TabButton>
            <TabButton active={activeTab === 'comunicados'} onClick={() => setActiveTab('comunicados')}>Comunicados</TabButton>
          </TabContainer>

          <ContentArea>
            {activeTab === 'metas' && (
              <FormSection>
                <h3>Departamentos e Metas</h3>
                {departamentos.map((dep, index) => (
                  <div key={dep.id}>
                    <FormRow>
                      <Input value={dep.nome} onChange={(e) => {
                        const newDeps = [...departamentos];
                        newDeps[index].nome = e.target.value;
                        setDepartamentos(newDeps);
                      }} />
                      <Input type="color" value={dep.cor} onChange={(e) => {
                        const newDeps = [...departamentos];
                        newDeps[index].cor = e.target.value;
                        setDepartamentos(newDeps);
                      }} />
                      <Button variant="secondary">Remover</Button>
                    </FormRow>
                  </div>
                ))}
                <Button>Adicionar Departamento</Button>
              </FormSection>
            )}

            {activeTab === 'comunicados' && (
              <FormSection>
                <h3>Gerenciar Comunicados</h3>
                <Select>
                  {tiposDeComunicado.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                  ))}
                </Select>
                {/* Lógica condicional para mostrar opções de reunião, etc. */}
                <Input placeholder="Texto do comunicado..." />
                <Button>Adicionar Comunicado</Button>
                
                <hr style={{border: '1px solid rgba(0, 224, 255, 0.2)', margin: '1rem 0'}} />

                {tempComunicados.map((comunicado, index) => (
                    <FormRow key={comunicado.id}>
                        <Input value={comunicado.texto} onChange={(e) => handleComunicadoChange(index, e.target.value)} />
                        <Button variant="secondary">Remover</Button>
                    </FormRow>
                ))}
              </FormSection>
            )}
          </ContentArea>
  
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
      setShowLogin(false);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
    }
  
    if (loggedInUser) {
      return <AdminPanel user={loggedInUser} onClose={handleLogout} kpis={kpis} setKpis={setKpis} comunicados={comunicados} setComunicados={setComunicados} />;
    }
    
    return <LoginModal onLoginSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />;
}