import React from 'react';
import * as styles from './searchblock.css';
import { UserBlock } from './UserBlock';
import { useUserData } from '../../../Hooks/useUserData';

interface SearchBlockProps {
  value: string;
  onChange: (search: string) => void;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
}

export function SearchBlock({
  value,
  onChange,
  type,
  name,
  placeholder,
  required,
}: SearchBlockProps) {
  const { data, loading } = useUserData();

  console.log('SearchBlock render:', { data, loading });

  return (
    <div className={styles.serchblock}>
      <form className={styles.searchForm} action="/search" method="GET">
        <input 
        type={type}
        name={name}
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
