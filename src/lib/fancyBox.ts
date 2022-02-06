import "@fancyapps/fancybox";
import("default-passive-events");

export function openFancyBox(photoUrl: string, desc = "") {
  const bigSizeImageUrl = photoUrl.replace("_mini", ""); //Every product has 2 sizes of images. This variable is url of big size.
  $.fancybox.open({
    type: "image",
    src: bigSizeImageUrl,
    opts: {
      caption: desc,
      arrows: false,
      infobar: false,
      buttons: ["close"],
      hideScrollbar: true,
      protect: true,
      wheel: false,
      touch: false,
    },
  });
}
