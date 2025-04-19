import React from 'react';
import * as styles from "../card.css";
import { useGetTimeAgo } from '../../../../Hooks/useGetTimeAgo';
import { ICardType } from '../../../../types/ICardType';

export function AvtorPublished ( {card} : {card: ICardType} ) {
    const getTimeAgo = useGetTimeAgo ({card});

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
                        {getTimeAgo}
                    </span>
                </span>
            </div>
    );
}