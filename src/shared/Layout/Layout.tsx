import React from 'react';
import * as styles from './layout.css';
import { CardsList } from '../CardsList';
import { Content } from '../Content';
import { Header } from '../Header';

export function Layout() {

  return (
    <div className={styles.container}>
      <Header  />
      <Content>
        <div style={{ height: '1100px' }}>
          <CardsList
          />
        </div>
      </Content>
    </div>
  );
}