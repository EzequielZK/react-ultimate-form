import { FormGroupHandlerContext } from '../context/form/FormGroupHandler';
import { useContext, useEffect } from 'react';

export default function useFormGroupHandler({
  name,
  required,
  label,
  defaultValue,
}: any) {
  const formGroupHandlerContext = useContext(FormGroupHandlerContext);

  useEffect(() => {
    formGroupHandlerContext.getInitialForms({
      name,
      required,
      label,
      defaultValue,
    });
  }, []);

  const data = formGroupHandlerContext.formGroup?.[name] ?? {
    value: defaultValue,
    errorMessage: null,
    required,
    label,
  };

  const setError = (errorMessage: string | null) => {
    formGroupHandlerContext.setError(name, errorMessage);
  };

  const setValue = (value: any) => {
    formGroupHandlerContext.setValue(name, value);
  };

  const setAnotherFieldValue = (name: string, value: any) => {
    formGroupHandlerContext.setValue(name, value);
  };

  const removeValue = () => {
    formGroupHandlerContext.removeValue(name);
  };

  return {
    ...formGroupHandlerContext,
    removeValue,
    setAnotherFieldValue,
    setError,
    setValue,
    data,
  };
}
