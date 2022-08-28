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

export const GET_CART = gql`
query getCart($cartId:ID!){
  cart(id: $cartId) {
    __typename
    ... on Cart {
      id
      cartItems {
        id
        quantity
        product {
          name
          priceCents
          imageSrc
          id
        }
      }
    }
    ... on NotFoundError {
      message
    }
  }
}
`;