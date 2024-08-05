import * as React from 'react';

import { createContext, useEffect, useState } from 'react';
import useFormHandler from '../../hooks/useFormHandler';
import { FormGroupHandlerProvider, FormGroupProps } from './types';

export const FormGroupHandlerContext = createContext(
  {} as FormGroupHandlerProvider
);

export default function FormGroupHandler({
  onSubmit,
  name,
  clearOnSubmit,
  submitForm,
  children,
}: FormGroupProps) {
  const {
    forms,
    formGroup,
    removeValue,
    setValue,
    setError,
    getInitialForms,
    clear,
    submit: formSubmit,
  } = useFormHandler(name);

  const [canSubmit, setCanSubmit] = useState(false);
  const hasContext = true;

  useEffect(() => {
    if (name in forms) {
      const { hasValue } = validateRequiredInputs();

      if (hasValue) {
        const { inputValid } = validateErrorInputs();
        if (inputValid) {
          setCanSubmit(true);
        } else {
          if (canSubmit) {
            setCanSubmit(false);
          }
        }
      } else {
        if (canSubmit) {
          setCanSubmit(false);
        }
      }
    }
  }, [forms]);

  function validateRequiredInputs(isSubmit?: boolean) {
    let hasValue = true;
    let requiredMessage = '';

    let key;

    for (key in formGroup) {
      const { required, value, label } = formGroup[key];

      if ((Array.isArray(value) && !value.length) || (!value && required)) {
        if (isSubmit) {
          setError(
            key,
            typeof required === 'string' ? required : 'Campo obrigatório'
          );
        }

        hasValue = false;
        if (!requiredMessage) {
          requiredMessage = `Os seguintes campos obrigatórios encontram-se em branco: ${label}`;
        } else {
          requiredMessage += `, ${label}`;
        }
      }
    }
    return { hasValue, requiredMessage };
  }

  function validateErrorInputs() {
    let inputValid = true;
    let errorMessage = '';

    let key;

    for (key in formGroup) {
      const { errorMessage: error, label } = formGroup[key];

      if (error) {
        inputValid = false;
        if (!errorMessage) {
          errorMessage = `Os seguintes campos encontram-se incorretos: ${label}`;
        } else {
          errorMessage += `, ${label}`;
        }
      }
    }
    return { inputValid, errorMessage };
  }

  function submit(value?: any) {
    let newForm = {};

    let key;

    for (key in formGroup) {
      let item = formGroup[key].value;
      if (Array.isArray(item)) {
        item = item.map(formItem => formItem.value ?? formItem);
      }

      newForm = { ...newForm, [key]: item };
    }

    if (onSubmit) {
      onSubmit({ ...newForm, ...value });
    }

    if (clearOnSubmit) {
      clear();
    }
    if (submitForm) {
      formSubmit();
    }
  }

  return (
    <FormGroupHandlerContext.Provider
      value={{
        submit,
        formGroup,
        setValue,
        setError,
        getInitialForms,
        removeValue,
        clear,
        canSubmit,
        hasContext,
      }}
    >
      {children}
    </FormGroupHandlerContext.Provider>
  );
}
