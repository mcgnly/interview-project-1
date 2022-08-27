import { gql, useMutation, useQuery } from '@apollo/client';
import {
    BrowserRouter as Router, Link, Route, Switch
} from "react-router-dom";
import './App.css';

function formatCentsToDollars(cents: number): string {
  if (cents < 10) {
    return `$0.0${cents}`;
  }

  let d = (cents / 100) >> 0;
  let c = cents % 100;

  return `$${d}.${c}`;
};

const GET_PRODUCTS = gql`
  query
    {
      products(first:10) {
	nodes {
        name,
        priceCents,
        imageSrc}
      }
    }
`;

const CREATE_CART = gql`
  mutation CreateCart($createCartInput:CreateCartInput!){
    createCart(input: $createCartInput){
      cart{
        cartItems{
          product{name, priceCents, imageSrc}
        }
      }
    }
  }
`;
const ADD_ITEMS_TO_CART = gql`
  mutation CreateCart($createCartInput:CreateCartInput!){
    createCart(input: $createCartInput){
      cart{
        cartItems{
          product{name, priceCents, imageSrc}
        }
      }
    }
  }
`;

function App() {
  const placeholderProduct = {
    id: 0,
    imageSrc: "/images/loading.svg",
    name: "Loading...",
    priceCents: 0,
  }

const { loading, error, data } = useQuery(GET_PRODUCTS);

const products = data?.products?.nodes;

if (loading) return (<div className="App-product" key={placeholderProduct["id"]}>
<div className="App-product-info">
  <div className="App-product-icon"><img src={`${process.env.REACT_APP_HOST}${placeholderProduct["imageSrc"]}`} alt="" /></div>
  <div className="App-product-details">
    <h1 className="App-product-name">{placeholderProduct["name"]}</h1>
    {formatCentsToDollars(placeholderProduct["priceCents"])}
  </div>
</div>
<div className="App-product-cart">
  <div></div>
  <div>
    <button disabled>Add to cart</button>
  </div>
</div>
</div>);

if (error) return <p>Error</p>;

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <ul className="App-nav">
            <li><Link to="/">Product catalog</Link></li>
            <li>
              <Link to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="App-nav-cart-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                {" "}
                No items in cart | Total: $0.00
              </Link>
            </li>
          </ul>
        </header>

        <div className="App-main">
          <Switch>
            <Route path="/cart">
              <Cart products={products} />
            </Route>
            <Route exact path="/">
              <Catalog products={products} />
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

function Cart(props:any) {
  const products = props.products;
  let cartItems = JSON.parse(JSON.stringify(products)).sort(() => 0.5 - Math.random()).slice(0, 7);
  cartItems.forEach((cartItem:any, index:number) => cartItem["quantity"] = index + 1);

  return (
    <div className="App-product-catalog">
      {cartItems.map((cartItem:any) =>
        <div className="App-product" key={cartItem["id"]}>
          <div className="App-product-info">
            <div className="App-product-icon"><img src={`${process.env.REACT_APP_HOST}${cartItem["imageSrc"]}`} alt="" /></div>
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
              {formatCentsToDollars(cartItem["quantity"] * cartItem["priceCents"])}
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className="App-row">
        <div className="App-righter">
          <div className="App-flex">
            <div className="App-flex-col">
              Subtotal:
            </div>
            <div className="App-flex-col">
              {formatCentsToDollars(cartItems.map((cartItem:any) => cartItem["quantity"] * cartItem["priceCents"]).reduce((a:any, b:any) => a + b, 0))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Catalog(props:any) {
  const products = props.products;
  const [addToCart, { data:addToCartRes, loading:addToCartLoading, error:addToCartError }] = useMutation(ADD_ITEMS_TO_CART);

  return (
    <div className="App-product-catalog">
      {products.map((product:any) =>
        <div className="App-product" key={product["id"]}>
          <div className="App-product-info">
            <div className="App-product-icon"><img src={`${process.env.REACT_APP_HOST}${product["imageSrc"]}`} alt="" /></div>
            <div className="App-product-details">
              <h1 className="App-product-name">{product["name"]}</h1>
              {formatCentsToDollars(product["priceCents"])}
            </div>
          </div>
          <div className="App-product-cart">
            <div></div>
            <div>
              <button onClick={
                ()=>{
                    console.log('implement Add to Cart here')
              }}>Add to cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
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
