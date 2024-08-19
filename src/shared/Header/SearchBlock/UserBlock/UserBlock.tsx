import React from 'react';
import { Break } from '../../../Break'
import { EColor, Text } from '../../../Text';
import { IconAnon } from '../../../Icons';
import * as styles from './userblock.css';

interface IUserBlockProps {
  avatarSrc?: string,
  username?: string,
}

export function UserBlock({avatarSrc, username}: IUserBlockProps) {
  return (
<a 
href={`https://www.reddit.com/api/v1/authorize?client_id=SI6_ql3msvAkDVKeffKG_w&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read%20submit%20identity`}
className={styles.userBox}>
  <div className={styles.avatarBox}>
    {avatarSrc
    ? <img src={avatarSrc} alt="user avatar" className={styles.avatarImage} />
  : <IconAnon />}
  </div>

  <div className={styles.username}>
    <Break size={12} />
    <Text size={20} color={username ? EColor.black : EColor.gray99}>{username || 'Аноним'}</Text>
  </div>
</a>
  );
}
