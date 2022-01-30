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
    <div className="photoCard">
      <div
        className="photoCard__title"
        dangerouslySetInnerHTML={{ __html: formattedName }}
      />
      <div className="photoCard__image" onClick={onClickPhotoHandler}>
        <img src={photoUrl} width="300" height="200" alt={altText} />
      </div>
      {isAdded ? (
        <div className="photoCard__status">Product is already in cart</div>
      ) : (
        <button
          type="button"
          className="photoCard__button"
          onClick={onClickButtonHandler}
        >
          Add to card
        </button>
      )}
    </div>
  );
};
