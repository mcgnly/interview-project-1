import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import { Cart } from "./pages/Cart";
import { Catalog } from "./pages/Catalog";
import { CREATE_CART } from "./mutations";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import React from "react";


const clientMutationId = uuidv4();
function App() {
  const [createCart, { data, loading, error }] = useMutation(CREATE_CART);

  React.useEffect(() => {
    createCart({
      variables: { createCartInput: { clientMutationId } },
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  const { createCart: createCartRes } = data;
  const { cart } = createCartRes;
  const { cartItems, id:cartId } = cart;

  const cartItemsCount = cartItems.reduce((acc: number, cartItem: any) => {
    return acc + cartItem.quantity;
  }, 0);
  const totalCost = cartItems.reduce((acc: number, cartItem: any) => {
    return acc + cartItem.quantity * cartItem.product.priceCents;
  }, 0);

  return (
    <Router>
      <div className="App">
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
                {cartItemsCount > 0 ? cartItemsCount : "No"} items in cart |
                Total: ${totalCost}
              </Link>
            </li>
          </ul>
        </header>

        <div className="App-main">
          <Switch>
            <Route path="/cart">
              <Cart cartId={cartId} />
            </Route>
            <Route exact path="/">
              <Catalog cartId={cartId} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
}

export default App;
