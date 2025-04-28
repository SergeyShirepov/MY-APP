import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navi } from './Navi/Navi';
import { SearchBlock } from './SearchBlock';
import { SortBlock } from './SortBlock';
import * as styles from './header.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


export function Header() {

  const [head, setHead] = useState('Дискуссии');
  const location = useLocation();

  
  console.log('----------HEADER-------------',[location.pathname]);
  const accountPoint = useSelector((state: RootState) => state.accountPoint.accountPoint);
  const sortBy = useSelector((state: RootState) => state.sortBy.sortBy);
  const searchBy = useSelector((state: RootState) => state.searchBy.searchBy);

  // Обновляем заголовок при изменении пути
  useEffect(() => {
    if (location.pathname === '/account') {
      setHead('Личный кабинет');
    } else if (location.pathname === '/') {
      setHead('Дискуссии');
    }
  }, [location.pathname]);

  return (
    <>
    <header className={styles.header}>
      <div className={styles.topHeader}>
        <div className={styles.topHeaderLeft}>
          <h1 className={styles.threadTitle}>
            {head === 'Личный кабинет' ? (
              <Link to="/">{head}</Link>
            ) : (
                <Link to="/account">{head}</Link> 
            )}
          </h1>

          {head !== 'Личный кабинет' && (
            <SortBlock
              defaultValue="Сортировать список"
              options={[
                { value: 'karma', name: 'Лучшие' },
                { value: 'dataPost', name: 'По дате' },
              ]}
            />
          )}
        </div>

        <SearchBlock
          type="text"
          name="query"
          placeholder="Поиск"
          required
        />
      </div>

      {head === 'Личный кабинет' && <Navi />}
    </header>
    </>
  );
}