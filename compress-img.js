let quality = 90;
let compressImgUrl = "";
// 通过canvas 的 quality不断的减小原图片质量，再转为base64返回
function compressImg(file) {
  return new Promise(async (resolve) => {
    const canvas = document.createElement("canvas");
    const img = document.createElement("img");
    const ctx = canvas.getContext("2d");
    img.src = await readerFile(file);
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      doCompress(canvas, img.src, file.type);
      resolve(compressImgUrl);
    };
  });
}

function readerFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
function doCompress(canvas, imgSrc, type) {
  compressImgUrl = canvas.toDataURL(type, quality / 100);
  if (compressImgUrl.length >= imgSrc.length) {
    quality -= 10;
    doCompress(canvas, imgSrc, type);
  }
}

export { compressImg };
