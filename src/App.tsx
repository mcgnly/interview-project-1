import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Cart } from "./pages/Cart";
import { Catalog } from "./pages/Catalog";
import { CREATE_CART } from "./mutations";
import { GET_CART } from "./queries";
import { useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { NavBar } from './components/NavBar';

function App() {
    const [clientMutationId, setClientMutationId] = React.useState(uuidv4());
  const [createCart, { data, loading, error }] = useMutation(CREATE_CART);
  const { loading:cartLoading, error:cartError, data:cartData } = useQuery(GET_CART, {
    variables: { cartId: data?.createCart?.cart?.id },
  });

  React.useEffect(() => {
    createCart({
      variables: { createCartInput: { clientMutationId } },
    });
  }, [createCart, clientMutationId]);

  if (loading||cartLoading) return <div>Loading...</div>;
  if (error||cartError) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  const { createCart: createCartRes } = data;
  const { cart } = createCartRes;
  const {id:cartId } = cart;
  const returnType = cartData?.cart?.__typename;


  return (
    <Router>
      <div className="App">
       <NavBar cartId={cartId} />
        <div className="App-main">
        {returnType !== "Cart" && <p>{cartData?.cart?.message}</p>}
          <Switch>
            <Route path="/cart">
              <Cart cartId={cartId} clientMutationId={clientMutationId} cartData={cartData?.cart} resetClientMutationId={()=>setClientMutationId(uuidv4())}/>
            </Route>
            <Route exact path="/">
              <Catalog cartId={cartId} clientMutationId={clientMutationId} cartData={cartData?.cart}/>
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
