import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { formatCentsToDollars, placeholderProduct } from "../utils";
import "../App.css";
import { Product } from '../types';

export const Cart = () => {
    const cartItems: any[]=[];
  return (
    <div className="App-product-catalog">
      {cartItems.length ? cartItems.map((cartItem: any) => (
        <div className="App-product" key={cartItem["id"]}>
          <div className="App-product-info">
            <div className="App-product-icon">
              <img
                src={`${process.env.REACT_APP_HOST}${cartItem["imageSrc"]}`}
                alt=""
              />
            </div>
            <div className="App-product-details">
              <h1 className="App-product-name">{cartItem["name"]}</h1>
              {formatCentsToDollars(cartItem["priceCents"])}
            </div>
          </div>
          <div className="App-product-cart">
            <div>
              <select>
                <option value=""></option>
              </select>
            </div>
            <div>
              {formatCentsToDollars(
                cartItem["quantity"] * cartItem["priceCents"]
              )}
            </div>
          </div>
        </div>
      )):(<div>No items in cart</div>)}
      <hr />
      <div className="App-row">
        <div className="App-righter">
          <div className="App-flex">
            <div className="App-flex-col">Subtotal:</div>
            <div className="App-flex-col">
              {formatCentsToDollars(
                cartItems
                  .map(
                    (cartItem: any) =>
                      cartItem["quantity"] * cartItem["priceCents"]
                  )
                  .reduce((a: any, b: any) => a + b, 0)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
