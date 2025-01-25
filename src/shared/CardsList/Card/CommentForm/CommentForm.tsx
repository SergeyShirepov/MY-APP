import React, { ChangeEvent, FormEvent } from 'react';
import * as styles from './commentForm.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateComment } from '../../../../store'; // Импортируйте экшен из commentSlice

interface RootState {
  commentText: string;
}

export function CommentForm() {

  const value = useSelector((state: RootState) => state.commentText);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateComment(e.target.value));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('Comment submitted:', value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder="Write your comment here..."
      />
      <button type="submit" className={styles.button}>
        Комментировать
      </button>
    </form>
  );
}
