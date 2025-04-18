import React, { useState, useEffect } from 'react';
import * as styles from './header.css';
import { SearchBlock } from './SearchBlock';
import { SortBlock } from './SortBlock';
import { Link, useLocation } from 'react-router-dom';
import { Navi } from './Navi/Navi';
import { useUserData } from '../../Hooks/useUserData';

type HeaderProps = {
  onSortChange: (sort: string) => void;
  onSearchSubmit: (search: string) => void;
};

export function Header({ onSortChange, onSearchSubmit }: HeaderProps) {
  const [selectorSort, setSelectorSort] = useState('');
  const [head, setHead] = useState('Дискуссии');
  const location = useLocation();
  const { data, loading } = useUserData();

  // Обновляем заголовок при изменении пути
  useEffect(() => {
    if (location.pathname === '/account') {
      setHead('Личный кабинет');
    } else if (location.pathname === '/') {
      setHead('Дискуссии');
    }
  }, [location.pathname]);

  const handleSortChange = (sort: string) => {
    setSelectorSort(sort);
    onSortChange(sort);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topHeader}>
        <h1 className={styles.threadTitle}>
          {head === 'Личный кабинет' ? (
            <Link to="/">{head}</Link>
          ) : ( 
            data.name ?
            <Link to="/account">{head}</Link>:
            <div style={{color: 'black'}}>{head}</div>
          )}
        </h1>
        
        {head !== 'Личный кабинет' && (
          <SortBlock
            value={selectorSort}
            onChange={handleSortChange}
            defaultValue="Сортировать список"
            options={[
              { value: 'karma', name: 'Лучшие' },
              { value: 'dataPost', name: 'По дате' },
            ]}
          />
        )}
        
        <SearchBlock
          onSearchSubmit={onSearchSubmit}
          type="text"
          name="query"
          placeholder="Поиск"
          required
        />
      </div>
      
      {head === 'Личный кабинет' && <Navi />}
    </header>
  );
}