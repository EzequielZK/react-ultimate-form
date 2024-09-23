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

  const searchForExistingChildren = (
    children: Array<React.ReactElement> | React.ReactElement
  ): string[] => {
    let names = [];
    if (Array.isArray(children)) {
      const { length } = children;
      let i = 0;

      for (; i < length; i++) {
        const child = children[i];

        if (child?.props?.name) {
          names.push(child.props.name);
        }
        if (child?.props?.children) {
          const inNames = searchForExistingChildren(child.props.children);
          names = [...names, ...inNames];
        }
      }
    } else {
      if (children?.props?.name) {
        names.push(children.props.name);
      }
      if (children?.props?.children) {
        const inNames = searchForExistingChildren(children.props.children);
        names = [...names, ...inNames];
      }
    }
    return names;
  };

  const removeFieldOnDynamicForm = () => {
    const childrenNames = searchForExistingChildren(children.props.children);

    if (forms.hasOwnProperty(children.props.name)) {
      const formsNames = Object.keys(forms[children.props.name]);

      const { length } = formsNames;
      let i = 0;

      for (; i < length; i++) {
        const formName = formsNames[i];

        if (!childrenNames.includes(formName)) {
          removeValue(children.props.name, formName);
        }
      }
    }
  };

  const getInitialForms = useCallback(
    ({
      groupName,
      name,
      required,
      label,
      loading,
      defaultValue,
      disabled,
      initialValues,
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
          initialValues,
        });
        removeFieldOnDynamicForm();
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
        let groups: { [index: string]: any } = {};
        for (itemKey in item) {
          if (itemKey.includes('/')) {
            const groupOfFields = itemKey.split('/')[0] as keyof typeof groups;
            if (groups.hasOwnProperty(groupOfFields)) {
              groups[groupOfFields] = [
                ...groups[groupOfFields],
                item[itemKey].value,
              ];
            } else {
              groups = { ...groups, [groupOfFields]: [item[itemKey].value] };
            }
            if (!item[itemKey].disabled) {
              newForm = { ...newForm, [groupOfFields]: groups[groupOfFields] };
            }
          }

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
