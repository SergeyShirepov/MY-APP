import React, { useEffect, useState } from 'react';
import { UserBlock } from './UserBlock';
import * as styles from './searchblock.css';
import { RootState, setSearchBy } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { IUserData } from '../../../store/actions';

interface SearchBlockProps {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
}

export function SearchBlock({ type, name, placeholder, required }: SearchBlockProps) {
  const {loading, data} = useSelector((state: RootState) => state.userData);
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
