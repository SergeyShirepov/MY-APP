import React, { useEffect, useState } from 'react';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import './main.global.css';
import { CardsList } from './shared/CardsList';
// import { useToken } from './Hooks/useToken';
// import { GenericList } from './shared/genericlist/genericlist';
// import { assignId, generateId, generateRandomString } from '../utils/react/generateRandomIndex';
// import { merge } from '../utils/js/merge';


// const LIST = [
//     {As: 'a' as const, text: 'some'},
//     {As: 'a' as const, text: 'other some'},
//     {As: 'a' as const, text: 'some'},
// ].map(generateId)

interface AppProps {
    token?: string;
  }

export function App({ token: initialToken }: AppProps) {
//     const url = new URL(window.location.href);
// console.log(url);

    // const [list, setList] =React.useState(LIST);

    // const handleItemClick = (id:string) => {
    //     setList(list.concat(generateId({text: generateRandomString(), As: 'a' as const })));
    // }
    //////
    const [token, setToken] = useState<string | undefined>(initialToken);

    useEffect(() => {
        if (!initialToken) {
          const tokenFromWindow = (window as any).__token__;
          if (tokenFromWindow) {
            setToken(tokenFromWindow);
          }
        }
      }, [initialToken]);

    return (

        <Layout>
             {token ? <Header token={token} /> : <Header />}
            <Content>
                <CardsList />
                <div style={{ padding: 20 }}>
                    <br />

                </div>
                {/* <ul>
                <GenericList list={LIST.map(merge({ onClick: handleItemClick }))} />
                </ul> */}
            </Content>
        </Layout>
    );
}

// export const AppComponent = Component () => <AppComponent></AppComponent>