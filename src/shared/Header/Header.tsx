import React, { useEffect, useState } from 'react';
import * as styles from './header.css';
import { SearchBlock } from './SearchBlock';
import { ThreadTitle } from './ThreadTitle';
import { SortBlock } from './SortBlock';

interface IHederProps {
  token?: string | undefined
}

export function Header({ token }: IHederProps) {
  return (
<header className={styles.header}>
{token ? <SearchBlock token={token} /> : <SearchBlock />}
  <ThreadTitle />
  <SortBlock />
</header>
  );
}
