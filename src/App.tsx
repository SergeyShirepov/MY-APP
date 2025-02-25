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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Post } from './shared/CardsList/Card/Post';

// The main App component
export function App() {
  const [token] = useToken();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <Provider store={store}>
      <tokenContext.Provider value={token}>
        <BrowserRouter>
        <Layout>
          <Header />
          <Content>
            <CardsList />
            <Routes>
            <Route path="/" element={<></>} />
            <Route path="/posts/:id" element ={
            <Post card={{
              id: '',
              tittle: '',
              cardPreview: '',
              timePublished: '',
              timeViewed: '',
              avtor: '',
              avatar: ''
            }} />
            }>
            </Route>
            </Routes>
          </Content>
        </Layout>
        </BrowserRouter>
      </tokenContext.Provider>
    </Provider>
  );
}
