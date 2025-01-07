import React from 'react';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import './main.global.css';
import { CardsList } from './shared/CardsList';
import {useToken} from "./Hooks/useToken";
import { ProvidePlugin } from 'webpack';
import {tokenContext} from './shared/context/tokenContext';
import {UserContextProvider} from './shared/context/userContext';



export function App() {
    const [token] = useToken();

    return (
        <tokenContext.Provider value={token}>
            <UserContextProvider>
                <Layout>
                    <Header  />
                    <Content>
                        <CardsList />
                    </Content>
                </Layout>
            </UserContextProvider>
        </tokenContext.Provider>
    );
}