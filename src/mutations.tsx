import { gql } from '@apollo/client';

export const CREATE_CART = gql`
  mutation CreateCart($createCartInput:CreateCartInput!){
    createCart(input: $createCartInput){
      cart{
        cartItems{
          product{name, priceCents, imageSrc}
        }
      }
    }
  }
`;

export const ADD_ITEMS_TO_CART = gql`
  mutation AddItemToCart($addItemToCartInput:AddItemToCartInput!){
    addItemToCart(input: $addItemToCartInput){
      cart{
        cartItems{
          product{name, priceCents, imageSrc}
        }
      }
    }
  }
`;
