import React from "react";
import { PhotoCard } from "../../components/PhotoCard";
import { IProduct } from "../../store/productGallery/IProduct";
import is from "is_js";
import { productGalleryConstants } from "../../store/productGallery/constants";

export const PhotoViewerContainer: React.FC<{
  filteredProducts: Array<IProduct>;
  filter: string;
  activePage: number;
}> = (props) => {
  const openFancyBox = (currentProduct: IProduct) => {
    const productCollection = new Array<FancyBoxGroupItem>();
    let productIndex = -1;

    props.filteredProducts.map((product, index) => {
      if (product.file === currentProduct.file) {
        productIndex = index;
      }
      productCollection.push({
        type: "image",
        src: `/images/${product.file}`,
        opts: {
          caption: product.desc,
        },
      });
    });
    if (productIndex >= 0) {
      window.$.fancybox.open(
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

  const productsOnPage = props.filteredProducts.slice(
    props.activePage * productGalleryConstants.SIZE_PRODUCT_PAGE,
    (props.activePage + 1) * productGalleryConstants.SIZE_PRODUCT_PAGE
  );

  return (
    <>
      {productsOnPage.map((product: IProduct) => {
        const formattedName = getFormattedProductName(
          product.shortDesc,
          props.filter,
          2
        );

        return (
          <PhotoCard
            onClickPhotoHandler={() => openFancyBox(product)}
            onClickButtonHandler={() => console.log("Add to card")}
            key={product.file}
            item={product}
            formattedName={formattedName}
          />
        );
      })}
    </>
  );
};

function getFormattedProductName(
  productName: string,
  filter: string = "",
  price: number = 0
) {
  if (is.string(filter) && filter.trim().length > 0) {
    productName = productName.replace(/\s/g, "&ensp;"); //Change space to special code of space.
    filter = filter.replace(/\s/g, "&ensp;"); //Change space to special code of space.
    const reg = new RegExp(filter, "gi"); //set red color for filtered data
    productName = productName.replace(
      reg,
      "<span class='products__item-filter'>$&</span>"
    );
  }

  productName =
    "<span class='products__item-text'>" +
    productName +
    " (" +
    price +
    "&nbsp;USD)</span>";

  return productName;
}
