import React, { useState } from 'react';
import * as styles from './header.css';
import { SearchBlock } from './SearchBlock';
import { ThreadTitle } from './ThreadTitle';
import { SortBlock } from './SortBlock';

type HeaderProps = {
  onSortChange: (sort: string) => void;
};

export function Header({ onSortChange}: HeaderProps) {
  const [selectorSort, setSelectorSort] = useState('');

  const handleSortChange  = (sort: string) => {
    setSelectorSort(sort);
    onSortChange(sort);
  };
  
  return (
    <header className={styles.header}>
      <ThreadTitle />
      <SortBlock
        value={selectorSort}
        onChange={handleSortChange}
        defaultValue='Сортировать список'
        options={[
          {value: 'karma', name: 'Лучшие'},
          {value: 'dataPost', name: 'По дате'},
        ]}
      />
      <SearchBlock />
    </header>
  );
}

