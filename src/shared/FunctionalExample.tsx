import React from 'react';

add(1)(1)


const add = (leftSide: number) => (rightSide: number) => leftSide + rightSide; 

 const addOne = add(leftSide: 1);

 addOne(rightSide: 5)

 /// ---///

 const withidKey = withKey ('id');
 const withIndexKey = withKey();

 function Feed(props: {blocks: IblockProps[]}) {
    return (
        <div>
            { props.blocks.map(withidKey(Block))}
        </div>
    )
 }

 interface IblockProps {
    tittle: string;
    id: string;
 }

 function Block(props: IblockProps) {
    return (
        <div>{props.tittle}</div>
    )
 }

function withKey(key?: string) {
    return <E, T extends React.ComponentType<E>>(component: T) =>
    (props: E, index: number) =>
        React.createElement(
            component,
            {...props, key: key ? props[key as keyof E] : index},
            [],
        );
}

////

function input({onChange, value}: {onChange: (value:string) => void, value: string}) {
    return (
        <input value={value} onChange={getValue(onChange)} />
    )
}

function Checkbox(props: {onChange: (value: boolean) => void, value: boolean}) {
    return (
        <input type="checkbox" checked={props.value} onChange={getChecked(props.onChange)} />
    )
}

function pickFromSyntheticEvent<T extends HTMLElement>() {
    return <K extends keyof T>(key: K) => 
        <E extends (t: T[K]) => void>(fn: E) => 
            (e: React.SyntheticEvent<T>) => 
                fn(e.currentTarget[key]);
}

export const getValue = pickFromSyntheticEvent<HTMLInputElement>()('value');
export const getChecked = pickFromSyntheticEvent<HTMLInputElement>()('checked');

//

function NotStandartLink(props: any) {
    return (
    <a onClick={preventDefault(stopPropagation(props.onClick))}>Hello</a>
    )
}

function preventDefault<T extends (e: any) => void>(fn: T) {
    return <E extends React.SyntheticEvent<any>>(e: E)=>{
        e.preventDefault();
        fn(e);
    }
}

function stopPropagation<T extends (e: any) => void>(fn: T) {
    return <E extends React.SyntheticEvent<any>>(e: E) => {
        e.stopPropagation();
        fn(e);
    }
}

interface InputProps {
    onChange: (value: string) =>void;
    value: string;
}

function Input(props: InputProps) {
return (
    <input value={value} onChange={preventDefault(stopPropagation(getValue(onChange)))} />
)
} 