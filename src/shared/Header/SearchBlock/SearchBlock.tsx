import React from 'react';
import * as styles from './searchblock.css';
import { UserBlock } from './UserBlock';
import { useUserData } from '../../../Hooks/useUserData';

export function SearchBlock() {
  const { data, loading } = useUserData();

  console.log('SearchBlock render:', { data, loading });

  return (
    <div className={styles.serchblock}>
      <form className={styles.searchForm} action="/search" method="GET">
        <input type="text" name="query" className={styles.searchInput} 
        placeholder="
        Поиск
        " required />
      </form>
      <UserBlock
        avatarSrc={data?.iconImg}
        username={data?.name}
        loading={loading}
      />
    </div>
  );
}
