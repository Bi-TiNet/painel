// app/gestor/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './style.css'; // Importa o CSS que você copiou

// Dados do seu script.js
const database = [
  {
    menu: "Painéis",
    departamentos: [
      {
        departamento: "Comercial & Financeiro",
        relatorios: [
            { nome: "Vendas Geral", url: "https://app.powerbi.com/reportEmbed?reportId=0d1ef2a2-5887-408f-84d8-a46d411a1bdc&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
            { nome: "Reduzidos", url: "https://app.powerbi.com/reportEmbed?reportId=f64af684-ac51-4ece-87f5-b63379e59acf&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
            { nome: "Bloqueados", url: "https://app.powerbi.com/reportEmbed?reportId=af9c50de-33ce-4281-93dd-d86d61c94e60&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" }
        ]
      },
      {
        departamento: "Técnico & Suporte",
        relatorios: [
            { nome: "Painel de Técnicos", url: "https://app.powerbi.com/reportEmbed?reportId=e71d279f-c612-4c46-b89b-7da1a1d2759c&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
            { nome: "Suporte Técnico", url: "https://app.powerbi.com/reportEmbed?reportId=28dcc1da-2fbf-4d2b-9dfc-2321c215096e&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" }
        ]
      },
      {
        departamento: "Ferramentas Externas",
        relatorios: [
            { nome: "WOW Chat", url: "https://app.powerbi.com/view?r=eyJrIjoiOWZlNGI5ODItOWZkNC00MGRmLTk4N2YtYmE0OTkxOGQxMWU1IiwidCI6IjhiNDkxZGJmLTU4ZTEtNGNkNS05OGQ3LTEyYjY4ZWNkNDEzNCJ9&navContentPaneEnabled=false&filterPaneEnabled=false" }
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
            { nome: "Vendas Geral", url: "" },
            { nome: "Reduzidos", url: "" },
            { nome: "Bloqueados", url: "" }
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
  
  // Estados para controlar os menus accordion
  const [activeMenu, setActiveMenu] = useState(0); // Abre o primeiro menu por padrão
  const [activeDept, setActiveDept] = useState(null);

  // Referências para o DOM (para tela cheia)
  const reportWrapperRef = useRef(null);
  const btnFullscreenRef = useRef(null);
  
  // --- PASSO 4: SEGURANÇA ---
  // Verifica se o usuário está logado (pelo localStorage)
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      // Se não estiver logado, volta para a página principal
      router.push('/');
    }
  }, [router]);

  // Função para carregar o relatório
  const loadReport = (relatorio, departamentoNome) => {
    setIsLoading(true);
    setSelectedReport({ ...relatorio, departamentoNome });
    // O iframe 'onload' vai esconder o spinner
  };

  // Função para controlar a tela cheia
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

  // Monitorar mudança de tela cheia para resetar ícone
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

  // JSX que recria o index.html
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo-area">
          {/* Usamos o Image do Next.js para otimização */}
          <Image src="/logo ti.net.png" alt="Logo" width={120} height={40} />
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

        <div className="sidebar-footer">
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
          
          {/* Estado Vazio (Inicial) */}
          {!selectedReport && (
            <div id="empty-state" className="empty-state">
              <i className="ph ph-chart-bar"></i>
              <h3>Selecione um departamento</h3>
              <p>Navegue pelo menu lateral para visualizar os indicadores.</p>
            </div>
          )}

          {/* Iframe (só mostra se tiver um relatório) */}
          {selectedReport && (
            <iframe
              id="main-frame"
              className="powerbi-frame"
              src={selectedReport.url}
              onLoad={() => setIsLoading(false)} // Esconde o spinner quando carrega
              frameBorder="0"
              allowFullScreen={true}
              style={{ display: 'block' }} // Mostra o iframe
            ></iframe>
          )}

          {/* Loading */}
          {isLoading && (
            <div id="loading-spinner" className="loading-overlay" style={{ display: 'flex' }}>
              <div className="spinner"></div>
              <p>Carregando dados...</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}