import { useMutation } from "@apollo/client";
import React from "react";
import "../App.css";
import {
  REMOVE_ITEMS_FROM_CART,
  UPDATE_QUANTITIES_IN_CART,
} from "../mutations";
import { formatCentsToDollars } from "../utils";

export const SingleCartItem = ({
  cartId,
  clientMutationId,
  cartItem,
}: {
  cartId: string;
  clientMutationId: string;
  cartItem: any;
}) => {
  const [quantity, setQuantity] = React.useState(cartItem.quantity);
  const [
    removeFromCart,
    {
      data: removeFromCartRes,
      loading: removeFromCartLoading,
      error: removeFromCartError,
    },
  ] = useMutation(REMOVE_ITEMS_FROM_CART);

  const [
    updateCartItemsQuantities,
    { data: updateCartRes, loading: updateCartLoading, error: updateCartError },
  ] = useMutation(UPDATE_QUANTITIES_IN_CART);

  const handleQtyUpdate = (e: any) => {
    updateCartItemsQuantities({
      variables: {
        updateCartItemsQuantitiesInput: {
          clientMutationId,
          cartId,
          cartItems: [{ id: cartItem.id, quantity: parseInt(e.target.value) }],
        },
      },
    });
    setQuantity(e.target.value);
  };
  return (
    <div className="App-product" key={cartItem.product["id"]}>
      <div className="App-product-info">
        <div className="App-product-icon">
          <img
            src={`${process.env.REACT_APP_HOST}${cartItem.product["imageSrc"]}`}
            alt=""
          />
        </div>
        <div className="App-product-details">
          <h1 className="App-product-name">{cartItem.product["name"]}</h1>
          {formatCentsToDollars(cartItem.product["priceCents"])}
        </div>
      </div>
      <div className="App-product-cart">
        <div>
          <select value={quantity} onChange={handleQtyUpdate}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
        <button
          onClick={() => {
            removeFromCart({
              variables: {
                removeItemsFromCartInput: {
                  clientMutationId,
                  cartId,
                  cartItemIds: [cartItem.id],
                },
              },
            });
          }}
        >
          Remove from cart
        </button>
        <div>
          {formatCentsToDollars(
            cartItem["quantity"] * cartItem.product["priceCents"]
          )}
        </div>
      </div>
    </div>
  );
};
