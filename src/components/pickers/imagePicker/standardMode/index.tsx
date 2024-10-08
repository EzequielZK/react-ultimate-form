import * as React from 'react';
import Box from '@mui/material/Box';
import { ImageModeProps, ImageValue } from '..';
import setWidthAndHeight from '../../../../lib/utils/getResponsiveImageSize';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

type SetImageFunc = (
  imageUrl: ImageValue,
  img: HTMLImageElement | null
) => void;

export default function ImageStandard({
  setImageUrl,
  setImageObject,
  image,
  finalSize,
  imageObject,
  width = 180,
  height = 180,
  ImageComponent,
}: ImageModeProps) {
  const setImage: SetImageFunc = (image, img) => {
    setImageUrl(image);

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
    let target = event.target as HTMLInputElement;
    let files = target.files as FileList;
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

      setImage(
        { imageUrl: newCanvasUrl, filename: files[0].name, file: files[0] },
        img
      );
    };

    img.src = URL.createObjectURL(files[0]);
  };

  return (
    <Box
      position="relative"
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
      {!image?.imageUrl ? (
        <AddPhotoAlternate />
      ) : (
        <>
          <ImageComponent
            src={image.imageUrl}
            width={imageObject?.width}
            height={imageObject?.height}
          />

          <IconButton
            sx={{ position: 'absolute', top: 0, right: 0, bgcolor: '#fff' }}
            aria-label=""
            size="small"
            onClick={event => {
              event.stopPropagation();
              setImageUrl(null);
              setImageObject(null);
            }}
          >
            <Close color="primary" />
          </IconButton>
        </>
      )}
    </Box>
  );
}
