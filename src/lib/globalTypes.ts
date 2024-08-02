import { ReactNode } from 'react';

export type IndexableObject<TValue> = {
  [index: string]: TValue;
};

export type MainColors =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'inherit'
  | undefined;

export type LabelValueType = {
  label?: string;
  value?: any;
  icon?: ReactNode;
};

export type DateType = Date | string | null;
