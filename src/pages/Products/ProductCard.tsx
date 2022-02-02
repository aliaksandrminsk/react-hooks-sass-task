import React from "react";

interface IProductCardProps {
  formattedName: string;
  photoUrl: string;
  altText: string;
  onClickPhotoHandler: () => void;
  onClickButtonHandler: () => void;
  isAdded: boolean;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  formattedName,
  photoUrl,
  altText,
  onClickPhotoHandler,
  onClickButtonHandler,
  isAdded,
}) => {
  return (
    <div className="productCard">
      <div
        className="productCard__title"
        dangerouslySetInnerHTML={{ __html: formattedName }}
      />
      <div className="productCard__image" onClick={onClickPhotoHandler}>
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
    </div>
  );
};
