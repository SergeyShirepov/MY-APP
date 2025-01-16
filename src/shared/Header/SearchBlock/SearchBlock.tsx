import React, {useContext} from 'react';
import * as styles from './searchblock.css';
import {UserBlock} from './UserBlock';
import { userContext } from '../../context/useContext';



export function SearchBlock() {
  const {iconImg, name} = useContext(userContext)

  return (
    <div className={styles.serchblock}>
      <UserBlock avatarSrc={iconImg} username={name} />
    </div>

  );
}
