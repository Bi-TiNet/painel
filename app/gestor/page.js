// app/gestor/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script'; // Importado para os ícones
import './style.css'; // Importa o CSS

// Dados do seu script.js
const database = [
  {
    menu: "Painéis",
    departamentos: [
      {
        departamento: "Comercial & Financeiro",
        relatorios: [
            { nome: "Vendas Geral", url: "https://app.powerbi.com/view?r=eyJrIjoiZmY5N2IzZTQtZjA4NS00ZWY2LTllOTItNTg1ZTgyZTE4NmViIiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9" },
            { nome: "Reduzidos", url: "https://app.powerbi.com/view?r=eyJrIjoiZWNhODJiZTItNjQ5Mi00NGYzLTlkNzQtYmFhOTU1ODcxMzk1IiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9" },
            { nome: "Bloqueados", url: "https://app.powerbi.com/view?r=eyJrIjoiODA1ODg5NDMtYzBjNy00NTZiLThiOGUtNDZlYTgyM2M3MmZiIiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9" },
          ]
      },
      {
        departamento: "Técnico & Suporte",
        relatorios: [
            { nome: "Técnicos", url: "https://app.powerbi.com/view?r=eyJrIjoiNDJjMWNmM2UtODEyMy00ZDUzLTkzOTMtN2U0OTExYzZlN2Y1IiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9" },
            { nome: "Suporte Técnico", url: "https://app.powerbi.com/view?r=eyJrIjoiMGExOTAzMWMtMzBlNC00YzgyLTlkZGQtMWY3NTE1Mzc4MTk2IiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9" },
            ]
      },
      {
        departamento: "Ferramentas Externas",
        relatorios: [
            { nome: "Pesquisa de Satisfação", url: "https://app.powerbi.com/view?r=eyJrIjoiNzdkZWQyM2EtZTljOC00NjI5LTllYmQtOTkwOTgzZGYyNTk1IiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9" },
            ]
      }
    ]
  },
  {
    menu: "Gestão",
    departamentos: [
      {
        departamento: "Contratos",
        relatorios: [
            { nome: "Painel Geral", url: "https://app.powerbi.com/view?r=eyJrIjoiNzBmZmRmYWMtNmE0ZC00YWI5LWE4YWUtNDAwYzc1NWVjMTc0IiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9" },
            { nome: "Ativados e Cancelados", url: "https://app.powerbi.com/view?r=eyJrIjoiNjE5NjI0MWMtNWMxNi00ZGZlLWI3ODAtMDI2NjdiMGM1YzY5IiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9" },
            { nome: "Saldo Contratos", url: "https://app.powerbi.com/view?r=eyJrIjoiNmExN2NlNjMtNTFiMS00YWU5LTkzOWEtZGI0NzRiNTJhM2Y2IiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9" },
            { nome: "Valores ativados e cancelados", url: "https://app.powerbi.com/view?r=eyJrIjoiZTk0OGQ5NzAtN2FmYy00MTU5LThiMzAtYTgxZTlkMWRjYzU4IiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9" }
        ]
      }
    ]
  },
  { menu: "Menu 3 (em breve)", departamentos: [] },
  { menu: "Menu 4 (em breve)", departamentos: [] },
  { menu: "Menu 5 (em breve)", departamentos: [] }
];

