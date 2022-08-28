import { gql } from '@apollo/client';

export const CREATE_CART = gql`
  mutation CreateCart($createCartInput:CreateCartInput!){
    createCart(input: $createCartInput){
      cart{
        id
        cartItems{
          product{name, priceCents, imageSrc}
        }
      }
    }
  }
`;


// {
//     "addToCartInput":{
//       "clientMutationId": "12345",
//         "cartId": 96867,
//         "cartItems": {
//           "productId": 13334,
//           "quantity": 1
//             }
//         }
//     }
export const ADD_ITEMS_TO_CART = gql`
  mutation AddToCart($addToCartInput: AddItemsToCartInput!) {
  addItemsToCart(input: $addToCartInput) {
    cart {
      id,
      cartItems {
        product {
          name
          priceCents
          imageSrc
          updatedAt
        }
      }
    }
  }
}
`;
