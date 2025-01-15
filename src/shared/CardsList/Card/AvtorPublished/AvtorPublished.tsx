import React from 'react';
import * as styles from "../card.css";

interface ICardProps {
    card: {
        id: string;
        tittle: string;
        cardPreview: string;
        timePublished: string;
        timeViewed: string;
        avtor: string;
        avatar: string;
    };
}

function getTimeAgo({card}: ICardProps): string {
    const publishedDate = new Date(card.timePublished);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - publishedDate.getTime();

    const millisecondsInHour = 1000 * 60 * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInMonth = millisecondsInDay * 30; // Упрощенно считаем месяц как 30 дней
    const millisecondsInYear = millisecondsInDay * 365; // Упрощенно считаем год как 365 дней

    if (timeDifference >= millisecondsInYear) {
        const yearsAgo = Math.floor(timeDifference / millisecondsInYear);
        if (yearsAgo === 1) {
            return `более года назад`;
        } else {
            return `более ${yearsAgo} лет назад`;
        }
    } else if (timeDifference >= millisecondsInMonth) {
        const monthsAgo = Math.floor(timeDifference / millisecondsInMonth);
        if (monthsAgo === 1) {
            return `более месяца назад`;
        } else {
            return `более ${monthsAgo} месяцев назад`;
        }
    } else if (timeDifference >= millisecondsInDay) {
        const daysAgo = Math.floor(timeDifference / millisecondsInDay);
        if (daysAgo === 1) {
            return `более 1 дня назад`;
        } else {
            return `более ${daysAgo} дней назад`;
        }
    } else if (timeDifference >= millisecondsInHour) {
        const hoursAgo = Math.floor(timeDifference / millisecondsInHour);
        if (hoursAgo === 1) {
            return `более часа назад`;
        } else {
            return `более ${hoursAgo} часов назад`;
        }
    } else {
        return 'Меньше часа назад';
    }
}

const AvtorPublished = ({card}: ICardProps) => {
    return (
            <div className={styles.metaData}>
                <div className={styles.userlink}>
                    <img className={styles.avatar} src={card.avatar} alt="avatar"/>
                    <div className={styles.avtor}>
                        {card.avtor}
                    </div>
                </div>
                <span className={styles.createdAt}>
                    <span className={styles.publishedLabel}>
                        опубликовано
                    </span>
                    <span className={styles.whitespace}>
                        {getTimeAgo({card})}
                    </span>
                </span>
            </div>
    );
};

export default AvtorPublished;