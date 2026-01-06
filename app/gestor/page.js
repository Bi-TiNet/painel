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
            { nome: "Vendas Geral", url: "https://app.powerbi.com/reportEmbed?reportId=0d1ef2a2-5887-408f-84d8-a46d411a1bdc&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
            { nome: "Reduzidos", url: "https://app.powerbi.com/reportEmbed?reportId=f64af684-ac51-4ece-87f5-b63379e59acf&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
            { nome: "Bloqueados", url: "https://app.powerbi.com/reportEmbed?reportId=af9c50de-33ce-4281-93dd-d86d61c94e60&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" }
        ]
      },
      {
        departamento: "Técnico & Suporte",
        relatorios: [
            { nome: "Painel de Técnicos", url: "https://app.powerbi.com/reportEmbed?reportId=e71d279f-c612-4c46-b89b-7da1a1d2759c&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
            { nome: "Suporte Técnico", url: "https://app.powerbi.com/reportEmbed?reportId=28dcc1da-2fbf-4d2b-9dfc-2321c215096e&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
        ]
      },
      {
        departamento: "Ferramentas Externas",
        relatorios: [
            { nome: "Pesquisa de Satisfação", url: "https://app.powerbi.com/reportEmbed?reportId=fabe23fd-6717-4e86-8546-061be11850d5&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" }
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
            { nome: "Painel Geral", url: "https://app.powerbi.com/reportEmbed?reportId=dfe63e38-3a6f-433d-bfce-0fdf04386092&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
            { nome: "Ativados e Cancelados", url: "https://app.powerbi.com/reportEmbed?reportId=55d69b11-78f5-425b-a9ac-e5a6b6b75d13&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
            { nome: "Saldo Contratos", url: "https://app.powerbi.com/reportEmbed?reportId=d447051c-dc26-4fa8-bd5d-ab048097cfa4&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" },
            { nome: "Valores ativados e cancelados", url: "https://app.powerbi.com/reportEmbed?reportId=8fde1737-4aba-4b22-8cbf-89ad1b1c8249&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false" }
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