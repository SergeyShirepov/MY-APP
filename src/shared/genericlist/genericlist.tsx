import React from 'react';
import * as styles from './genericlist';

interface IItem {
  text: string;
  id: string;
  onClick: (id:string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
}


interface IGenericListProps {
  list: IItem[];
}
 
const noop = () => {};

export function GenericList({list}: IGenericListProps) {
  return (
<>
{list.map(({As='div', text, onClick= noop, className, id, href}) => (
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