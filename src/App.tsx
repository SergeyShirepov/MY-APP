import React, { useEffect, useState } from 'react';
import { Layout } from './shared/Layout';
import './main.global.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Post } from './shared/CardsList/Card/Post/Post';

export function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/account" element={<></>} />
          <Route path="/account/viewed" element={<></>} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
        <Layout>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}