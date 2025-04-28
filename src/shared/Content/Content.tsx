import * as styles from './content.css';
import React from 'react';

interface IContentProps {
  children?: React.ReactNode;
}

export function Content({ children }: IContentProps) {

console.log('Рендер Content');
  return (
    <main className={styles.content}>
      {children}
    </main>
  );
}
