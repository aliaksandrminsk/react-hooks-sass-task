import "@fancyapps/fancybox";

export function openFancyBox(photoUrl: string, desc = "") {
  $.fancybox.open({
    type: "image",
    src: photoUrl,
    opts: {
      caption: desc,
      arrows: false,
      infobar: false,
      buttons: ["close"],
    },
  });
}
