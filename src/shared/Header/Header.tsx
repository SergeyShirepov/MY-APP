import React from 'react';
import * as styles from './header.css';
import { SearchBlock } from './SearchBlock';
import { ThreadTitle } from './ThreadTitle';
import { SortBlock } from './SortBlock';

interface IHederProps {
  token: string
}

export function Header({ token }: IHederProps) {
  return (
<header className={styles.header}>
  <SearchBlock token={token} />
  <ThreadTitle />
  <SortBlock />
</header>
  );
}
