import React from "react";
import * as styles from './myButton.css';

// Тип для пропсов
type MyButtonProps = {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function MyButton({ children, ...props }: MyButtonProps) {
    return (
        <button
            type="submit"
            className={styles.button}
            {...props}
        >
            {children}
        </button>
    );
}