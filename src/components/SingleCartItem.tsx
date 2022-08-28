import { useMutation } from "@apollo/client";
import React from "react";
import "../App.css";
import {
    REMOVE_ITEMS_FROM_CART,
    UPDATE_QUANTITIES_IN_CART
} from "../mutations";
import { CartItem } from '../types';
import { formatCentsToDollars, findMinOrderCentsValue, findMaxItems, findBatchSize } from "../utils";

export const SingleCartItem = ({
  cartId,
  clientMutationId,
  cartItem,
  tooSmall
}: {
  cartId: string;
  clientMutationId: string;
  cartItem: CartItem;
  tooSmall: boolean;
}) => {
  const [quantity, setQuantity] = React.useState(cartItem.quantity);
  const [removeFromCart] = useMutation(REMOVE_ITEMS_FROM_CART);
  const [updateCartItemsQuantities] = useMutation(UPDATE_QUANTITIES_IN_CART);

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

  const DropdownOptions=()=>{
    const batchSize = findBatchSize((cartItem.product["name"]))
    const options = [];
    for (let i = batchSize; i <= findMaxItems(cartItem.product["name"]); i=i+batchSize) {
        options.push(<option key={`${cartItem.product["name"]}-${i}`} value={i}>{i}</option>)
    }
    return <>
    {options}
    </>
  }

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
          {tooSmall&&<h1 className="App-product-warning">Please Increase your order to meet the minimum value of {formatCentsToDollars(findMinOrderCentsValue(cartItem.product["name"]))}</h1>}
          <h1 className="App-product-name">{cartItem.product["name"]}</h1>
          {formatCentsToDollars(cartItem.product["priceCents"])}
        </div>
      </div>
      <div className="App-product-cart">
      <div className="App-row">
          <div className="App-flex">
          <div className="App-flex-col">
        <div>
          <select value={quantity} onChange={handleQtyUpdate}>
            <DropdownOptions />
          </select>
        </div>

            <span
                className="App-product-remove"
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
          Remove
        </span>
        </div>
        </div>
        </div>
        <div>
          {formatCentsToDollars(
            cartItem["quantity"] * cartItem.product["priceCents"]
          )}

      </div>
      </div>
    </div>
  );
};
