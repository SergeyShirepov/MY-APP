import React, {useState} from 'react';
import * as styles from './karmacounter.css';


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

const KarmaCounter = ({card}: ICardProps) => {
    const [karmaValue, setKarmaValue] = useState(234);

    const handleUpClick = () => {
        setKarmaValue(karmaValue + 1);
    };

    const handleDownClick = () => {
        setKarmaValue(karmaValue - 1);
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