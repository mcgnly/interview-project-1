import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query
    {
      products(first:10) {
	nodes {
        name,
        priceCents,
        imageSrc}
      }
    }
`;

