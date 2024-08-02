import type { DateType, LabelValueType } from '../../lib/globalTypes';
import type { MaskTypes } from '../../lib/masks/types';
import type { ValidationTypes } from '../../lib/validations/types';
import { SvgIconComponent } from '@mui/icons-material';
import type { FormControlLabelProps } from '@mui/material';
import type { SelectProps } from '@mui/material/Select';
import type { TextFieldProps } from '@mui/material/TextField';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { ReactNode } from 'react';

export type InputProps = Omit<TextFieldProps, 'defaultValue' | 'onChange'> & {
  name: string;
  mask?: MaskTypes;
  validation?: ValidationTypes;
  Icon?: ReactNode;
  iconColor?: string;
  containerStyle?: any;
  iconPosition?: 'start' | 'end';
  removeOnUnmount?: boolean;
  defaultValue?: string;
  noIconPadding?: boolean;
  showLabel?: boolean;
  maskFunction?: (value: any) => string;
  call?: (
    value: any,
    setAnotherFieldValue: (name: string, value: any) => void
  ) => void;
  onChange?: (value: string) => void;
  isEqualTo?: { field: string; errorMessage: string };
  maxLength?: number;
  loading?: boolean;
  submitOnEnter?: boolean;
};

export type InputDateProps = {
  fullWidth?: boolean;
  label: string;
  name: string;
  defaultValue?: DateType;
  required?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  helperText?: string;
  submitOnEnter?: boolean;
  maxDate?: Date;
  minDate?: Date;
  defaultCalendar?: Date;
  onChange?: (newDate: Date | null) => void;
};

export type CustomSelectProps = Omit<SelectProps, 'onChange'> & {
  options: LabelValueType[];
  name: string;
  defaultValue?: any;
  helperText?: string;
  removeOnUnmount?: boolean;
  submitOnSelect?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onChange?: (value: any, obj?: LabelValueType) => void;
};

export interface CustomCheckboxProps
  extends Omit<FormControlLabelProps, 'defaultValue' | 'control' | 'required'> {
  name: string;
  required?: boolean | string;
  variant?: any;
  fontWeight?: any;
  defaultValue?: boolean;
  autoSubmit?: boolean;
}
export type ItemOption = LabelValueType & {
  category?: string;
  Icon?: SvgIconComponent;
};

export interface CustomRadioButtonProps extends RadioGroupProps {
  orientation?: 'row' | 'column';
  name: string;
  options: RadioButtonProps[];
}

export interface RadioButtonProps
  extends Omit<FormControlLabelProps, 'control'> {
  value: string | number;
  label: ReactNode;
}

export interface CustomAutocompleteProps {
  options: ItemOption[];
  disableCloseOnSelect?: boolean;
  disableClearable?: false | undefined;
  label?: string;
  placeholder?: string;
  name: string;
  defaultValue?: null | ItemOption[] | ItemOption;
  required?: boolean;
  loading?: boolean;
  sx?: any;
  autoSubmit?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  call?: (
    value: any,
    setAnotherFieldValue: (name: string, value: any) => void
  ) => void;
}

export interface MultipleAutocompleteProps {
  multiple?: boolean;
  loading?: boolean;
  onOpen?: () => void;
  options: ItemOption[];
  disableCloseOnSelect?: boolean;
  disableClearable?: boolean;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  name: string;
  defaultValue?: null | ItemOption[];
  required?: boolean;
  sx?: any;
  autoSubmit?: boolean;
  limit?: number;
  getOptions?: () => Promise<ItemOption[]>;
  onChange?: (event: any, newValue: ItemOption | ItemOption[] | null) => void;
}
