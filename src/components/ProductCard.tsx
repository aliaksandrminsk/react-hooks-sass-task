import React from "react";
import { IProduct } from "../store/productGallery/IProduct";

interface ProductCardProps {
  formattedName: string;
  product: IProduct;
  onClickPhotoHandler: () => void;
  onClickButtonHandler: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  formattedName,
  product,
  onClickPhotoHandler,
  onClickButtonHandler,
}) => {
  const photoUrl = `/products/${product.category}/${product.file}`;

  let description;
  if (product.name) {
    description = product.name;
  }

  return (
    <div className="products__item photoCard">
      <a className="photoCard__link">
        <span dangerouslySetInnerHTML={{ __html: formattedName }} />
        <div className="photoCard__image" onClick={onClickPhotoHandler}>
          <img
            id={product.id}
            src={photoUrl}
            width="300"
            height="200"
            alt={description ?? "Photo"}
          />
        </div>
        <button
          type="button"
          style={{ width: "100px" }}
          onClick={onClickButtonHandler}
        >
          Add to card
        </button>
      </a>
    </div>
  );
};