export default function GestorPage() {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [activeMenu, setActiveMenu] = useState(0); 
  const [activeDept, setActiveDept] = useState(null);

  const reportWrapperRef = useRef(null);
  const btnFullscreenRef = useRef(null);
  
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      router.push('/');
    }
  }, [router]);

  const loadReport = (relatorio, departamentoNome) => {
    setIsLoading(true);
    setSelectedReport({ ...relatorio, departamentoNome });
  };

  const handleFullscreen = () => {
    const wrapper = reportWrapperRef.current;
    const btn = btnFullscreenRef.current;

    if (!document.fullscreenElement) {
      wrapper.requestFullscreen().catch(err => {
        console.error(`Erro ao ativar tela cheia: ${err.message}`);
      });
      btn.innerHTML = '<i class="ph ph-arrows-in"></i> Reduzir';
    } else {
      document.exitFullscreen();
      btn.innerHTML = '<i class="ph ph-arrows-out"></i> Expandir';
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      const btn = btnFullscreenRef.current;
      if (!btn) return;
      
      if (!document.fullscreenElement) {
        btn.innerHTML = '<i class="ph ph-arrows-out"></i> Expandir';
      } else {
        btn.innerHTML = '<i class="ph ph-arrows-in"></i> Reduzir';
      }
    };
    
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <>
      <Script src="https://unpkg.com/@phosphor-icons/web" />
      
      <div className="app-container">
        <aside className="sidebar">
          <div className="logo-area">
            <Image src="/logo ti.net.png" alt="Logo" width={120} height={40} priority />
          </div>

          <nav className="menu-nav">
            {database.map((menuItem, menuIndex) => (
              <div 
                key={menuIndex} 
                className={`main-menu-group ${activeMenu === menuIndex ? 'active' : ''}`}
              >
                <button 
                  className="main-menu-title" 
                  onClick={() => setActiveMenu(activeMenu === menuIndex ? null : menuIndex)}
                >
                  {menuItem.menu}
                  <i className="ph ph-caret-down"></i>
                </button>

                <div className="dept-container">
                  {menuItem.departamentos.map((dept, deptIndex) => (
                    <div 
                      key={deptIndex}
                      className={`dept-group ${activeDept === `${menuIndex}-${deptIndex}` ? 'active' : ''}`}
                    >
                      <button 
                        className="dept-title"
                        onClick={(e) => {
                          e.stopPropagation();
                          const id = `${menuIndex}-${deptIndex}`;
                          setActiveDept(activeDept === id ? null : id);
                        }}
                      >
                        {dept.departamento}
                        <i className="ph ph-caret-down"></i>
                      </button>

                      <div className="report-list">
                        {dept.relatorios.map((relatorio, relIndex) => (
                          <button
                            key={relIndex}
                            className={`report-btn ${selectedReport?.url === relatorio.url ? 'active' : ''}`}
                            onClick={() => loadReport(relatorio, dept.departamento)}
                          >
                            {relatorio.nome}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* --- BOTÃO MOVIDO PARA O RODAPÉ --- */}
          <div className="sidebar-footer">
            <button
              id="btn-back"
              className="footer-back-btn" // Classe CSS nova
              title="Voltar ao Painel"
              onClick={() => router.push('/')} // Ação de voltar para a home
            >
              <i className="ph ph-arrow-left"></i> Voltar ao Painel
            </button>
            <p>© 2025 TI.Net</p>
          </div>
        </aside>

        <main className="content-area">
          <header className="top-header">
            <div className="header-title">
              <h1 id="page-title">
                {selectedReport ? selectedReport.nome : 'Bem-vindo'}
              </h1>
              <span id="page-subtitle">
                {selectedReport ? `Departamento: ${selectedReport.departamentoNome}` : 'Selecione um relatório no menu lateral'}
              </span>
            </div>

            <div className="header-actions">
              
              {/* --- BOTÃO "VOLTAR" REMOVIDO DAQUI --- */}

              <button 
                id="btn-fullscreen" 
                className="action-btn" 
                title="Tela Cheia"
                ref={btnFullscreenRef}
                onClick={handleFullscreen}
              >
                <i className="ph ph-arrows-out"></i> Expandir
              </button>
            </div>
          </header>

          <div className="report-container" ref={reportWrapperRef}>
            
            {!selectedReport && (
              <div id="empty-state" className="empty-state">
                <i className="ph ph-chart-bar"></i>
                <h3>Selecione um departamento</h3>
                <p>Navegue pelo menu lateral para visualizar os indicadores.</p>
              </div>
            )}

            {selectedReport && (
              <iframe
                id="main-frame"
                className="powerbi-frame"
                src={selectedReport.url}
                onLoad={() => setIsLoading(false)} 
                frameBorder="0"
                allowFullScreen={true}
                style={{ display: 'block' }}
              ></iframe>
            )}

            {isLoading && (
              <div id="loading-spinner" className="loading-overlay" style={{ display: 'flex' }}>
                <div className="spinner"></div>
                <p>Carregando dados...</p>
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
}