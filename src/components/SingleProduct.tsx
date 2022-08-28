import "../App.css";
import { Product } from "../types";
import { formatCentsToDollars } from "../utils";

export const SingleProduct = ({
  product,
  handleAddToCart,
  alreadyInCart,
}: {
  product: Product;
  handleAddToCart?: any;
  alreadyInCart?: boolean;
}) => {
  return (
    <div className="App-product" key={product["id"]}>
      <div className="App-product-info">
        <div className="App-product-icon">
          <img
            src={`${process.env.REACT_APP_HOST}${product["imageSrc"]}`}
            alt=""
          />
        </div>
        <div className="App-product-details">
          <h1 className="App-product-name">{product["name"]}</h1>
          {formatCentsToDollars(product["priceCents"])}
        </div>
      </div>
      <div className="App-product-cart">
        <div>
          <button disabled={alreadyInCart} onClick={handleAddToCart} className="Add-to-cart-btn">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
