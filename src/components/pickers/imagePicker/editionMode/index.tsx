import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import EditionModal from './EditionModal';
import { ImageModeProps } from '..';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

export default function ImageEdition({
  setImageUrl,
  setImageObject,
  imageUrl,
  imageObject,
  ImageComponent,
}: ImageModeProps) {
  const [openModal, setOpenModal] = React.useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenModal(false);
  };

  const close = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };

  const openBrowser = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png';
    input.click();
    input.onchange = getImageUrl;
  };

  const getImageUrl = (event: Event) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      setImageObject(img);
      setOpenModal(true);
    };
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    img.src = URL.createObjectURL(files[0]);
  };

  return (
    <>
      <Box
        width={120}
        height={120}
        bgcolor="background.paper"
        borderRadius="50%"
        //   p={imageUrl ? 0 : 2}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        onClick={() => {
          if (imageObject) {
            setOpenModal(true);
          } else {
            openBrowser();
          }
        }}
      >
        {!imageUrl ? (
          <Avatar sx={{ width: '100%', height: '100%' }} />
        ) : (
          <ImageComponent src={imageUrl} width={200} height={200} />
        )}
      </Box>
      <Dialog
        open={openModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: 700, maxWidth: '100%' } }}
      >
        <DialogTitle
          id="dialog-title"
          sx={{
            bgcolor: `primary.main`,
            color: `primary.contrastText`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          Edite sua Imagem
          <IconButton onClick={close}>
            <Close sx={{ color: 'primary.contrastText' }} />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {imageObject && (
            <EditionModal
              setImageUrl={setImageUrl}
              setImageObject={setImageObject}
              uploadedImg={imageObject}
              closeModal={close}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
