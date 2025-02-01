import React from 'react';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import './main.global.css';
import { CardsList } from './shared/CardsList';
import { useToken } from './Hooks/useToken';
import { tokenContext } from './shared/context/tokenContext';
import { store } from './store/store';
import { Provider } from 'react-redux';

// The main App component
export function App() {
  const [token] = useToken();
  
  return (
    <Provider store={store}>
      <tokenContext.Provider value={token}>
        <Layout>
          <Header />
          <Content>
            <CardsList />
          </Content>
        </Layout>
      </tokenContext.Provider>
    </Provider>
  );
}
