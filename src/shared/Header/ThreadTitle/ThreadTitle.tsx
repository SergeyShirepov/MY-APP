import React from 'react';
import * as styles from './ThreadTitle.css';
import { useLocation, useNavigate } from 'react-router-dom';

export function ThreadTitle() {
  const location = useLocation();

  const isAccountPage = location.pathname === '/account';


  return (
<h1 className={styles.threadTitle}>
  {isAccountPage ? 'Личный кабинет' : 'Дискуссии'}
</h1>
  );
}
