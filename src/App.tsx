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

import { Provider } from 'react-redux';
// store.js
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // Мои редьюсеры здесь
  },
});

export default store;

export function App() {
    const [commentValue, setCommentValue] = useState('');

    const [token] = useToken();

    const TokenProvider = tokenContext.Provider;
    const CommentProvider = commentContext.Provider;

    return (
        <Provider store={store}>
        <CommentProvider value={{
            value: commentValue,
            onChange: setCommentValue,
        }}>
            <TokenProvider value={token}>
                <UserContextProvider>
                    <Layout>
                        <Header />
                        <Content>
                            <CardsList />
                        </Content>
                    </Layout>
                </UserContextProvider>
            </TokenProvider>
        </CommentProvider>
        </Provider>
    );

}


