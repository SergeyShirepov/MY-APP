import React from 'react';
import { Break } from '../../../Break'
import { EColor, Text } from '../../../Text';
import * as styles from './userblock.css';

interface IUserBlockProps {
  avatarSrc?: string,
  username?: string,
  loading?: boolean,
}

export function UserBlock({ avatarSrc, username, loading }: IUserBlockProps) {

  const AuthBlock = (
    <a
      href={`https://www.reddit.com/api/v1/authorize?client_id=SI6_ql3msvAkDVKeffKG_w&response_type=code&state=random_string&redirect_uri=http://localhost:8080/api/auth&duration=permanent&scope=read%20submit%20identity`}
      className={styles.userBox}
    >
      <div className={styles.avatarBox}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M25 0C11.2 0 0 11.2 0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0ZM25 7.5C29.15 7.5 32.5 10.85 32.5 15C32.5 19.15 29.15 22.5 25 22.5C20.85 22.5 17.5 19.15 17.5 15C17.5 10.85 20.85 7.5 25 7.5ZM25 43C18.75 43 13.225 39.8 10 34.95C10.075 29.975 20 27.25 25 27.25C29.975 27.25 39.925 29.975 40 34.95C36.775 39.8 31.25 43 25 43Z" fill="#D9D9D9" />
        </svg>
      </div>
      <div className={styles.username}>
        <Break size={12} />
        <Text size={20} color={EColor.gray99}>Войти</Text>
      </div>
    </a>
  );

  const UserInfo = (
    <div className={styles.userBox}>
      <div className={styles.avatarBox}>
        {avatarSrc && <img src={avatarSrc} alt="user avatar" className={styles.avatarImage} />}
      </div>
      <div className={styles.username}>
        <Break size={12} />
        {loading ? (
          <Text size={20} color={EColor.gray99}>Загрузка...</Text>
        ) : (
          <Text size={20} color={username ? EColor.black : EColor.gray99}>{username || 'Аноним'}</Text>
        )}
      </div>
    </div>
  );

  return !username && !loading ? AuthBlock : UserInfo;
}
