import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';

const HOST = "https://secret-shore-94903.herokuapp.com";

function formatCentsToDollars(cents: number): string {
  if (cents < 10) {
    return `$0.0${cents}`;
  }

  let d = (cents / 100) >> 0;
  let c = cents % 100;

  return `$${d}.${c}`;
};

function App() {
  const placeholderProduct = {
    id: 0,
    imageSrc: "/images/loading.svg",
    name: "Loading...",
    priceCents: 0,
  }
  const [products, setProducts] = useState([placeholderProduct]);

  function loadProducts() {
    const request = fetch(
      `${HOST}/api/v1/products.json`,
      {
        headers: {
        },
      }
    );

    request
      .then(response => response.json())
      .then(data => setProducts(data["data"]))
  }

  useEffect(loadProducts, []);

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

function Cart(props) {
  const products = props.products;
  let cartItems = JSON.parse(JSON.stringify(products)).sort(() => 0.5 - Math.random()).slice(0, 7);
  cartItems.forEach((cartItem, index) => cartItem["quantity"] = index + 1);

  return (
    <div className="App-product-catalog">
      {cartItems.map((cartItem) =>
        <div className="App-product" key={cartItem["id"]}>
          <div className="App-product-info">
            <div className="App-product-icon"><img src={`${HOST}${cartItem["imageSrc"]}`} alt="" /></div>
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
              {formatCentsToDollars(cartItems.map(cartItem => cartItem["quantity"] * cartItem["priceCents"]).reduce((a, b) => a + b, 0))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Catalog(props) {
  const products = props.products;

  function addToCart(cartId, productId, quantity) {
    const requestBody = {
      productId: productId,
      quantity: quantity,
    };
    const request = fetch(
      `${HOST}/api/v1/carts/${cartId}/cart_items.json`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    request
      .then(function (response) {
        if (!response.ok) {
          throw Error(`Unsuccessful response: ${response.statusText}`);
        }
        return response.json();
      })
      .then(function (json) {
        console.log(json);
        return json;
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="App-product-catalog">
      {products.map((product) =>
        <div className="App-product" key={product["id"]}>
          <div className="App-product-info">
            <div className="App-product-icon"><img src={`${HOST}${product["imageSrc"]}`} alt="" /></div>
            <div className="App-product-details">
              <h1 className="App-product-name">{product["name"]}</h1>
              {formatCentsToDollars(product["priceCents"])}
            </div>
          </div>
          <div className="App-product-cart">
            <div></div>
            <div>
              <button onClick={addToCart.bind(this, undefined, product["id"], 1)}>Add to cart</button>
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
