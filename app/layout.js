// app/layout.js
import StyledComponentsRegistry from '@/lib/registry';

export const metadata = {
  title: 'Painel Ti.Net',
  description: 'Dashboard Corporativo',
};

const bodyStyles = {
  backgroundColor: '#061633',
  margin: 0,
  padding: 0,
  fontFamily: "'Poppins', sans-serif", // Define a fonte Poppins como padrão
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        {/* Importação da fonte Poppins diretamente do Google */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={bodyStyles}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}