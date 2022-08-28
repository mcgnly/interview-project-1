import { useMutation } from "@apollo/client";
import "../App.css";
import { SingleCartItem } from "../components/SingleCartItem";
import { CREATE_ORDER } from "../mutations";
import { Cart as CartType, CartItem } from '../types';
import { formatCentsToDollars, isOrderTooSmall } from "../utils";

export const Cart = ({
  cartId,
  clientMutationId,
  cartData,
  resetClientMutationId
}: {
  cartId: string;
  clientMutationId: string;
  cartData: CartType;
  resetClientMutationId: any;
}) => {
  const [
    createOrder,
  ] = useMutation(CREATE_ORDER);

  const cartItems = cartData? cartData.cartItems:[];
  const totalCents = cartItems
    .map(
      (cartItem: CartItem) => cartItem["quantity"] * cartItem.product["priceCents"]
    )
    .reduce((a: number, b: number) => a + b, 0);

  const handleCreateOrder = () => {
    createOrder({
      variables: {
        createOrderInput: {
          clientMutationId,
          orderAttributes: {
            totalCents,
            cartId,
          },
        },
      },
    }).then((res) => {
        alert(
            `Order for ${formatCentsToDollars(
              totalCents
            )} created! Thank you for shopping at Katie's Super Cool Coffee. `
          );
          resetClientMutationId();
    }).catch((err) => {
        alert(err.message);
    });
  };

  return (
    <div className="App-product-catalog">
      {cartItems && cartItems.length ? (
        cartItems?.map((cartItem: any) => (
          <SingleCartItem
            key={cartItem.id}
            cartItem={cartItem}
            clientMutationId={clientMutationId}
            cartId={cartId}
            tooSmall = {isOrderTooSmall(cartItem.product.name, cartItem.product.priceCents, cartItem.quantity)}
          />
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
              {cartItems && formatCentsToDollars(totalCents)}
            </div>
          </div>
        </div>
      </div>
      <div className="App-row"></div>
      <div className="App-row">
        <div className="App-righter">
          <div className="App-flex">
            <div className="App-flex-col"></div>
            <div className="App-flex-col">
              <button onClick={handleCreateOrder}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
