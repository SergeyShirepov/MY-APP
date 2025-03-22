import React from 'react';
import { Layout } from './shared/Layout';
import './main.global.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}