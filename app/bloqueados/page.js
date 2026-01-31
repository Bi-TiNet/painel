'use client';

import React from 'react';
import styles from './style.module.css';

export default function PainelBloqueados() {
  const powerBiLink = "https://app.powerbi.com/view?r=eyJrIjoiNjkzZDNjZGYtYTU1ZC00Mjg5LWI2NTMtZWRmMmU4NTc4OTE1IiwidCI6IjUxZTI1NjU4LWM4MmYtNGJmYy1iNDkxLTJmMzUwZTY3ZmUyYyJ9";

  return (
    <div className={styles.container}>
      <div className={styles.iframeContainer}>
        <iframe
          title="Bloqueados-financeiro"
          src={powerBiLink}
          className={styles.iframe}
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}