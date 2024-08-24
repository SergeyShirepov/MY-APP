import React from 'react';
import * as styles from './layout.css';


interface IlayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: IlayoutProps) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}