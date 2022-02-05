import React, { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { IProduct } from "../../context/product/interfaces/IProduct";
import is from "is_js";
import { productConstants } from "../../context/product/constants";
import { ProductContext } from "../../context/product/productContext";
import { CartContext } from "../../context/cart/cartContext";
import "@fancyapps/fancybox";

export const ProductTable = () => {
  const { filteredProducts, activePage, nameFilter } =
    useContext(ProductContext);

  const { addCartItem, isAddedProduct } = useContext(CartContext);

  const productsOnPage = filteredProducts.slice(
    activePage * productConstants.SIZE_PRODUCT_PAGE,
    (activePage + 1) * productConstants.SIZE_PRODUCT_PAGE
  );

  const openFancyBox = (currentProduct: IProduct) => {
    const productCollection = new Array<FancyBoxGroupItem>();
    let productIndex = -1;

    productsOnPage.map((product, index) => {
      if (product.file === currentProduct.file) {
        productIndex = index;
      }
      productCollection.push({
        type: "image",
        src: `/products/${product.category}/${product.file}`,
        opts: {
          caption: product.desc,
        },
      });
    });
    if (productIndex >= 0) {
      $.fancybox.open(
        productCollection,
        {
          arrows: false,
          infobar: false,
          buttons: ["close"],
        },
        productIndex
      );
    }
  };

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
              onClickPhotoHandler={() => openFancyBox(product)}
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
) {
  if (is.string(filter) && filter.trim().length > 0) {
    product = product.replace(/\s/g, "&ensp;"); //Change space to special code of space.
    filter = filter.replace(/\s/g, "&ensp;"); //Change space to special code of space.
    const reg = new RegExp(filter, "gi"); //set red color for filtered data
    product = product.replace(
      reg,
      "<span class='products__item-filter'>$&</span>"
    );
  }

  let priceText = "";
  if (price >= 0) {
    priceText = ` (${price}&nbsp;USD)`;
  }

  return `<span className="products__item-text">${product}${priceText}</span>`;
}
