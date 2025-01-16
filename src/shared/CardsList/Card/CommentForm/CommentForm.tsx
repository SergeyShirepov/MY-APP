import React, { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import * as styles from "./commentForm.css";
import { userContext } from "../../../context/useContext";
import { commentContext } from "../../../Content/commentContext";

export  function CommentForm () {
    const { value, onChange } = useContext(commentContext);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        onChange(e.target.value);
    }
    

    function handleSubmit(e:FormEvent) {
        e.preventDefault();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <textarea className={styles.input} value={value} onChange={handleChange} />
            <button type="submit" className={styles.button}>
                Комментировать
            </button>
        </form>
    );
}