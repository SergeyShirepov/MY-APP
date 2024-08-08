import React from 'react';
import * as styles from './genericlist.css';

interface IItem {
  text: string;
  id: string;
  onClick: (id:string) => void;
  className: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
}


interface IMylistProps {
  list: IItem[];
}
 
const noop = () => {};

export function GenericList({list}: IGenericListProps) {
  return (
<>
{list.map(({As:"a"|... = 'div', text:String, onclick:...= noop, className: String, id: String}) => (
<As
className={className}
onClick={() => onClick(id)}
key={id}
href={href}

>
  {text}
</As>
))}
</>
  );
}