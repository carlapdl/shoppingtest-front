import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import your Apollo Client instance
import client from './queries/Client';

/*
// Create your Apollo Client instance, pointing to the PHP backend
const client = new ApolloClient({
  uri: 'http://localhost/graphql', 
  cache: new InMemoryCache(),
});

const httpLink = new HttpLink({
  uri: 'http://localhost/graphql', // Your backend GraphQL endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
*/

//createRoot(document.getElementById("root")!).render(<App />);
createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
