import React, { useState } from 'react';
import * as styles from './header.css';
import { SearchBlock } from './SearchBlock';
import { SortBlock } from './SortBlock';
import { useLocation } from 'react-router-dom';
import { Navi } from './Navi/Navi';

type HeaderProps = {
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
};

export function Header({ onSortChange, onSearchChange }: HeaderProps) {
  const [selectorSort, setSelectorSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isAccountPage = location.pathname === '/account';

  const handleSortChange = (sort: string) => {
    setSelectorSort(sort);
    onSortChange(sort);
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    onSearchChange(search);
  };

  return (
    <>
    <header className={styles.header}>
      <div className={styles.topHeader}>
    <h1 className={styles.threadTitle}>
      {isAccountPage ? 'Личный кабинет' : 'Дискуссии'}
    </h1>
      <SortBlock
        value={selectorSort}
        onChange={handleSortChange}
        defaultValue='Сортировать список'
        options={[
          { value: 'karma', name: 'Лучшие' },
          { value: 'dataPost', name: 'По дате' },
        ]}
      />
    
      <SearchBlock
        value={searchQuery}
        onChange={handleSearchChange}
        type="text"
        name="query"
        placeholder=" Поиск " 
        required
      />
      </div>
    { isAccountPage && <Navi /> }
    </header>
    </>
  );
}

