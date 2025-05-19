import React from "react";
import * as styles from './navi.css';
import { Link, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccountPoint } from "../../../store/features/accountPoint";

export function Navi () {
    const dispatch = useDispatch();
    const match = useMatch('/posts/:id');

    return (
        <nav>
            <ul className={styles.navi}>
            <li><Link to="account/viewed" onClick={(e) => dispatch(setAccountPoint('viewed'))} >Просмотренное</Link></li>
            <li><Link to="account/saved" onClick={(e) => dispatch(setAccountPoint('saved'))}>Сохранённое</Link></li>
            <li><Link to="account/my" onClick={(e) => dispatch(setAccountPoint('my'))}>Мои посты</Link></li>
            <li><Link to="account/comented" onClick={(e) => dispatch(setAccountPoint('commented'))}>Прокоментированные</Link></li>
            </ul>
        </nav>
    )
}