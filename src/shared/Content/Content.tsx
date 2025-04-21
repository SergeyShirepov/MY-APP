import * as styles from './content.css';
import React from 'react';

interface IContentProps {
  children?: React.ReactNode;
}

export function Content({ children }: IContentProps) {
  return (
    <main className={styles.content}>
      {children}
    </main>
  );
}
