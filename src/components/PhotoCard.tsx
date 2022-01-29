import React from "react";
import { getIconSize } from "../lib/getMiniPhotoSize";

interface PhotoCardProps {
  formattedName: string;
  item: {
    file: string;
    shortDesc?: string;
    width: number;
    height: number;
  };
  onClickPhotoHandler: () => void;
  onClickButtonHandler: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  formattedName,
  item,
  onClickPhotoHandler,
  onClickButtonHandler,
}) => {
  const photoUrl = `/images/${item.file}`;

  let description;
  if (item.shortDesc) {
    description = item.shortDesc;
  }

  const iconPhotoSize = getIconSize({ w: item.width, h: item.height });

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
