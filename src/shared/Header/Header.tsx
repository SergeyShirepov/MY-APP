import React, { useContext, useEffect, useState } from 'react';
import * as styles from './header.css';
import { SearchBlock } from './SearchBlock';
import { ThreadTitle } from './ThreadTitle';
import { SortBlock } from './SortBlock';
import { tokenContext } from '../context/tokenContext';

interface IHederProps {
  token?: string | undefined
}

export function Header() {
  return (
<header className={styles.header}>
  <SearchBlock />  
  <ThreadTitle />
  <SortBlock />
</header>
  );
}
