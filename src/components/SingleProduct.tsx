import React from 'react';
import { formatCentsToDollars } from '../utils';
import '../App.css';
import { Product } from '../types';

export const SingleProduct=({product}:{product:Product})=> (
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
    <button disabled>Add to cart</button>
  </div>
</div>
</div>
)