// app/layout.js
'use client';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from './components/GlobalStyles';
import Script from 'next/script'; // 1. IMPORTE O SCRIPT

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <title>Painel Ti.Net</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        
        {/* 2. ADICIONE ESTA LINHA */}
        <Script src="https://unpkg.com/@phosphor-icons/web" />

      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}