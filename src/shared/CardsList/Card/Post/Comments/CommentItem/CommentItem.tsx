import React from "react";

interface Props {
    number:number;
    comment:string;
    key:number;
}
export function CommentItem ({number, comment, key}: Props ) {
    return (
        <div>
        {number} {comment}
        </div>
    )
}