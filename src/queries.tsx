import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($cursor: String){
    products(first: 10,after: $cursor) {
        pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
        }
        edges {
            cursor
            node {
                id
            }
        }
        nodes {
            name
            priceCents
            imageSrc
            id
        }
    }
  }
`;

export const GET_CART = gql`
  query GetCart($cartId: ID!) {
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
