import React, { useState } from 'react';
import * as styles from './header.css';
import { SearchBlock } from './SearchBlock';
import { ThreadTitle } from './ThreadTitle';
import { SortBlock } from './SortBlock';

type HeaderProps = {
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
};

export function Header({ onSortChange, onSearchChange }: HeaderProps) {
  const [selectorSort, setSelectorSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortChange = (sort: string) => {
    setSelectorSort(sort);
    onSortChange(sort);
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    onSearchChange(search);
  };

  return (
    <header className={styles.header}>
      <ThreadTitle />
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
    </header>
  );
}

