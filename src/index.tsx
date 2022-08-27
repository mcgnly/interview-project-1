import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_HOST}/graphql`,
});

const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Token ${process.env.REACT_APP_SECRET}`,
      }
    }
  });

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>

<App />

</ApolloProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
