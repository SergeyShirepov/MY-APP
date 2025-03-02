import React from 'react';
import * as styles from './header.css';
import { SearchBlock } from './SearchBlock';
import { ThreadTitle } from './ThreadTitle';
import { SortBlock } from './SortBlock';

export function Header(){
  return (
      <header className={styles.header}>
        <ThreadTitle/>
        <SortBlock/>
        <SearchBlock/>
      </header>
  );
}

