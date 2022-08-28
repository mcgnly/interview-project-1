import { gql } from "@apollo/client";

export const CREATE_CART = gql`
  mutation CreateCart($createCartInput: CreateCartInput!) {
    createCart(input: $createCartInput) {
      cart {
        id
        cartItems {
          product {
            name
            priceCents
            imageSrc
          }
        }
      }
    }
  }
`;

export const ADD_ITEMS_TO_CART = gql`
  mutation AddToCart($addToCartInput: AddItemsToCartInput!) {
    addItemsToCart(input: $addToCartInput) {
      cart {
        id
        cartItems {
          quantity
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

export const REMOVE_ITEMS_FROM_CART = gql`
  mutation RemoveItemsFromCart(
    $removeItemsFromCartInput: RemoveItemsFromCartInput!
  ) {
    removeItemsFromCart(input: $removeItemsFromCartInput) {
      cart {
        id
        cartItems {
          quantity
          product {
            name
            priceCents
            imageSrc
          }
        }
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $createOrderInput: CreateOrderInput!
  ) {
    createOrder(input: $createOrderInput) {
      errors {
        message
      }
        order {
            createdAt
            id
            totalCents
            orderLines {
                name
                quantity
                imageSrc
                id
                priceCents
            }
        }
    }
  }
`;

export const UPDATE_QUANTITIES_IN_CART = gql`
  mutation UpdateCartItemsQuantities(
    $updateCartItemsQuantitiesInput: UpdateCartItemsQuantitiesInput!
  ) {
    updateCartItemsQuantities(input: $updateCartItemsQuantitiesInput) {
      errors {
        message
      }
      cart {
        id
        cartItems {
          quantity
          product {
            name
            priceCents
            imageSrc
          }
        }
      }
    }
  }
`;
