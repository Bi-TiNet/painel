// app/components/GlobalStyles.js
'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Define o tamanho base da fonte com base na largura da tela. 
       Isso faz com que as unidades 'rem' se ajustem automaticamente, criando um efeito de zoom. */
    font-size: calc(0.5vw + 0.5rem); 
  }

  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #061633; /* Garante o fundo da cor correta */
  }
`;

export default GlobalStyles;