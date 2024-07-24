import React from 'react';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header/Header';
import { Content } from './shared/Content';
import './main.global.css';

export function App() {
    return (

        <Layout>
            <Header />
            <Content>
                content
            </Content>
        </Layout>
    );
}
