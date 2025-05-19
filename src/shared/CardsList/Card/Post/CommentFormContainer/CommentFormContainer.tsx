import React, { ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommentForm } from '../CommentForm/CommentForm';
import { setCommentText } from '../../../../../store/features/comment';

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
    dispatch(setCommentText(e.target.value));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('Comment submitted:', value);
    setComments((prevComments: string[]) => [...prevComments, value]);
    dispatch(setCommentText(''));
  }

  return (
    <CommentForm 
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
    />
  );
}
