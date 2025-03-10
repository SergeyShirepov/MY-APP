import React, {useState} from 'react';
import * as styles from './karmacounter.css';
import { ICardProps } from '../Card';


const KarmaCounter = ({card}: ICardProps) => {
    const [karmaValue, setKarmaValue] = useState(card.karmaValue);
    
    // Функция для обновления кармы на сервере
const updateKarma = async (delta: number) => {
  try {
    const response = await fetch(`/api/posts/${card.id}/karma`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ delta }), // Отправляем изменение кармы (+1 или -1)
    });

    if (!response.ok) {
      throw new Error('Failed to update karma');
    }

    const updatedPost = await response.json();
    setKarmaValue(updatedPost.karmaValue); // Обновляем состояние
  } catch (error) {
    console.error('Error updating karma:', error);
  }
};

const handleUpClick = () => {
  updateKarma(1); // Увеличиваем карму на 1
};

const handleDownClick = () => {
  updateKarma(-1); // Уменьшаем карму на 1
};


    return (
        <div className={styles.karmaCounter}>
            <button className={styles.up} onClick={handleUpClick}>
                <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0L0 10H19L9.5 0Z" fill="#C4C4C4"/>
                </svg>
            </button>
            <span className={styles.karmavalue}>{karmaValue}</span>
            <button className={styles.down} onClick={handleDownClick}>
                <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0L0 10H19L9.5 0Z" fill="#C4C4C4"/>
                </svg>
            </button>
        </div>
    );
};

export default KarmaCounter;