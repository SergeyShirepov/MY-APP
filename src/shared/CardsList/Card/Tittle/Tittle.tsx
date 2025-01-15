import React, { useState } from 'react';
import * as styles from './tittle.css';
import { Post } from '../Post';

interface ICardProps {
    card: {
      id: string;
      tittle: string;
      cardPreview: string;
      timePublished: string;
      timeViewed: string;
      avtor: string;
      avatar: string;
    }
  }


export function Tittle ({ card }: ICardProps) {
    const [IsModalOpened, setIsModalOpened] = useState(false);
    let cardLength: number = card.tittle.length;
    let cardTittle;
    if (cardLength >= 62) {
        cardTittle = [card.tittle.slice(0, 62), `...`].join('');
    } else{
        cardTittle = card.tittle.slice(0, 62);}


    return (
        <h2 className={styles.tittle}>
            <span className={styles.postlink} onClick={(e) => {
                 setIsModalOpened(true);
            }}>
                {cardTittle}
            </span>

            {IsModalOpened && (
                <Post
                    card={ card }
                    onClose={() => {
                        setIsModalOpened(false);
                    }}
                />
            )}


        </h2>
    );
}