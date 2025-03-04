import React from "react";
import * as styles from './commentItem.css';

interface Props {
    comment: string;
    key: number;
}
export function CommentItem({ comment, key }: Props) {
    return (
        
        <div className={styles.CommentFormContainer}>
            <div className={styles.comment}>
                {comment}
            </div>
        </div>
    )
}