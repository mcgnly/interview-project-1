import { useQuery } from "@apollo/client";
import "../App.css";
import { SingleCartItem } from "../components/SingleCartItem";
import { SingleProduct } from "../components/SingleProduct";
import { GET_CART } from "../queries";
import { formatCentsToDollars, placeholderProduct } from "../utils";

export const Cart = ({cartId, clientMutationId}:{cartId:string, clientMutationId:string}) => {
  const { loading, error, data } = useQuery(GET_CART, {
    variables: { cartId },
  });
  const returnType = data?.cart?.__typename;
  const cartItems = data?.cart?.cartItems;

  if (loading) return <SingleProduct product={placeholderProduct} />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App-product-catalog">
        {returnType!=='Cart' && <p>{data?.cart?.message}</p>}
      {cartItems && cartItems.length ? (
        cartItems?.map((cartItem: any) => (
            <SingleCartItem key={cartItem.id} cartItem={cartItem} clientMutationId={clientMutationId} cartId={cartId} />))
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
