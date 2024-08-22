import * as React from 'react';
import Box from '@mui/material/Box';
import { ImageModeProps } from '..';
import setWidthAndHeight from '../../../../lib/utils/getResponsiveImageSize';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';

type SetImageFunc = (
  imageUrl: string | null,
  img: HTMLImageElement | null
) => void;

export default function ImageStandard({
  setImageUrl,
  setImageObject,
  imageUrl,
  finalSize,
  imageObject,
  width = 180,
  height = 180,
  ImageComponent,
}: ImageModeProps) {
  const setImage: SetImageFunc = (imageUrl, img) => {
    setImageUrl(imageUrl);

    setImageObject(img);
  };

  const openBrowser = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png';
    input.click();
    input.onchange = event => getImageUrl(event, finalSize);
  };

  const getImageUrl = (event: Event, finalSize?: number) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const canvas = document.createElement('canvas') as HTMLCanvasElement;
      const ctx = canvas?.getContext('2d');
      const { width, height } = setWidthAndHeight(
        img.width,
        img.height,
        finalSize
      );
      img.width = width;
      img.height = height;

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);
      const newCanvasUrl = canvas.toDataURL('image/png');
      setImage(newCanvasUrl, img);
    };
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    img.src = URL.createObjectURL(files[0]);
  };

  return (
    <Box
      width={width}
      height={height}
      bgcolor="background.default"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        openBrowser();
      }}
    >
      {!imageUrl ? (
        <AddPhotoAlternate />
      ) : (
        <ImageComponent
          src={imageUrl}
          width={imageObject?.width}
          height={imageObject?.height}
        />
      )}
    </Box>
  );
}
