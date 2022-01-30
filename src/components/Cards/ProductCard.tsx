import React from "react";

interface IProductCardProps {
  formattedName: string;
  photoUrl: string;
  altText: string;
  onClickPhotoHandler: () => void;
  onClickButtonHandler: () => void;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  formattedName,
  photoUrl,
  altText,
  onClickPhotoHandler,
  onClickButtonHandler,
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
      <button
        type="button"
        style={{ width: "100px" }}
        onClick={onClickButtonHandler}
      >
        Add to card
      </button>
    </div>
  );
};