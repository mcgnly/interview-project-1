import { useMutation, useQuery } from "@apollo/client";
import "../App.css";
import { SingleProduct } from "../components/SingleProduct";
import { ADD_ITEMS_TO_CART } from "../mutations";
import { GET_PRODUCTS } from "../queries";
import { Cart, CartItem, Product } from "../types";
import {
  isImpossibleToOrder,
  placeholderProduct,
  findBatchSize,
} from "../utils";

export const Catalog = ({
  cartId,
  clientMutationId,
  cartData,
}: {
  cartId: string;
  clientMutationId: string;
  cartData: Cart;
}) => {
  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS);
  const [addToCart] = useMutation(ADD_ITEMS_TO_CART);

  if (loading) return <SingleProduct product={placeholderProduct} />;
  if (error) return <p>{error}</p>;

  const { nodes, pageInfo } = data?.products;

  const findInCart = (productId: number | string) => {
    const productsInCart = cartData?.cartItems.map(
      (item: CartItem) => item.product.id
    );
    return productsInCart.includes(productId);
  };

  const onLoadMore = () => {
    fetchMore({
      variables: {
        cursor: pageInfo.endCursor,
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
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

//   for sure not the most elegant way to load everything!
  if (pageInfo.hasNextPage) {
    onLoadMore();
  }

  return (
    <div className="App-product-catalog">
      {nodes.map((product: Product) => (
        <>
          {isImpossibleToOrder(
            product["name"],
            product["priceCents"]
          ) ? null : (
            <SingleProduct
              key={product.id}
              product={product}
              alreadyInCart={findInCart(product["id"])}
              handleAddToCart={() =>
                addToCart({
                  variables: {
                    addToCartInput: {
                      clientMutationId,
                      cartId,
                      cartItems: {
                        productId: product["id"],
                        quantity: findBatchSize(product["name"]),
                      },
                    },
                  },
                })
              }
            />
          )}
        </>
      ))}
    </div>
  );
};
