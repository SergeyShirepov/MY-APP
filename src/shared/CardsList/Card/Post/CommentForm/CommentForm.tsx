import React, { ChangeEvent, FormEvent } from 'react';
import * as styles from './commentForm.css';
import { MyTextarea } from './MyTextarea/MyTextarea';
import { MyButton } from './MyButton/MyButton';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export function CommentForm({value, onChange, onSubmit}: Props) {

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {/* <textarea
      /> */}
      <MyTextarea       
      value={value}
      onChange={onChange}
      placeholder="Write your comment here..."
      />
      <MyButton>
      Комментировать
      </MyButton>
      {/* <button type="submit" className={styles.button}>
        
      </button> */}
    </form>
  );
}
