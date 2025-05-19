import React, { useEffect, useState } from 'react';
import { UserBlock } from './UserBlock';
import * as styles from './searchblock.css';
import { useDispatch } from 'react-redux';
import { setSearchBy } from '../../../store/features/search';
import { useUserData } from '../../../Hooks/useUserData';

interface SearchBlockProps {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
}

export function SearchBlock({ type, name, placeholder, required }: SearchBlockProps) {
  const { data, loading } = useUserData();
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const onSearchSubmit = (search: string) => {
    dispatch(setSearchBy(search));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchValue);
  };

  useEffect(() => {
    onSearchSubmit('');
  }, [searchValue === '']);

  return (
    <>
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
    </>
  );
}
