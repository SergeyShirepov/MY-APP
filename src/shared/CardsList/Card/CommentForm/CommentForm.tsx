import React, { ChangeEvent, FormEvent } from 'react';
import * as styles from './commentForm.css';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export function CommentForm({value, onChange, onSubmit}: Props) {

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder="Write your comment here..."
      />
      <button type="submit" className={styles.button}>
        Комментировать
      </button>
    </form>
  );
}
