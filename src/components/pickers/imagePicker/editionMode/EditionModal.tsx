import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import setWidthAndHeight from '../../../../lib/utils/getResponsiveImageSize';

type ImageEditionProps = {
  setImageUrl: (imageUrl: string | null) => void;
  setImageObject: (img: HTMLImageElement | null) => void;
  uploadedImg: HTMLImageElement;
  closeModal: () => void;
};

type Circle = {
  startingAngle: number;
  endAngle: number;
  x: number;
  y: number;
  r: number;

  draw: () => void;
};

export default function EditionModal({
  setImageUrl,
  setImageObject,
  uploadedImg,
  closeModal,
}: ImageEditionProps) {
  const [mounted, setMounted] = useState(false);
  const [img, setImg] = useState(uploadedImg);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    drawImageFlow();
  }, [img]);

  let mouseDown = false;
  let newCanvasUrl: string;

  function drawImageFlow() {
    const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    const c = document.createElement('canvas');
    const cx = c.getContext('2d');
    const { width, height } = setWidthAndHeight(img.width, img.height, 250);

    const portrait = height > width;

    canvas.width = width;
    canvas.height = height;

    const radius = !portrait ? height / 2 : width / 2;

    const Circle = (function(this: Circle, x: number, y: number) {
      this.startingAngle = 0;
      this.endAngle = 2 * Math.PI;
      this.x = x;
      this.y = y;
      this.r = radius;

      this.draw = () => {
        ctx?.beginPath();

        ctx?.arc(this.x, this.y, this.r, this.startingAngle, this.endAngle);

        ctx?.clip();
        ctx?.drawImage(img, 0, 0, width, height);
        ctx?.restore();

        c.width = this.r * 2;
        c.height = this.r * 2;

        cx?.drawImage(
          canvas,
          portrait ? 0 : this.x - this.r,
          portrait ? this.y - this.r : 0,
          this.r * 2,
          this.r * 2,

          0,
          0,
          this.r * 2,
          this.r * 2
        );
        newCanvasUrl = c.toDataURL('image/png');
      };
    } as any) as { new (x: number, y: number): Circle };

    const circle = new Circle(canvas.width / 2, canvas.height / 2);

    function draw() {
      if (ctx) {
        ctx.save();

        ctx.globalAlpha = 0.2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, width, height);
        ctx.globalAlpha = 1;
        circle.draw();
      }
    }

    function move(event: MouseEvent, canvas: HTMLCanvasElement) {
      if (!mouseDown) {
        return;
      }

      if (portrait) {
        const { mouseY } = getMousePos(event, canvas);

        circle.y = mouseY;
        if (circle.y > circle.r && circle.y < height - circle.r) {
          draw();
        }
      } else {
        const { mouseX } = getMousePos(event, canvas);
        circle.x = mouseX;
        if (circle.x > circle.r && circle.x < width - circle.r) {
          draw();
        }
      }
    }

    canvas.onmousemove = event => move(event, canvas);
    canvas.onmousedown = event => setDraggable(event);
    canvas.onmouseup = event => setDraggable(event);

    draw();
  }

  if (mounted) {
    drawImageFlow();
  }
  const setDraggable = (event: MouseEvent) => {
    var type = event.type;

    if (type === 'mousedown') {
      mouseDown = true;
    } else if (type === 'mouseup') {
      mouseDown = false;
    }
  };

  const getMousePos = (event: MouseEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    return {
      mouseX: Math.round(event.x - rect.x),
      mouseY: Math.round(event.y - rect.y),
    };
  };

  const clip = () => {
    const clippedImage = new Image();
    clippedImage.onload = () => {
      setImageUrl(clippedImage.src);
      setImageObject(img);
    };
    clippedImage.src = newCanvasUrl;
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
      setImg(img);
      drawImageFlow();
    };
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    // setFilename(files[0].name);
    img.src = URL.createObjectURL(files[0]);
  };

  return (
    <Stack
      sx={{ width: '100%', height: '100%' }}
      alignItems="center"
      //   justifyContent="space-between"
      direction="column"
      gap={2}
    >
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        bgcolor="background.default"
        width="100%"
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{ bgcolor: 'background.default' }}
        >
          <canvas id="imageCanvas"></canvas>
        </Box>
        <Tooltip title="Deletar imagem">
          <IconButton
            color="primary"
            aria-label="Deletar imagem"
            onClick={() => {
              setImageUrl(null);
              setImageObject(null);
              closeModal();
            }}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>

      <Stack direction="row" alignItems="center" gap={2} sx={{ width: '100%' }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            openBrowser();
          }}
        >
          Alterar imagem
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            clip();
            closeModal();
          }}
        >
          Salvar
        </Button>
      </Stack>
    </Stack>
  );
}
