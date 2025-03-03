import React from "react";
import * as styles from './comments.css';
import { CommentItem } from "./CommentItem/CommentItem";

interface Props {
    comments: string[];
}

export function Comments ( {comments}:Props) {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                </h1>
                {comments.map((comment:string, index:number) =>
                    <CommentItem number={index+1} comment ={comment} key ={index} />
                )}
        </div>
    )
}