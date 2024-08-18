import React from 'react';
import * as styles from './searchblock.css';
import {UserBlock} from './UserBlock/UserBlock';

export function SearchBlock() {
  return (
    <div className={styles.serchblock}>
      <UserBlock />
    </div>

  );
}
