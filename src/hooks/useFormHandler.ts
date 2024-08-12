import { useContext } from 'react';
import { FormHandlerContext } from '../context/form/FormHandler';
import { InitialFormParams } from '../context/form/types';

export default function useFormHandler(groupName: string) {
  const formHandlerContext = useContext(FormHandlerContext);

  const formGroup = formHandlerContext.forms[groupName] ?? {};

  let newForms: typeof formGroup = {};

  let key;

  for (key in formGroup) {
    const item = formGroup[key];

    newForms = { ...newForms, [key]: item.value };
  }

  const setValue = (name: string, value: any) => {
    formHandlerContext.setValue(groupName, name, value);
  };

  const setError = (name: string, errorMessage: string | null) => {
    formHandlerContext.setError(groupName, name, errorMessage);
  };

  const clear = () => {
    formHandlerContext.clear(groupName);
  };

  const removeValue = (name: string) => {
    formHandlerContext.removeValue(groupName, name);
  };

  const getInitialForms = ({
    name,
    required,
    label,
    defaultValue,
    disabled
  }: InitialFormParams) => {
    formHandlerContext.getInitialForms({
      groupName,
      name,
      required,
      label,
      defaultValue,
      disabled
    });
  };

  return {
    ...formHandlerContext,
    removeValue,
    getInitialForms,
    setValue,
    setError,
    formGroup,
    forms: formHandlerContext.forms,
    values: newForms,
    clear,
  };
}
