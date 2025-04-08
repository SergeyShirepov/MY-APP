import React from "react";
import * as styles from './navi.css';
import { Link } from "react-router-dom";

export function Navi () {

    return (
        <nav>
            <ul className={styles.navi}>
            <li><Link to="account/viewed">Просмотренное</Link></li>
            <li><Link to="account/saved">Сохранённое</Link></li>
            <li><Link to="account/my">Мои посты</Link></li>
            <li><Link to="account/comented">Прокоментированные</Link></li>
            </ul>
        </nav>
    )
}