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
  grid-template-columns: 2fr 1fr auto;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
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
  margin-bottom: 1rem;

  option {
    background: #0d1b2a;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ErrorMessage = styled.p`
  color: #f87171;
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
    const [activeTab, setActiveTab] = useState('comunicados');
    const [tempKpis, setTempKpis] = useState(kpis);
    const [tempComunicados, setTempComunicados] = useState(comunicados);
    
    const [formComunicado, setFormComunicado] = useState({ id: null, tipo: 'aviso', texto: '' });
    const isEditing = formComunicado.id !== null;

    const handleKpiChange = (index, field, value) => {
        const newKpis = [...tempKpis];
        newKpis[index][field] = value;
        setTempKpis(newKpis);
    };

    const handleEditComunicado = (comunicado) => {
        setFormComunicado({
            id: comunicado.id,
            tipo: comunicado.tipo.toLowerCase(),
            texto: comunicado.texto,
        });
    };

    const handleSaveComunicado = () => {
        if (!formComunicado.texto.trim()) return;

        if (isEditing) {
            const updatedComunicados = tempComunicados.map(c => 
                c.id === formComunicado.id ? { ...c, tipo: formComunicado.tipo.toUpperCase(), texto: formComunicado.texto } : c
            );
            setTempComunicados(updatedComunicados);
        } else {
            const novo = {
                id: Date.now(),
                tipo: formComunicado.tipo.toUpperCase(),
                texto: formComunicado.texto
            };
            setTempComunicados([novo, ...tempComunicados]);
        }
        setFormComunicado({ id: null, tipo: 'aviso', texto: '' });
    };
    
    const handleRemoveComunicado = (id) => {
        setTempComunicados(tempComunicados.filter(c => c.id !== id));
    };

    const handleSave = () => {
      setKpis(tempKpis);
      setComunicados(tempComunicados);
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
                            <Input value={kpi.titulo} onChange={(e) => handleKpiChange(index, 'titulo', e.target.value)} />
                            <Input value={kpi.valor} onChange={(e) => handleKpiChange(index, 'valor', e.target.value)} />
                             <Input type="color" value={kpi.cor} onChange={(e) => handleKpiChange(index, 'cor', e.target.value)} style={{padding: '0.25rem', height: '45px'}}/>
                        </FormRow>
                    ))}
                  </FormSection>
                )}

                {activeTab === 'comunicados' && (
                  <>
                    <FormSection>
                        <SectionTitle>{isEditing ? 'Editando Comunicado' : 'Criar Novo Comunicado'}</SectionTitle>
                        <Select value={formComunicado.tipo} onChange={e => setFormComunicado({...formComunicado, tipo: e.target.value})}>
                          {tiposDeComunicado.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                          ))}
                        </Select>
                        
                        <Input as="textarea" rows="4" placeholder="Digite a mensagem do comunicado..." value={formComunicado.texto} onChange={e => setFormComunicado({...formComunicado, texto: e.target.value})} />
                        
                        <div style={{textAlign: 'right', display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                           {isEditing && (
                             <Button variant="secondary" onClick={() => setFormComunicado({ id: null, tipo: 'aviso', texto: '' })}>
                               Cancelar Edição
                             </Button>
                           )}
                           <Button onClick={handleSaveComunicado} disabled={!formComunicado.texto.trim()}>
                               {isEditing ? 'Salvar Alterações' : 'Publicar Comunicado'}
                           </Button>
                        </div>
                    </FormSection>

                     <FormSection>
                        <SectionTitle>Comunicados Ativos</SectionTitle>
                        {tempComunicados.length > 0 ? tempComunicados.map((comunicado) => (
                            <div key={comunicado.id} style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem'}}>
                                <Input value={comunicado.texto} readOnly style={{backgroundColor: 'rgba(0,0,0,0.2)', whiteSpace: 'pre-wrap', flexGrow: 1}} as="textarea" rows="2" />
                                <Button variant="secondary" onClick={() => handleEditComunicado(comunicado)}>Editar</Button>
                                <Button variant="secondary" onClick={() => handleRemoveComunicado(comunicado.id)}>Remover</Button>
                            </div>
                        )) : <p>Nenhum comunicado ativo.</p>}
                    </FormSection>
                  </>
                )}
            </ContentArea>

            <Footer>
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave}>Salvar Tudo e Fechar</Button>
            </Footer>
        </Modal>
      </Overlay>
    );
}

// --- Componente Principal ---
export default function Admin({ loggedInUser, onLoginSuccess, onClose, kpis, setKpis, comunicados, setComunicados }) {
  
    if (loggedInUser) {
      return (
        <AdminPanel
          user={loggedInUser}
          onClose={onClose}
          kpis={kpis}
          setKpis={setKpis}
          comunicados={comunicados}
          setComunicados={setComunicados}
        />
      );
    }
    
    return <LoginModal onLoginSuccess={onLoginSuccess} onClose={onClose} />;
}