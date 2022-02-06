import { Fancybox } from "@fancyapps/ui/dist/fancybox.esm.js";

export function openFancyBox(photoUrl: string, desc = "") {
  const bigSizeImageUrl = photoUrl.replace("_mini", ""); //Every product has 2 sizes of images. This variable is url of big size.

  Fancybox.show(
    [
      {
        src: bigSizeImageUrl,
        type: "image",
      },
    ],
    {
      hideScrollbar: true,
      caption: () => `<div style="font-size: 1.6rem">${desc}</div>`,
      dragToClose: false,
      Toolbar: {
        display: ["close"],
      },
    }
  );
}
