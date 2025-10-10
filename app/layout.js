// app/layout.js
'use client';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from './components/GlobalStyles'; // Importa os estilos globais

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <title>Painel Ti.Net</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles /> {/* Aplica os estilos globais */}
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}