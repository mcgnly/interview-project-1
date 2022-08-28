import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Cart } from "./pages/Cart";
import { Catalog } from "./pages/Catalog";
import { CREATE_CART } from "./mutations";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { NavBar } from './components/NavBar';


const clientMutationId = uuidv4();
function App() {
  const [createCart, { data, loading, error }] = useMutation(CREATE_CART);

  React.useEffect(() => {
    createCart({
      variables: { createCartInput: { clientMutationId } },
    });
  }, [createCart]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  const { createCart: createCartRes } = data;
  const { cart } = createCartRes;
  const {id:cartId } = cart;

  return (
    <Router>
      <div className="App">
       <NavBar cartId={cartId} />
        <div className="App-main">
          <Switch>
            <Route path="/cart">
              <Cart cartId={cartId} clientMutationId={clientMutationId}/>
            </Route>
            <Route exact path="/">
              <Catalog cartId={cartId} clientMutationId={clientMutationId} />
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
