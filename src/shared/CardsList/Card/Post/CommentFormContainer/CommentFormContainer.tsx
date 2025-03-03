import React, { ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComment } from '../../../../../store/store'; // Импортируйте экшен из commentSlice
import { CommentForm } from '../CommentForm/CommentForm';

 type RootState = {
  comment: {
    commentText: string;
  }
  };

  type Props = {
    
    setComments: (updateFn: (prevComments: string[]) => string[]) => void;
  }

export function CommentFormContainer( {setComments} :Props ) {
  const value = useSelector((state: RootState) => state.comment.commentText);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateComment(e.target.value));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('Comment submitted:', value);
    setComments((prevComments: string[]) => [...prevComments, value]);
    dispatch(updateComment(''));
  }

  return (
    <CommentForm 
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
    />
  );
}
