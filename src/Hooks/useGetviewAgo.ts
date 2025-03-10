import { ICardProps } from '../shared/CardsList/Card';

export function useGetviewAgo({ card }: ICardProps): string {
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
            return 'более 1 года назад';
        } else {
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