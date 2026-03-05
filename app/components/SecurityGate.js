// app/components/SecurityGate.js
'use client';
import { useState, useEffect } from 'react';

export default function SecurityGate({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');

  // Verifica se já foi autorizado nesta aba do navegador
  useEffect(() => {
    const auth = sessionStorage.getItem('ti_net_emergency_auth');
    if (auth === 'true') setIsAuthorized(true);
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    // DEFINA SUA SENHA DE EMERGÊNCIA AQUI
    const SENHA_MESTRA = "DFsegurTI@2026"; 

    if (password === SENHA_MESTRA) {
      sessionStorage.setItem('ti_net_emergency_auth', 'true');
      setIsAuthorized(true);
    } else {
      alert("Acesso Negado. Esta tentativa foi registrada no log operacional.");
      console.warn("Tentativa de acesso não autorizada.");
    }
  };

  if (!isAuthorized) {
    return (
      <div style={{
        height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', backgroundColor: '#0f172a', color: 'white',
        position: 'fixed', top: 0, left: 0, zIndex: 9999, fontFamily: 'sans-serif'
      }}>
        <div style={{ 
          padding: '40px', borderRadius: '12px', textAlign: 'center',
          backgroundColor: '#1e293b', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          border: '2px solid #ef4444'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '10px' }}>ACESSO RESTRITO</h2>
          <p style={{ marginBottom: '20px', color: '#94a3b8' }}>Operação Ti.Net - Identifique-se para acessar os painéis.</p>
          <form onSubmit={handleVerify}>
            <input 
              type="password" 
              placeholder="Credencial de Segurança"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                padding: '12px', borderRadius: '6px', border: '1px solid #334155', 
                width: '250px', backgroundColor: '#0f172a', color: 'white', outline: 'none'
              }}
              autoFocus
            />
            <button type="submit" style={{
              display: 'block', width: '100%', marginTop: '15px', padding: '12px', 
              backgroundColor: '#ef4444', color: 'white', border: 'none', 
              borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
            }}>
              DESBLOQUEAR SISTEMA
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}