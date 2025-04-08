import React from 'react';
import * as styles from './menu.css';
import { Dropdown } from './Dropdown';
import { EColor, Text } from '../../../Text';
import { MenuItemList } from './MenuItemList';

export function Menu( {postId}: {postId: string} ) {
  return (
    <div className={styles.menu} onClick={(e) => e.preventDefault()}>
      <Dropdown
        button={
          <button className={styles.menuButton}>
            <svg width="20" height="5" viewBox="0 0 20 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17.5" cy="2.5" r="2.5" transform="rotate(90 17.5 2.5)" fill="#D9D9D9" />
              <circle cx="10" cy="2.5" r="2.5" transform="rotate(90 10 2.5)" fill="#D9D9D9" />
              <circle cx="2.5" cy="2.5" r="2.5" transform="rotate(90 2.5 2.5)" fill="#D9D9D9" />
            </svg>
          </button>
        }
      >
        <div className={styles.dropDown}>
          <MenuItemList postId={postId} />
          <button className={styles.closeButton}>
            <Text mobileSize={12} size={14} color={EColor.gray66} >
              Закрыть
            </Text>
          </button>
        </div>

      </Dropdown>
    </div>
  );
}
