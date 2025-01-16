import React, { useState } from 'react';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import './main.global.css';
import { CardsList } from './shared/CardsList';
import { useToken } from "./Hooks/useToken";
import { ProvidePlugin } from 'webpack';
import { tokenContext } from './shared/context/tokenContext';
import { UserContextProvider } from './shared/context/useContext';
import { commentContext } from './shared/Content/commentContext';



export function App() {
    const [commentValue, setCommentValue] = useState('');

    const [token] = useToken();
    const { Provider } = tokenContext;

    const CommentProvider = commentContext.Provider;

    return (
        <CommentProvider value={{
            value: commentValue,
            onChange: setCommentValue,
        }}>
            <Provider value={token}>
                <UserContextProvider>
                    <Layout>
                        <Header />
                        <Content>
                            <CardsList />
                        </Content>
                    </Layout>
                </UserContextProvider>
            </Provider>
        </CommentProvider>
    );

}


