import * as React from 'react';
import { useEffect, useState } from 'react';
import ImageEdition from './editionMode';
import ImageStandard from './standardMode';
import useFormGroupHandler from '../../../hooks/useFormGroupHandler';

type ImagePickerProps = {
  mode?: 'edition' | 'standard';
  finalSize?: number;
  width?: number | string;
  height?: number | string;
  defaultValue?: string | null;
  name: string;
  required?: boolean;
  ImageComponent: ImageComponent;
};

type ImageComponent = ({
  src,
  width,
  height,
}: {
  src: string;
  width?: number;
  height?: number;
}) => JSX.Element;

export type ImageValue = {
  imageUrl: string;
  filename?: string | null;
  file?: File | null;
} | null;

export type ImageModeProps = {
  setImageUrl: (image: ImageValue) => void;
  setImageObject: (img: HTMLImageElement | null) => void;
  ImageComponent: ImageComponent;
  imageUrl: string | null;
  imageObject: HTMLImageElement | null;
  finalSize?: number;
  width?: number | string;
  height?: number | string;
};

export default function ImagePicker({
  mode = 'standard',
  finalSize = 250,
  width,
  height,
  defaultValue,
  name,
  required,
  ImageComponent,
}: ImagePickerProps) {
  const { setValue, data } = useFormGroupHandler({
    name,
    required,
    defaultValue,
  });

  const { value } = data;

  const [imageObject, setImageObject] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (defaultValue !== value) {
      setValue(defaultValue as string);
    }
  }, [defaultValue]);

  const modes = {
    edition: ImageEdition,
    standard: ImageStandard,
  };

  const SelectedMode = modes[mode];

  return (
    <SelectedMode
      imageObject={imageObject}
      setImageObject={setImageObject}
      imageUrl={value}
      setImageUrl={setValue}
      finalSize={finalSize}
      ImageComponent={ImageComponent}
      width={width}
      height={height}
    />
  );
}
