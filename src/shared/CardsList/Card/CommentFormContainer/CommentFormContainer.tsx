import React, { ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComment } from '../../../../store/store'; // Импортируйте экшен из commentSlice
import { CommentForm } from '../CommentForm/CommentForm';

 type RootState = {
  comment: {
    commentText: string;
  }
  };

export function CommentFormContainer() {

  const value = useSelector((state: RootState) => state.comment.commentText);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateComment(e.target.value));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('Comment submitted:', value);
  }

  return (
    <CommentForm 
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
    />
  );
}
