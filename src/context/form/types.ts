import { ReactNode } from 'react';

export type Forms = {
  [index: string]: FormInputs;
};

export type FormInputs = {
  [index: string]: FormData;
};

export type FormData = {
  value?: any;
  defaultValue?: any;
  errorMessage?: string | null;
  loading?: boolean;
  required?: boolean | string;
  label?: string;
  disabled?: boolean;
};

export type InitialFormParams = {
  groupName: string;
  name: string;
  required?: boolean | string;
  loading?: boolean;
  label?: string;
  defaultValue?: any;
  disabled?: boolean;
};

export type FormProps = {
  onSubmit?: (forms: any) => void;
  children: ReactNode;
};

export type FormHandlerProvider = {
  getInitialForms: (params: InitialFormParams) => void;
  setValue: (groupName: string, name: string, value: any) => void;
  setDisabled: (groupName: string, name: string, disabled: boolean) => void;
  setError: (
    groupName: string,
    name: string,
    errorMessage: string | null
  ) => void;
  removeValue: (groupName: string, name: string) => void;
  clear: (groupName: string) => void;
  submit: () => void;
  forms: Forms;
  hasContext: boolean;
};

export type FormGroupProps = {
  onSubmit?: (data: any) => void;
  name: string;
  clearOnSubmit?: boolean;
  children: ReactNode;
  submitForm?: boolean;
};

export type FormGroupHandlerProvider = {
  submit: (value?: any) => void;
  getInitialForms: (params: any) => void;
  setDisabled: (name: string, disabled: boolean) => void;
  setValue: (name: string, value: any) => void;
  setError: (name: string, errorMessage: string | null) => void;
  removeValue: (name: string) => void;
  clear: () => void;
  canSubmit: boolean;
  formGroup: FormInputs;
  hasContext: boolean;
};
