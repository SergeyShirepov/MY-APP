import React from 'react';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header/Header';
import { Content } from './shared/Content';
import './main.global.css';
import { CardsList } from './shared/CardsList';
import { GenericList } from './shared/genericlist/genericlist';
import { assignId, generateId, generateRandomString } from '../utils/react/generateRandomIndex';
import { merge } from '../utils/js/merge';


const LIST = [
    {As: 'a' as const, text: 'some'},
    {As: 'a' as const, text: 'other some'},
    {As: 'a' as const, text: 'some'},
].map(generateId)


export function App() {
    const [list, setList] =React.useState(LIST);
    const handleItemClick = (id:string) => {
        setList(list.concat(generateId({text: generateRandomString(), As: 'a' as const })));
    }

    return (

        <Layout>
            <Header />
            <Content>
                <CardsList />
                <ul>
                <GenericList list={LIST.map(merge({ onClick: handleItemClick }))} />
                </ul>
            </Content>assoc.ts
        </Layout>
    );
}

// export const AppComponent = Component () => <AppComponent></AppComponent>