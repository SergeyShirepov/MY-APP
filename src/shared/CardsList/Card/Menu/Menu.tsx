import React from 'react';
import * as styles from './menu.css';
import { MenuIcon } from '../../../Icons';
import { Dropdown } from '../../../Dropdown';
// import {EColors, Text} from '../../../Text';
import {MenuItemList} from './MenuItemList';

export function Menu() {
  return (
<div className={styles.menu}>
<Dropdown
button ={
  <button className={styles.menuButton}>
   <MenuIcon />
  </button>
}
 >
  <div className={styles.dropDown}>
    <MenuItemList postId='1234'/> 
  <button className={styles.closeButton}>
    {/* <Text mobileSize={12} size={14} color={EColors.grey66} > */}
      Закрыть
    {/* </Text> */}
  </button>
  </div>

  </Dropdown>
</div>
  );
}
