import { FormInputs } from '../../context/form/types';
import { MainColors } from '../../lib/globalTypes';
import { ReactNode } from 'react';
import { FormButtonProps } from '../buttons/types';

export type ModalParams = {
  width?: number | string;
  height?: number | string;
  title?: ReactNode;
  description?: string;
  variant?: MainColors;
  overflowY?: 'hidden' | 'auto';
  actions?: Array<
    Omit<FormButtonProps, 'id'> & {
      id: number;
      label: string;
    }
  >;
  keepMounted?: boolean;
  noPadding?: boolean;
};

export type FormModalParams = Omit<ModalParams, 'variant'> & {
  onSubmit?: (data: FormInputs) => Promise<void>;
};

export type DeleteConfirmationProps = {
  text: string;
  loading?: boolean;
  onDelete: () => Promise<void>;
};
