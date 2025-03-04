import React, { useEffect, useState } from 'react';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import './main.global.css';
import { CardsList } from './shared/CardsList';
import { useToken } from './Hooks/useToken';
import { tokenContext } from './shared/context/tokenContext';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// The main App component
export function App() {
  const [token] = useToken();
  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <Provider store={store}>
      <tokenContext.Provider value={token}>
        <BrowserRouter>
        <Layout>
          <Header onSortChange={setSortBy} />
          <Content>
            <CardsList sortBy={sortBy} />
          </Content>
        </Layout>
        </BrowserRouter>
      </tokenContext.Provider>
    </Provider>
  );
}
