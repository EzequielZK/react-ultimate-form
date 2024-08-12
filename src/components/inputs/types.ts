import { DateType, LabelValueType } from '../../lib/globalTypes';
import { SvgIconComponent } from '@mui/icons-material';
import { BoxProps, FormControlLabelProps } from '@mui/material';
import { SelectProps } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material/TextField';
import { RadioGroupProps } from '@mui/material/RadioGroup';
import { ReactNode } from 'react';

export type ValueValidationResponse = {
  error: string | null;
};

export type ValidationFunctionType = (value: string) => ValueValidationResponse;

export type InputProps = Omit<TextFieldProps, 'defaultValue' | 'onChange'> & {
  name: string;
  mask?: (value: string) => string;
  validation?: ValidationFunctionType;
  Icon?: ReactNode;
  iconColor?: string;
  containerStyle?: any;
  iconPosition?: 'start' | 'end';
  removeOnUnmount?: boolean;
  defaultValue?: string;
  noIconPadding?: boolean;
  showLabel?: boolean;
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
  extends Omit<FormControlLabelProps, 'defaultValue' | 'control' | 'required'| 'onChange'> {
  name: string;
  onChange: (checked: boolean) => void
  required?: boolean | string;
  variant?: any;
  fontWeight?: any;
  defaultValue?: boolean;
  autoSubmit?: boolean;
  alignItems?: BoxProps["alignItems"];
  justifyContent?: BoxProps["justifyContent"]
}
export type ItemOption = LabelValueType & {
  category?: string;
  Icon?: SvgIconComponent;
};

export interface CustomRadioButtonProps extends RadioGroupProps {
  orientation?: 'row' | 'column';
  disabled?: boolean
  name: string;
  options: RadioButtonProps[];
  alignItems?: BoxProps['alignItems'];
  justifyContent?: BoxProps['justifyContent'];
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
