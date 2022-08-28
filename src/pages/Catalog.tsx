import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries";
import { ADD_ITEMS_TO_CART } from "../mutations";
import { formatCentsToDollars, placeholderProduct } from "../utils";
import "../App.css";
import { SingleProduct } from "../components/SingleProduct";

export const Catalog = ({
  cartId,
  clientMutationId,
}: {
  cartId: string;
  clientMutationId: string;
}) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const products = data?.products?.nodes;
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_ITEMS_TO_CART);

  if (loading) return <SingleProduct product={placeholderProduct} />;

  if (error) return <p>Error</p>;

  return (
    <div className="App-product-catalog">
      {products.map((product: any) => (
        <div className="App-product" key={product["id"]}>
          <div className="App-product-info">
            <div className="App-product-icon">
              <img
                src={`${process.env.REACT_APP_HOST}${product["imageSrc"]}`}
                alt=""
              />
            </div>
            <div className="App-product-details">
              <h1 className="App-product-name">{product["name"]}</h1>
              {formatCentsToDollars(product["priceCents"])}
            </div>
          </div>
          <div className="App-product-cart">
            <div></div>
            <div>
              <button
                disabled={addToCartLoading}
                onClick={() => {
                  addToCart({
                    variables: {
                      addToCartInput: {
                        clientMutationId,
                        cartId,
                        cartItems: {
                          productId: product["id"],
                          quantity: 1,
                        },
                      },
                    },
                  });
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
