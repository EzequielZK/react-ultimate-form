export default function setWidthAndHeight(imageWidth: number, imageHeight: number, finalSize: number = 250) {
    let width = 0;
    let height = 0;

    if (imageWidth <= imageHeight && imageWidth > finalSize) {
      width = finalSize;
      const scalePercent = (finalSize * 100) / imageWidth;

      height = (scalePercent * imageHeight) / 100;
    } else if (imageWidth > imageHeight && imageHeight > finalSize) {
      height = finalSize;
      const scalePercent = (finalSize * 100) / imageHeight;
      width = (scalePercent * imageWidth) / 100;
    } else if (imageWidth <= finalSize || imageHeight <= finalSize) {
      width = imageWidth;
      height = imageHeight;
    }

    return { width, height };
  };