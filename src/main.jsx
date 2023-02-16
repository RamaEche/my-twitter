import React from 'react';
import * as ReactDOM from "react-dom/client";
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.css';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
          <ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
    </BrowserRouter>
)