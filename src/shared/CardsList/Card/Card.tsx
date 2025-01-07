import React, { useState } from 'react';
import * as styles from './card.css';
import { Menu } from './Menu';

interface CardProps {
  card: {
    id: string;
    tittle: string;
    cardPreview: string;
    timePublished: string;
    timeViewed: string;
    avtor: string;
  };
}

export function Card({ card }: CardProps) {
  const [karmaValue, setKarmaValue] = useState(234);

  const handleUpClick = () => {
    setKarmaValue(karmaValue + 1);
  };

  const handleDownClick = () => {
    setKarmaValue(karmaValue - 1);
  };
 
  

  function getTimeAgo({ card }: CardProps): string {
    const publishedDate = new Date(card.timePublished);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - publishedDate.getTime();
  
    const millisecondsInHour = 1000 * 60 * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInMonth = millisecondsInDay * 30; // Упрощенно считаем месяц как 30 дней
    const millisecondsInYear = millisecondsInDay * 365; // Упрощенно считаем год как 365 дней
  
    if (timeDifference >= millisecondsInYear) {
      const yearsAgo = Math.floor(timeDifference / millisecondsInYear);
      if (yearsAgo===1){
        return `более года назад`;
      }else{
      return `более ${yearsAgo} лет назад`;
      }
    } else if (timeDifference >= millisecondsInMonth) {
      const monthsAgo = Math.floor(timeDifference / millisecondsInMonth);
      if (monthsAgo===1){
        return `более месяца назад`;
      }else{
      return `более ${monthsAgo} месяцев назад`;
      }
    } else if (timeDifference >= millisecondsInDay) {
      const daysAgo = Math.floor(timeDifference / millisecondsInDay);
      if (daysAgo===1){
        return `более 1 дня назад`;
      }else{
      return `более ${daysAgo} дней назад`;
      }
    } else if (timeDifference >= millisecondsInHour) {
      const hoursAgo = Math.floor(timeDifference / millisecondsInHour);
      if (hoursAgo===1){
        return `более часа назад`;
      }else{
      return `более ${hoursAgo} часов назад`;
      }
    } else {
      return 'Меньше часа назад';
    }
  }
  

  function getviewAgo({ card }: CardProps): string {
    const ViewedDate = new Date(card.timeViewed);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - ViewedDate.getTime();
  
    const millisecondsInHour = 1000 * 60 * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInMonth = millisecondsInDay * 30; // Упрощенно считаем месяц как 30 дней
    const millisecondsInYear = millisecondsInDay * 365; // Упрощенно считаем год как 365 дней
  
    if (timeDifference >= millisecondsInYear) {
      const yearsAgo = Math.floor(timeDifference / millisecondsInYear);
       if (yearsAgo === 1) {
        return'более 1 года назад';
        }else{ 
        return `более ${yearsAgo} лет назад`;
        }
    } else if (timeDifference >= millisecondsInMonth) {
      const monthsAgo = Math.floor(timeDifference / millisecondsInMonth);
      return `более ${monthsAgo} месяцев назад`;
    } else if (timeDifference >= millisecondsInDay) {
      const daysAgo = Math.floor(timeDifference / millisecondsInDay);
      return `более ${daysAgo} дней назад`;
    } else if (timeDifference >= millisecondsInHour) {
      const hoursAgo = Math.floor(timeDifference / millisecondsInHour);
      return `более ${hoursAgo} часов назад`;
    } else {
      return 'Меньше часа назад';
    }
  }

  return (
    <li className={styles.card}>
      <div className={styles.textContent}>
        <div className={styles.metaData}>
          <div className={styles.userlink}>
            <img className={styles.avatar} src="/static/images/123.png" alt="avatar" />
            <div className={styles.avtor}>
              {card.avtor}
            </div>
          </div>
          <span className={styles.createdAt}>
            <span className={styles.publishedLabel}>опубликовано </span>
            {getTimeAgo({card})}
          </span>
        </div>
        <h2 className={styles.title}>
          <a href="" className={styles.postlink} onClick={() => console.log('clicked!')}>
            {card.tittle}
          </a>
        </h2>
      </div>
      <Menu />
      <div className={styles.preview}>
        <img className={styles.previewImg} src={card.cardPreview} alt="preview" />
      </div>
      <div className={styles.controls}>
        <div className={styles.karmaCounter}>
          <button className={styles.up} onClick={handleUpClick}>
            <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 0L0 10H19L9.5 0Z" fill="#C4C4C4" />
            </svg>
          </button>
          <span className={styles.karmavalue}>{karmaValue}</span>
          <button className={styles.down} onClick={handleDownClick}>
            <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 0L0 10H19L9.5 0Z" fill="#C4C4C4" />
            </svg>
          </button>
        </div>
        <button className={styles.commentsButton}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.75 0H1.41667C0.6375 0 0 0.6375 0 1.41667V9.91667C0 10.6958 0.6375 11.3333 1.41667 11.3333H11.3333L14.1667 14.1667V1.41667C14.1667 0.6375 13.5292 0 12.75 0ZM11.3333 8.5H2.83333V7.08333H11.3333V8.5ZM11.3333 6.375H2.83333V4.95833H11.3333V6.375ZM11.3333 4.25H2.83333V2.83333H11.3333V4.25Z" fill="#C4C4C4" />
          </svg>
          <span className={styles.commentsNumber}>13</span>
        </button>

        <div className={styles.action}>
          <button className={styles.shareButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="10" fill="#C4C4C4" />
              <path d="M11.6667 12.0683C11.3289 12.0683 11.0267 12.2189 10.7956 12.4548L7.62667 10.3715C7.64889 10.256 7.66667 10.1406 7.66667 10.0201C7.66667 9.8996 7.64889 9.78414 7.62667 9.66867L10.76 7.60542C11 7.85643 11.3156 8.01205 11.6667 8.01205C12.4044 8.01205 13 7.33936 13 6.50602C13 5.67269 12.4044 5 11.6667 5C10.9289 5 10.3333 5.67269 10.3333 6.50602C10.3333 6.62651 10.3511 6.74197 10.3733 6.85743L7.24 8.92068C7 8.66968 6.68444 8.51406 6.33333 8.51406C5.59556 8.51406 5 9.18675 5 10.0201C5 10.8534 5.59556 11.5261 6.33333 11.5261C6.68444 11.5261 7 11.3705 7.24 11.1195L10.4044 13.2078C10.3822 13.3133 10.3689 13.4237 10.3689 13.5341C10.3689 14.3424 10.9511 15 11.6667 15C12.3822 15 12.9644 14.3424 12.9644 13.5341C12.9644 12.7259 12.3822 12.0683 11.6667 12.0683Z" fill="white" />
            </svg>
          </button>

          <button className={styles.savebutton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="10" fill="#C4C4C4" />
              <path d="M6 7H5V14C5 14.55 5.45 15 6 15H13V14H6V7ZM14 5H8C7.45 5 7 5.45 7 6V12C7 12.55 7.45 13 8 13H14C14.55 13 15 12.55 15 12V6C15 5.45 14.55 5 14 5ZM13.5 9.5H11.5V11.5H10.5V9.5H8.5V8.5H10.5V6.5H11.5V8.5H13.5V9.5Z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
