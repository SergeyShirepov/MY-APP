import React, { useEffect, useState } from 'react';
import * as styles from './searchblock.css';
import {UserBlock} from './UserBlock/UserBlock';
import axios, { AxiosResponse } from 'axios';

interface ISearchBlockProps {
  token?: string | undefined
}

interface IUserData {
  name?:string;
  iconImg?: string;
}

export function SearchBlock({token}: ISearchBlockProps) {
  const [data, setData] = useState<IUserData>({});
  useEffect(() => {
    if (token) {
      axios.get('https://oauth.reddit.com/api/v1/me', {
        headers: { Authorization: `bearer ${token}` }
      })
      .then((resp) => {
        const userData = resp.data;
        setData({ name: userData.name, iconImg: userData.icon_img });
      })
      .catch(console.log);
    }
  }, [token]);

  return (
    <div className={styles.serchblock}>
      <UserBlock avatarSrc={data.iconImg} username={data.name} />
    </div>

  );
}
