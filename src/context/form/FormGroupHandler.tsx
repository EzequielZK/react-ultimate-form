import * as React from "react";

import { createContext, useEffect, useState } from "react";
import useFormHandler from "../../hooks/useFormHandler";
import { FormGroupHandlerProvider, FormGroupProps } from "./types";

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
    setDisabled,
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

  function validateRequiredInputs() {
    let hasValue = true;

    let key;

    for (key in formGroup) {
      const { required, value, disabled } = formGroup[key];

      if (
        (Array.isArray(value) && !value.length) ||
        (!value && required && !disabled)
      ) {
        hasValue = false;
      }
    }
    return { hasValue };
  }

  function validateErrorInputs() {
    let inputValid = true;

    let key;

    for (key in formGroup) {
      const { errorMessage: error, disabled } = formGroup[key];

      if (error && !disabled) {
        inputValid = false;
      }
    }
    return { inputValid };
  }

  function submit(value?: any) {
    let newForm = {};

    let key;
    let groups: { [index: string]: any } = {};
    for (key in formGroup) {
      let item = formGroup[key].value;
      const disabled = formGroup[key].disabled;

      if (!disabled) {
        if (Array.isArray(item)) {
          item = item.map((formItem) => formItem.value ?? formItem);
        }
        if (key.includes("/")) {
          const groupOfFields = key.split("/")[0] as keyof typeof groups;

          if (groups.hasOwnProperty(groupOfFields)) {
            groups = {
              ...groups,
              [groupOfFields]: [...groups[groupOfFields], item],
            };
          } else {
            groups = { ...groups, [groupOfFields]: [item] };
          }
          if (!formGroup[key].disabled) {
            newForm = { ...newForm, [groupOfFields]: groups[groupOfFields] };
          }
        } else {
          newForm = { ...newForm, [key]: item };
        }
      }
    }
    if (canSubmit) {
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
  }

  return (
    <FormGroupHandlerContext.Provider
      value={{
        submit,
        formGroup,
        setValue,
        setDisabled,
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
