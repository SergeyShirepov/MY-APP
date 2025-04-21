import React, { useEffect, useState } from 'react';
import { useUserData } from '../../../Hooks/useUserData';
import { UserBlock } from './UserBlock';
import * as styles from './searchblock.css';

interface SearchBlockProps {
  onSearchSubmit: (search: string) => void;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
}

export function SearchBlock({ onSearchSubmit, type, name, placeholder, required }: SearchBlockProps) {
  const { data, loading } = useUserData();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchValue);
  };

  useEffect(() => {
    onSearchSubmit('');
  }, [searchValue === '']);

  return (
    <div className={styles.serchblock}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type={type}
          name={name}
          className={styles.searchInput}
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required={required}
        />
      </form>
      <UserBlock
        avatarSrc={data?.iconImg}
        username={data?.name}
        loading={loading}
      />
    </div>
  );
}
