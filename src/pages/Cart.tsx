import { useMutation } from "@apollo/client";
import "../App.css";
import { SingleCartItem } from "../components/SingleCartItem";
import { CREATE_ORDER } from "../mutations";
import { formatCentsToDollars } from "../utils";

export const Cart = ({
  cartId,
  clientMutationId,
  cartData,
  resetClientMutationId
}: {
  cartId: string;
  clientMutationId: string;
  cartData: any;
  resetClientMutationId: any;
}) => {
  const [
    createOrder,
    {
      data: createOrderRes,
      error: createOrderError,
    },
  ] = useMutation(CREATE_ORDER);

  const cartItems = cartData? cartData.cart?.cartItems:[];
  const totalCents = cartItems
    .map(
      (cartItem: any) => cartItem["quantity"] * cartItem.product["priceCents"]
    )
    .reduce((a: any, b: any) => a + b, 0);

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
    });

    if (createOrderRes) {
        alert(
          `Order for ${formatCentsToDollars(
            totalCents
          )} created! Thank you for shopping at Katie's Super Cool Coffee. `
        );
        resetClientMutationId();
    }
    if (createOrderError) {
      alert(createOrderError.message);
    }
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
