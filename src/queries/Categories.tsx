import { gql } from '@apollo/client';

export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id    # Make sure to request the ID
      name  # And the name
    }
  }
`;