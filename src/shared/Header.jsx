import * as React from 'react';
import * as styles from './header.less';

export function Header() {
    return (
        <header>
            <h1 className={styles.example}>
                Reddit for our own
            </h1>
        </header>
    );
}