import React, {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import * as styles from "./post.css";
import {AvtorPublished} from "../AvtorPublished/AvtorPublished";
import KarmaCounter from "../KarmaCounter/KarmaCounter";
import { CommentFormContainer } from "./CommentFormContainer/CommentFormContainer";
import { useNavigate } from 'react-router-dom';
import { Comments } from './Comments/Comments';
import { ICardProps } from "../Card";


export function Post({card}: ICardProps) {

    const ref = useRef<HTMLDivElement>(null);
    const [isInitialClickIgnored, setIsInitialClickIgnored] = useState(true);
    const navigate = useNavigate();
    const [comments, setComments] = useState<string[]>([]);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target instanceof Node && !ref.current?.contains(event.target)) {
                navigate('/');
            }
        }
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [navigate, isInitialClickIgnored]);


    const node = document.querySelector("#modal_root");
    if (!node) return null;
console.log(card.cardPreview);
    return createPortal(
        <div className={styles.postСontainer}>
            <div className={styles.post} ref={ref}>
                <div className={styles.headPost}>
                    <KarmaCounter card={card}/>
                    <div className={styles.infoAvtor}>
                        <div className={styles.postTittle}>
                            {card.tittle}
                        </div>
                            <AvtorPublished card={card}/>
                    </div>
                </div>
                <div className={styles.textPost}>
                      Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное, как
                    квинтэссенцию
                    победы маркетинга над разумом и должны быть ассоциативно распределены по отраслям. Прежде всего,
                    начало
                    повседневной работы по формированию позиции однозначно фиксирует необходимость кластеризации усилий.
                    Но
                    сторонники тоталитаризма в науке и по сей день остаются уделом либералов, которые жаждут быть
                    превращены в
                    посмешище, хотя само их существование приносит несомненную пользу обществу.
                </div>
                <img src={card.cardPreview} alt="preview" className={styles.postPreview}/>
                <div className={styles.abbreviated}>
                    Учитывая ключевые сценарии поведения, социально-экономическое развитие играет определяющее значение.
                </div>
                <div className={styles.textPost}>
                      Безусловно, глубокий уровень погружения создаёт необходимость включения в производственный план
                    целого ряда
                    внеочередных мероприятий с учётом комплекса системы массового участия. Внезапно, сделанные на базе
                    интернет-аналитики выводы освещают чрезвычайно интересные особенности картины в целом, однако
                    конкретные выводы,
                    разумеется, описаны максимально подробно.
                </div>
                <CommentFormContainer setComments={setComments} />
                <Comments comments={comments} />
            </div>
        </div>,
        node
    );
}
