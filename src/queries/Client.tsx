import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// 1. Configure your GraphQL API endpoint
// IMPORTANT: Use the port you successfully mapped in docker-compose.yml (e.g., 82)
const httpLink = createHttpLink({
  uri: 'http://localhost:82/graphql', // <--- MAKE SURE THIS MATCHES YOUR DOCKER PORT
});

// 2. (Optional) Add authentication headers (e.g., JWT token from localStorage)
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('authToken'); // Replace with your actual token storage key
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// 3. Initialize Apollo Client
const client = new ApolloClient({
  // If you need authentication, link authLink before httpLink
  link: authLink.concat(httpLink),
  // Caching mechanism for Apollo Client
  cache: new InMemoryCache(),
});

export default client;