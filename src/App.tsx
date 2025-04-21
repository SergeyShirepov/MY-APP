import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Layout } from './shared/Layout';
import { Post } from './shared/CardsList/Card/Post/Post';
import './main.global.css';

export function App() {

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
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