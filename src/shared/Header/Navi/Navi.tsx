import React from "react";
import * as styles from './navi.css';

export function Navi () {

    return (
        <nav>
            <ul className={styles.navi}>
            <li>Просмотренное</li>
            <li>Сохранённое</li>
            <li>Мои посты</li>
            <li>Прокоментированные</li>
            </ul>
        </nav>
    )
}