import React, { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { IProduct } from "../../context/product/interfaces/IProduct";
import is from "is_js";
import { productConstants } from "../../context/product/constants";
import { ProductContext } from "../../context/product/productContext";
import { CartContext } from "../../context/cart/cartContext";

export const ProductTable = () => {
  const { filteredProducts, activePage, nameFilter } =
    useContext(ProductContext);

  const { addCartItem, isAddedProduct } = useContext(CartContext);

  const productsOnPage = filteredProducts.slice(
    activePage * productConstants.SIZE_PRODUCT_PAGE,
    (activePage + 1) * productConstants.SIZE_PRODUCT_PAGE
  );

  return (
    <div className="products__items">
      {productsOnPage.map((product: IProduct) => {
        const formattedName = getFormattedProductName(
          product.name,
          nameFilter,
          product.price
        );

        return (
          <div className="products__item" key={product.id}>
            <ProductCard
              formattedName={formattedName}
              photoUrl={`/products/${product.category}/${product.file}`}
              altText={product.name ?? "Photo"}
              desc={product.desc}
              onClickButtonHandler={() => addCartItem(product)}
              isAdded={isAddedProduct(product.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

function getFormattedProductName(
  product: string,
  filter: string,
  price: number
): string {
  if (is.string(filter) && filter.length > 0) {
    filter = filter.replace(/[^A-Za-z0-9]/g, "\\$&");
    const reg = new RegExp(filter, "gi");
    product = product.replace(
      reg,
      "<span class='productCard__title-filter'>$&</span>"
    );
  }

  let priceText = "";
  if (price >= 0) {
    priceText = ` (${price}&nbsp;USD)`;
  }

  return `${product}${priceText}`;
}
