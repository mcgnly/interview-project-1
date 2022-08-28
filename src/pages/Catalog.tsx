import { useMutation, useQuery } from "@apollo/client";
import "../App.css";
import { SingleProduct } from "../components/SingleProduct";
import { ADD_ITEMS_TO_CART } from "../mutations";
import { GET_PRODUCTS } from "../queries";
import { Cart, CartItem, Product } from '../types';
import { formatCentsToDollars, placeholderProduct } from "../utils";

export const Catalog = ({
  cartId,
  clientMutationId,
  cartData
}: {
  cartId: string;
  clientMutationId: string;
  cartData: Cart;
}) => {
  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS);
  const [
    addToCart,
  ] = useMutation(ADD_ITEMS_TO_CART);

  if (loading) return <SingleProduct product={placeholderProduct} />;

  if (error) return <p>{error}</p>;

  const {nodes, pageInfo} = data?.products;
  const findInCart = (productId:number|string)=>{
    const productsInCart = cartData?.cartItems.map((item:CartItem)=>item.product.id);
    return productsInCart.includes(productId);
  }

  const onLoadMore=() =>{
    fetchMore({
      variables: {
        cursor: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.products.edges;
        const newNodes = fetchMoreResult.products.nodes;
        const pageInfo = fetchMoreResult.products.pageInfo;
        return newEdges.length
          ? {
              // Put the new products at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              products: {
                __typename: previousResult.products.__typename,
                edges: [...previousResult.products.edges, ...newEdges],
                nodes: [...previousResult.products.nodes, ...newNodes],
                pageInfo
              }
            }
          : previousResult;
      }
    })}
  return (
    <div className="App-product-catalog">
      {nodes.map((product: Product) => (
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
            <div></div>
            <div>
              <button
              disabled={findInCart(product["id"])}
                onClick={() => {
                  addToCart({
                    variables: {
                      addToCartInput: {
                        clientMutationId,
                        cartId,
                        cartItems: {
                          productId: product["id"],
                          quantity: 1,
                        },
                      },
                    },
                  });
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={onLoadMore}>Load More</button>
    </div>
  );
};
