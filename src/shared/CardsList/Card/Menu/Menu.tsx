import React from 'react';
import * as styles from './menu.css';
import { MenuIcon } from '../../../Icons';

export function Menu() {
  return (
<div className={styles.menu}>
  <button className={styles.menuButton}>
   <MenuIcon />
  </button>
</div>
  );
}
