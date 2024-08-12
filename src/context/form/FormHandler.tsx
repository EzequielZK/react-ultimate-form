import * as React from 'react';

import { createContext, useCallback, useReducer, useTransition } from 'react';
import { formReducer, initialForm } from './reducer';
import {
  FormData,
  FormHandlerProvider,
  FormProps,
  InitialFormParams,
} from './types';

export const FormHandlerContext = createContext({} as FormHandlerProvider);

export default function FormHandler({ children, onSubmit }: FormProps) {
  const [forms, dispatch] = useReducer(formReducer, initialForm);
  const [, setTransition] = useTransition();

  const hasContext = true;

  const getInitialForms = useCallback(
    ({
      groupName,
      name,
      required,
      label,
      loading,
      defaultValue,
      disabled,
    }: InitialFormParams) => {
      if (!forms[groupName]?.[name]) {
        setFormInputs(groupName, name, {
          value: defaultValue,
          defaultValue,
          errorMessage: null,
          loading,
          required,
          label,
          disabled,
        });
      }
    },
    [forms]
  );

  const setFormInputs = (groupName: string, name: string, data: FormData) => {
    dispatch({
      type: 'SET_FORM_INPUTS',
      params: {
        groupName,
        name,
        data,
      },
    });
  };

  const setValue = useCallback(
    (groupName: string, name: string, value: any) => {
      setFormInputs(groupName, name, { value });
    },
    [forms]
  );

  const setDisabled = useCallback(
    (groupName: string, name: string, disabled: boolean) => {
      setFormInputs(groupName, name, { disabled });
    },
    [forms]
  );


  const setError = useCallback(
    (groupName: string, name: string, errorMessage: string | null) => {
      setFormInputs(groupName, name, { errorMessage });
    },
    [forms]
  );

  const removeValue = useCallback(
    (groupName: string, name: string) => {
      dispatch({ type: 'REMOVE_VALUE', params: { groupName, name } });
    },
    [forms]
  );

  const clear = (groupName: string) => {
    setTransition(() => {
      dispatch({ type: 'CLEAR', params: { groupName } });
    });
  };

  const submit = useCallback(() => {
    if (onSubmit) {
      let newForm = {};
      let key;

      for (key in forms) {
        const item = forms[key];
        let itemKey;
        for (itemKey in item) {
          if (!item[itemKey].disabled) {
            newForm = { ...newForm, [itemKey]: item[itemKey].value };
          }
        }
      }
      onSubmit(newForm);
    }
  }, [forms]);

  return (
    <FormHandlerContext.Provider
      value={{
        forms,
        setValue,
        setDisabled,
        getInitialForms,
        setError,
        clear,
        submit,
        removeValue,
        hasContext,
      }}
    >
      {children}
    </FormHandlerContext.Provider>
  );
}
