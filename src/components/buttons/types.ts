import { ButtonProps } from '@mui/material/Button';

export interface FormButtonProps extends Omit<ButtonProps, 'type'> {
  loading?: boolean;
  icon?: boolean;
  type?: 'submit' | 'clear' | 'submitAll';
}
