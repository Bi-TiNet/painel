'use client';

import React from 'react';
import styles from './style.module.css';

export default function reduzidos() {
  // Link atualizado do relatório Cobrança-financeiro
  const powerBiLink = "https://app.powerbi.com/view?r=eyJrIjoiYjMyOTI3ZTQtOTQ3NS00YjllLTgxNWQtOWZjZWIxYTRjMmIyIiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9";

  return (
    <div className={styles.container}>
      <div className={styles.iframeContainer}>
        <iframe
          title="Cobrança-financeiro"
          src={powerBiLink}
          className={styles.iframe}
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}