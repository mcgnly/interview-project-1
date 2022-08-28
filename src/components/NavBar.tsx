import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "../App.css";
import { GET_CART } from "../queries";
import { CartItem } from '../types';
import { formatCentsToDollars } from "../utils";

export const NavBar = ({ cartId }: { cartId: string }) => {
  const { loading, error, data } = useQuery(GET_CART, {
    variables: { cartId },
  });

  const returnType = data?.cart?.__typename;
  const cartItems = data?.cart?.cartItems;

  if (loading) return <p>...</p>;

  if (error) return <p>Error: {error.message}</p>;
  if (returnType !== "Cart") return <p>{data?.cart?.message}</p>;

  const cartItemsCount = cartItems?.length
  const totalCost = cartItems?.reduce((acc: number, cartItem:CartItem ) => {
    return acc + cartItem.quantity * cartItem.product.priceCents;
  }, 0);

  return (
    <header className="App-header">
      <ul className="App-nav">
        <li>
          <Link to="/">Product catalog</Link>
        </li>
        <li>
          <Link to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="App-nav-cart-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>{" "}
            {cartItemsCount > 0 ? cartItemsCount : "No"}
            {" "}
            {(cartItemsCount ===1) ?'item ':'items '}
            in cart | Total:
            {formatCentsToDollars(totalCost)}
          </Link>
        </li>
      </ul>
    </header>
  );
};
