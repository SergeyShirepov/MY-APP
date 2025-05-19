import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from './shared/Layout';
import { Post } from './shared/CardsList/Card/Post/Post';
import './main.global.css';
import { store } from './store';

export function App() {

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  console.log('Рендер App');
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/account" element={<></>} />
          <Route path="/account/viewed" element={<></>} />
          <Route path="/account/saved" element={<></>} />
          <Route path="account/my" element={<></>} />
          <Route path="account/comented" element={<></>} />
          <Route path="/posts" element={<></>} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
        <Layout>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}