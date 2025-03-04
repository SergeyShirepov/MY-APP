import React from "react";
import * as styles from './comments.css';
import { CommentItem } from "./CommentItem/CommentItem";

interface Props {
    comments: string[];
}

export function Comments ( {comments}:Props) {
    return (
        <div style={{marginTop: '20px'}}>
                {comments.map((comment:string, index:number) =>
                    <CommentItem comment ={comment} key ={index} />
                )}
        </div>
    )
}