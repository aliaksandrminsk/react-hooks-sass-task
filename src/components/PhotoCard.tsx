import React from "react";
import { getIconSize } from "../lib/getMiniPhotoSize";
import { IProduct } from "../store/productGallery/IProduct";

interface PhotoCardProps {
  formattedName: string;
  item: IProduct;
  onClickPhotoHandler: () => void;
  onClickButtonHandler: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  formattedName,
  item,
  onClickPhotoHandler,
  onClickButtonHandler,
}) => {
  const photoUrl = `/products/${item.category}/${item.file}`;

  let description;
  if (item.name) {
    description = item.name;
  }

  const iconPhotoSize = getIconSize({ w: 900, h: 600 });

  return (
    <div className="products__item photoCard">
      <a className="photoCard__link">
        <span dangerouslySetInnerHTML={{ __html: formattedName }} />
        <div className="photoCard__image" onClick={onClickPhotoHandler}>
          {iconPhotoSize.w > 0 && iconPhotoSize.h > 0 ? (
            <img
              id={photoUrl}
              src={photoUrl}
              width={iconPhotoSize.w}
              height={iconPhotoSize.h}
              alt={description ?? "Photo"}
            />
          ) : null}
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
