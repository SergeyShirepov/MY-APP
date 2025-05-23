import React from 'react';
import { ICardType } from '../../../../types/ICardType';
import useKarma from '../../../../Hooks/useKarma';
import * as styles from './karmacounter.css';


export function KarmaCounter ({ card }: { card: ICardType }) {
    const { karmaValue, isLoading, error, updateKarma } = useKarma(card.karmaValue, card.id);

    return (
        <div className={styles.karmaCounter}>
            <button className={styles.up} onClick={() => updateKarma(1)} disabled={isLoading}>
                <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0L0 10H19L9.5 0Z" fill="#C4C4C4" />
                </svg>
            </button>
            <span className={styles.karmavalue}>{karmaValue}</span>
            <button className={styles.down} onClick={() => updateKarma(-1)} disabled={isLoading}>
                <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0L0 10H19L9.5 0Z" fill="#C4C4C4" />
                </svg>
            </button>
        </div>
    );
};