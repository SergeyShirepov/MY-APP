import React from "react";
import * as styles from './myTextarea.css';

type MyTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function MyTextarea (props: MyTextareaProps) {

    return (
        <textarea
        className={styles.textarea}
        {...props}
        >
      </textarea>
    );
}