type PhotoSize = { w: number; h: number };

export function getIconSize(photoSize: PhotoSize): PhotoSize {
  if (photoSize.w === 600 && photoSize.h === 900) {
    return { w: 200, h: 300 };
  } else if (photoSize.w === 900 && photoSize.h === 600) {
    return { w: 300, h: 200 };
  } else if (photoSize.w === 675 && photoSize.h === 900) {
    return { w: 225, h: 300 };
  } else if (photoSize.w === 900 && photoSize.h === 675) {
    return { w: 300, h: 225 };
  } else if (photoSize.w === 600 && photoSize.h === 800) {
    return { w: 200, h: 267 };
  }
  return { w: 0, h: 0 };
}
