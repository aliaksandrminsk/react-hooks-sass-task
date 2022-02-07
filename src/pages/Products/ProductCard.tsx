import React from "react";
import { openFancyBox } from "../../lib/fancyBox";

interface IProductCardProps {
  formattedName: string;
  photoUrl: string;
  altText: string;
  desc: string;
  onClickButtonHandler: () => void;
  isAdded: boolean;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  formattedName,
  photoUrl,
  altText,
  desc,
  onClickButtonHandler,
  isAdded,
}) => {
  return (
    <article className="productCard">
      <h4
        className="productCard__title"
        dangerouslySetInnerHTML={{ __html: formattedName }}
      />
      <div
        className="productCard__image"
        onClick={() => openFancyBox(photoUrl, desc)}
      >
        <img src={photoUrl} width="300" height="200" alt={altText} />
      </div>
      {isAdded ? (
        <div className="productCard__status">Product is already in cart</div>
      ) : (
        <button
          type="button"
          className="productCard__button"
          onClick={onClickButtonHandler}
        >
          Add to cart
        </button>
      )}
    </article>
  );
};
