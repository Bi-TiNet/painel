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
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 950px;
  height: 90vh;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
`;

const LoginModalContainer = styled(Modal)`
  height: auto;
  max-width: 400px;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 224, 255, 0.2);
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const WelcomeMessage = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  background-color: transparent;
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.textSecondary};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 3px solid ${({ theme, active }) => active ? theme.colors.primary : 'transparent'};
  transition: all 0.2s;
  margin-right: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContentArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 1.5rem;
  margin-right: -1.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }
`;

const FormSection = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.75rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  background-color: rgba(0, 224, 255, 0.05);
  border: 1px solid rgba(0, 224, 255, 0.2);
  padding: 1rem;
  border-radius: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid rgba(0, 224, 255, 0.2);
  padding-top: 1.5rem;
  margin-top: auto;
`;

const Button = styled.button`
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme, variant, disabled }) => disabled ? '#555' : (variant === 'secondary' ? 'rgba(255, 255, 255, 0.1)' : theme.colors.primary)};
  color: ${({ theme, variant, disabled }) => disabled ? '#999' : (variant === 'secondary' ? theme.colors.text : theme.colors.background)};
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;

  &:hover {
    opacity: ${props => props.disabled ? 1 : 0.85};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
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

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.kpi.red};
  margin: 0;
  text-align: center;
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
      <LoginModalContainer onClick={e => e.stopPropagation()}>
        <Title>Login Administrativo</Title>
        <Select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
          {adminUsers.map(u => <option key={u.user} value={u.user}>{u.user}</option>)}
        </Select>
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
        <Button onClick={handleLogin}>Entrar</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginModalContainer>
    </Overlay>
  );
}


// --- Componente do Painel de Admin ---
function AdminPanel({ user, onClose, kpis, setKpis, comunicados, setComunicados }) {
    const [activeTab, setActiveTab] = useState('metas');
    const [tempKpis, setTempKpis] = useState(kpis);
    const [tempComunicados, setTempComunicados] = useState(comunicados);
    const [tempDepartamentos, setTempDepartamentos] = useState(initialDepartamentos);

    const [newComunicado, setNewComunicado] = useState({ tipo: 'aviso', texto: '', departamentos: [] });

    const handleAddDepartamento = () => {
        setTempDepartamentos([...tempDepartamentos, { id: Date.now(), nome: "Novo Departamento", cor: "#ffffff" }]);
    };

    const handleRemoveDepartamento = (id) => {
        setTempDepartamentos(tempDepartamentos.filter(d => d.id !== id));
    };

    const handleUpdateDepartamento = (index, field, value) => {
        const newDeps = [...tempDepartamentos];
        newDeps[index][field] = value;
        setTempDepartamentos(newDeps);
    };

    const handleAddComunicado = () => {
        if (!newComunicado.texto.trim()) return;
        const novo = {
            id: Date.now(),
            tipo: newComunicado.tipo.split('_')[0].toUpperCase(), // ex: 'reuniao_geral' -> 'REUNIAO'
            texto: newComunicado.texto
        };
        setTempComunicados([novo, ...tempComunicados]);
        setNewComunicado({ tipo: 'aviso', texto: '', departamentos: [] });
    };
    
    const handleRemoveComunicado = (id) => {
        setTempComunicados(tempComunicados.filter(c => c.id !== id));
    };

    const handleSave = () => {
      setKpis(tempKpis);
      setComunicados(tempComunicados);
      // Aqui você salvaria os departamentos no Firebase também, se quisesse persistir
      onClose();
    };
  
    return (
      <Overlay onClick={onClose}>
        <Modal onClick={e => e.stopPropagation()}>
            <Header>
                <div>
                    <Title>Painel de Configuração</Title>
                    <WelcomeMessage>Bem-vindo, {user}</WelcomeMessage>
                </div>
            </Header>

            <TabContainer>
                <TabButton active={activeTab === 'metas'} onClick={() => setActiveTab('metas')}>Metas</TabButton>
                <TabButton active={activeTab === 'comunicados'} onClick={() => setActiveTab('comunicados')}>Comunicados</TabButton>
            </TabContainer>

            <ContentArea>
                {activeTab === 'metas' && (
                  <FormSection>
                    <SectionTitle>Gerenciar Metas (KPIs)</SectionTitle>
                     {tempKpis.map((kpi, index) => (
                        <FormRow key={index}>
                            <Input value={kpi.titulo} onChange={(e) => {
                                const newKpis = [...tempKpis];
                                newKpis[index].titulo = e.target.value;
                                setTempKpis(newKpis);
                            }} />
                            <Input value={kpi.valor} onChange={(e) => {
                                const newKpis = [...tempKpis];
                                newKpis[index].valor = e.target.value;
                                setTempKpis(newKpis);
                            }} />
                             <Input type="color" value={kpi.cor} onChange={(e) => {
                                const newKpis = [...tempKpis];
                                newKpis[index].cor = e.target.value;
                                setTempKpis(newKpis);
                            }} style={{padding: '0.25rem', height: '45px'}}/>
                        </FormRow>
                    ))}
                  </FormSection>
                )}

                {activeTab === 'comunicados' && (
                  <>
                    <FormSection>
                        <SectionTitle>Criar Novo Comunicado</SectionTitle>
                        <Select value={newComunicado.tipo} onChange={e => setNewComunicado({...newComunicado, tipo: e.target.value})}>
                          {tiposDeComunicado.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                          ))}
                        </Select>
                        
                        {newComunicado.tipo === 'reuniao_departamento' && (
                            <div>
                                <p style={{margin: '0 0 0.5rem 0'}}>Selecione os departamentos participantes:</p>
                                <CheckboxGroup>
                                    {tempDepartamentos.map(dep => (
                                        <CheckboxLabel key={dep.id}>
                                            <input type="checkbox" />
                                            {dep.nome}
                                        </CheckboxLabel>
                                    ))}
                                </CheckboxGroup>
                            </div>
                        )}
                        <Input as="textarea" rows="3" placeholder="Digite a mensagem do comunicado..." value={newComunicado.texto} onChange={e => setNewComunicado({...newComunicado, texto: e.target.value})} />
                        <div style={{textAlign: 'right'}}>
                          <Button onClick={handleAddComunicado} disabled={!newComunicado.texto.trim()}>Publicar Comunicado</Button>
                        </div>
                    </FormSection>

                     <FormSection>
                        <SectionTitle>Comunicados Ativos</SectionTitle>
                        {tempComunicados.length > 0 ? tempComunicados.map((comunicado) => (
                            <FormRow key={comunicado.id} style={{gridTemplateColumns: '1fr auto'}}>
                                <Input value={comunicado.texto} readOnly style={{backgroundColor: 'rgba(0,0,0,0.2)', borderStyle: 'dashed'}}/>
                                <Button variant="secondary" onClick={() => handleRemoveComunicado(comunicado.id)}>Remover</Button>
                            </FormRow>
                        )) : <p>Nenhum comunicado ativo.</p>}
                    </FormSection>
                  </>
                )}
            </ContentArea>

            <Footer>
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave}>Salvar Alterações</Button>
            </Footer>
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