// src/components/HelloFromPHP.tsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ECHO_MESSAGE = gql`
  query GetEchoMessage($inputMessage: String!) {
    echo(message: $inputMessage)
  }
`;

export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories
  }
`;
// Define the GraphQL query that matches your PHP schema
/*
const HELLO_QUERY = gql`
  query Hello {
    echo
  }
`;
*/

/*
// Define the TypeScript interface for the data
interface HelloData {
  hello: string;
}
*/
/*
function App(){
  // Fetch 'hello' greeting
  const { loading: helloLoading, error: helloError, data: helloData } = useQuery(GET_HELLO_QUERY);
}
*/

const HelloFromPHP: React.FC = () => {

  // Use the useQuery hook to execute the query
  /*
  const { loading, error, data } = useQuery(GET_ECHO_MESSAGE, {
    variables: { inputMessage: "Hello from Apollo Client!" }
  });
*/
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData, refetch: refetchCategories } = useQuery(GET_CATEGORIES_QUERY);
//const { loading, error, data, refetch: refetchCategories } = useQuery(GET_CATEGORIES_QUERY);

  if (categoriesLoading) return <p>Loading GraphQL data...</p>;
  if (categoriesError) return <p>Error: {categoriesError.message}</p>;

  const categories = categoriesData?.categories;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Vite React Apollo Client</h1>
      <p>Message from GraphQL server:</p>
      {/* Access data via the field name from your query */}
      <p><strong>Item Categories:</strong></p>
      {categories && categories.length > 0 ? (
        <ul>
          {categories.map((category: string, index: number) => (
            <li key={index}>
              {category}
            </li>
          ))}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
  /*
  // Use the useQuery hook to fetch the data
  //const { loading, error, data } = useQuery<HelloData>(GET_HELLO_QUERY);
  const { loading: helloLoading, error: helloError, data: helloData } = useQuery(HELLO_QUERY);

  //console.log(HELLO_QUERY);

  if (helloLoading) return <p className="text-center text-blue-500">Connecting to PHP backend...</p>;
  if (helloError) return <p className="text-center text-red-500">Error: {helloError.message}</p>;

  return (
    <div className="text-center p-8 bg-green-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-green-700">Message from Backend:</h2>
      <p className="mt-4 text-5xl font-bold text-green-900">{helloData?.hello}</p>
    </div>
  );
  */
};

export default HelloFromPHP;