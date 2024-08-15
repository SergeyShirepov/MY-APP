import React from 'react';
import * as styles from './menuitemlist.css';
import {WarningIcon} from '../../../../Icons';

const postId = 1;

interface IMenuItemListProps {
  postId: string;
}

export function MenuItemList({postId}: IMenuItemListProps) {
  return (
<ul className={styles.menuitemlist}>
  <li className={styles.menuItem} onClick={() =>console.log(postId)}>
    {/* <BlockIcon /> */}
    {/* <Text size={12} color={EColors.grey99}>Скрыть</Text> */}
  </li>

<div className={styles.divider} />

<li className={styles.menuItem}>
  <WarningIcon />Пожаловаться
  {/* <Text size={12} color={EColors.grey99}>Пожаловаться</Text> */}
  </li> 
   </ul>  
   );
}
