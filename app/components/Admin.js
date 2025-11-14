'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { adminUsers, departamentos, tiposDeComunicado } from '@/app/data';
import { useRouter } from 'next/navigation';

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
  padding: 0.5rem 1.5rem 0.5rem 0;
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
  padding: 0 1.8rem;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme, variant, disabled }) => disabled ? '#555' : (variant === 'secondary' ? 'rgba(255, 255, 255, 0.1)' : theme.colors.primary)};
  color: ${({ theme, variant, disabled }) => disabled ? '#999' : (variant === 'secondary' ? theme.colors.text : theme.colors.background)};
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  height: 45px;
  box-sizing: border-box;

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
  height: 45px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0 0.75rem;
  border-radius: 6px;
  border: 1px solid rgba(0, 224, 255, 0.4); 
  background-color: rgba(0, 224, 255, 0.1); 
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  height: 45px;
  box-sizing: border-box;

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

const DeptSelectorButton = styled(Button)`
  width: 100%;
`;

const DeptTag = styled.span`
  background-color: ${props => props.color};
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
`;

// --- Sub-componente Modal de Seleção ---
function DeptSelectionModal({ onSave, onCancel, initialSelectedDepts }) {
    const [selected, setSelected] = useState(initialSelectedDepts);

    const handleCheckboxChange = (deptName) => {
        setSelected(prev => 
            prev.includes(deptName) 
                ? prev.filter(d => d !== deptName) 
                : [...prev, deptName]
        );
    };

    return (
        <Overlay onClick={onCancel}>
            <Modal style={{height: 'auto', maxWidth: '500px'}} onClick={e => e.stopPropagation()}>
                <Title>Selecione os Departamentos</Title>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0'}}>
                    {departamentos.map(dep => (
                        <label key={dep.id} style={{display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', cursor: 'pointer'}}>
                            <input 
                                type="checkbox" 
                                checked={selected.includes(dep.nome)}
                                onChange={() => handleCheckboxChange(dep.nome)}
                                style={{width: '18px', height: '18px'}}
                            />
                            {dep.nome}
                        </label>
                    ))}
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem'}}>
                    <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                    <Button onClick={() => onSave(selected)}>Confirmar</Button>
                </div>
            </Modal>
        </Overlay>
    );
}

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
    const router = useRouter();

    const handleGoToGestor = () => {
    onClose(); // Fecha o modal
    router.push('/gestor'); // Redireciona para a nova página
  };
    
    const [newKpi, setNewKpi] = useState({ departamento: departamentos[0].nome, nome: '', valor: '' });
    
    const [formComunicado, setFormComunicado] = useState({ id: null, tipo: 'aviso', texto: '', departamentos: [] });
    const isEditing = formComunicado.id !== null;
    const [showDeptModal, setShowDeptModal] = useState(false);

    const handleAddKpi = () => {
        if (!newKpi.nome.trim() || !newKpi.valor.trim()) return;
        const novaMeta = { id: Date.now(), ...newKpi };
        setTempKpis([...tempKpis, novaMeta]);
        setNewKpi({ departamento: departamentos[0].nome, nome: '', valor: '' }); // Reset
    };

    const handleRemoveKpi = (id) => {
        setTempKpis(tempKpis.filter(k => k.id !== id));
    };

    const handleEditComunicado = (comunicado) => {
        setFormComunicado({
            id: comunicado.id,
            tipo: comunicado.tipo.toLowerCase(),
            texto: comunicado.texto,
            departamentos: comunicado.departamentos || [],
        });
    };

    const handleSaveComunicado = () => {
        if (!formComunicado.texto.trim() || formComunicado.departamentos.length === 0) {
            alert("Por favor, preencha a mensagem e selecione ao menos um departamento.");
            return;
        }

        const newOrUpdatedComunicado = {
            id: isEditing ? formComunicado.id : Date.now(),
            tipo: formComunicado.tipo.toUpperCase(),
            texto: formComunicado.texto,
            departamentos: formComunicado.departamentos,
            autor: user
        };

        if (isEditing) {
            setTempComunicados(tempComunicados.map(c => c.id === formComunicado.id ? newOrUpdatedComunicado : c));
        } else {
            setTempComunicados([newOrUpdatedComunicado, ...tempComunicados]);
        }
        setFormComunicado({ id: null, tipo: 'aviso', texto: '', departamentos: [] });
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
      <>
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
                      <>
                        <FormSection>
                            <SectionTitle>Adicionar Nova Meta</SectionTitle>
                            <FormRow style={{gridTemplateColumns: '1.5fr 2fr 1fr auto'}}>
                                <Select value={newKpi.departamento} onChange={e => setNewKpi({...newKpi, departamento: e.target.value})}>
                                    {departamentos.map(dep => (
                                        <option key={dep.id} value={dep.nome}>{dep.nome}</option>
                                    ))}
                                </Select>
                                <Input placeholder="Nome da meta" value={newKpi.nome} onChange={e => setNewKpi({...newKpi, nome: e.target.value})} />
                                <Input placeholder="Valor da meta" value={newKpi.valor} onChange={e => setNewKpi({...newKpi, valor: e.target.value})} />
                                <Button onClick={handleAddKpi}>Adicionar</Button>
                            </FormRow>
                        </FormSection>
                        <FormSection>
                            <SectionTitle>Metas Ativas</SectionTitle>
                            {tempKpis.map((kpi) => (
                                <FormRow key={kpi.id} style={{gridTemplateColumns: '1.5fr 2fr 1fr auto'}}>
                                   <Input readOnly value={kpi.departamento} style={{backgroundColor: 'rgba(0,0,0,0.2)'}} />
                                   <Input readOnly value={kpi.nome} style={{backgroundColor: 'rgba(0,0,0,0.2)'}} />
                                   <Input readOnly value={kpi.valor} style={{backgroundColor: 'rgba(0,0,0,0.2)'}} />
                                   <Button variant="secondary" onClick={() => handleRemoveKpi(kpi.id)}>Remover</Button>
                                </FormRow>
                            ))}
                        </FormSection>
                      </>
                    )}

                    {activeTab === 'comunicados' && (
                      <>
                        <FormSection>
                            <SectionTitle>{isEditing ? 'Editando Comunicado' : 'Criar Novo Comunicado'}</SectionTitle>
                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                                <Select value={formComunicado.tipo} onChange={e => setFormComunicado({...formComunicado, tipo: e.target.value, departamentos: []})}>
                                    {tiposDeComunicado.map(tipo => (
                                        <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                                    ))}
                                </Select>
                                <DeptSelectorButton onClick={() => setShowDeptModal(true)}>
                                    Selecionar Departamentos ({formComunicado.departamentos.length})
                                </DeptSelectorButton>
                            </div>

                            {formComunicado.departamentos.length > 0 && (
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.5rem 0'}}>
                                    {formComunicado.departamentos.map(deptName => {
                                        const dept = departamentos.find(d => d.nome === deptName);
                                        return <DeptTag key={dept.id} color={dept.cor}>{dept.nome}</DeptTag>
                                    })}
                                </div>
                            )}
                            
                            <Input as="textarea" rows="4" placeholder="Digite a mensagem do comunicado..." value={formComunicado.texto} onChange={e => setFormComunicado({...formComunicado, texto: e.target.value})} style={{height: 'auto', margin: '1rem 0'}}/>
                            
                            <div style={{textAlign: 'right', display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                               {isEditing && (
                                 <Button variant="secondary" onClick={() => setFormComunicado({ id: null, tipo: 'aviso', texto: '', departamentos: [] })}>
                                   Cancelar Edição
                                 </Button>
                               )}
                               <Button onClick={handleSaveComunicado} disabled={!formComunicado.texto.trim() || formComunicado.departamentos.length === 0}>
                                   {isEditing ? 'Salvar Alterações' : 'Publicar'}
                               </Button>
                            </div>
                        </FormSection>

                         <FormSection>
                            <SectionTitle>Comunicados Ativos</SectionTitle>
                            {tempComunicados.length > 0 ? tempComunicados.map((comunicado) => (
                                <div key={comunicado.id} style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem'}}>
                                    <Input value={comunicado.texto} readOnly style={{backgroundColor: 'rgba(0,0,0,0.2)', whiteSpace: 'pre-wrap', flexGrow: 1, height: 'auto'}} as="textarea" rows="2" />
                                    <Button onClick={() => handleEditComunicado(comunicado)}>Editar</Button>
                                    <Button variant="secondary" onClick={() => handleRemoveComunicado(comunicado.id)}>Remover</Button>
                                </div>
                            )) : <p>Nenhum comunicado ativo.</p>}
                        </FormSection>
                      </>
                    )}
                </ContentArea>

                <Footer>
                    {/* V--- BOTÃO ADICIONADO ---V */}
                    <Button variant="secondary" onClick={handleGoToGestor}>
                        Acessar Portal do Gestor
                    </Button>
                    {/* A--- BOTÃO ADICIONADO ---A */}
                    <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar Tudo e Fechar</Button>
                </Footer>
            </Modal>
        </Overlay>

        {showDeptModal && (
            <DeptSelectionModal 
                initialSelectedDepts={formComunicado.departamentos}
                onCancel={() => setShowDeptModal(false)}
                onSave={(depts) => {
                    setFormComunicado({...formComunicado, departamentos: depts});
                    setShowDeptModal(false);
                }}
            />
        )}
      </>
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