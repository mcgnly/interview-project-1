import React from "react";
import { useQuery } from "@apollo/client";
import { formatCentsToDollars, placeholderProduct } from "../utils";
import "../App.css";
import { GET_CART } from "../queries";
import { SingleProduct } from "../components/SingleProduct";

export const Cart = ({ cartId }: { cartId: string }) => {
  const { loading, error, data } = useQuery(GET_CART, {
    variables: { cartId },
  });
  console.log('data :>> ', data);
  const returnType = data?.cart?.__typename;
  const cartItems = data?.cart?.cartItems;

  if (loading) return <SingleProduct product={placeholderProduct} />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App-product-catalog">
        {returnType!=='Cart' && <p>{data?.cart?.message}</p>}
      {cartItems && cartItems.length ? (
        cartItems?.map((cartItem: any) => (
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
                <select value={cartItem.quantity}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div>
                {formatCentsToDollars(
                  cartItem["quantity"] * cartItem.product["priceCents"]
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h3>No items in cart</h3>
      )}
      <hr />
      <div className="App-row">
        <div className="App-righter">
          <div className="App-flex">
            <div className="App-flex-col">Subtotal:</div>
            <div className="App-flex-col">
              {cartItems && formatCentsToDollars(
                cartItems
                  .map(
                    (cartItem: any) =>
                      cartItem["quantity"] * cartItem.product["priceCents"]
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
