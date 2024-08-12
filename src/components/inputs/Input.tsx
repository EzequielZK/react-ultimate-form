import React, {
  KeyboardEvent,
  useEffect,
  useState,
  useTransition,
} from 'react';

import Stack from '@mui/material/Stack';

import useFormGroupHandler from '../../hooks/useFormGroupHandler';
import { InputProps } from './types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import CustomButton from '../buttons/FormButton';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';

export default function Input({
  label,
  name,
  defaultValue = '',
  helperText,
  mask,
  validation,
  required,
  Icon,
  fullWidth,
  containerStyle,
  iconColor,
  InputProps,
  variant = 'outlined',
  iconPosition = 'end',
  removeOnUnmount,
  noIconPadding,
  showLabel = true,
  call,
  loading,
  onChange,
  maxLength,
  isEqualTo,
  submitOnEnter,
  ...props
}: InputProps) {
  const {
    setValue,
    setDisabled,
    setAnotherFieldValue,
    getInitialForms,
    removeValue,
    setError,
    submit,
    formGroup,
    data,
  } = useFormGroupHandler({
    name,
    label,
    defaultValue,
    required,
    disabled: props.disabled
  });

  const { value, errorMessage, disabled } = data;

  const [innerType, setInnerType] = useState(props.type);
  const [, setTransition] = useTransition();

  useEffect(() => {
    if (removeOnUnmount) {
      getInitialForms({ name, required, label, defaultValue });
    }
    return () => {
      if (removeOnUnmount) {
        removeValue();
      }
    };
  }, []);

  useEffect(() => {
    if (defaultValue !== value) {
      handleChange({
        target: { value: defaultValue },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (props.disabled !== disabled) {
      setDisabled(props.disabled ?? false)
    }
  }, [props.disabled]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = event.target;

    validate(newValue);

    let maskValue = mask ? mask(newValue) : newValue;

    if (maxLength) {
      maskValue = maskValue.substring(0, maxLength);
    }

    setValue(maskValue);
    if (onChange) {
      setTransition(() => onChange(maskValue));
    }
    if (!newValue) {
      if (errorMessage) {
        setError(null);
      }
    }
  };

  const validate = (newValue: string) => {
    if (newValue) {
      if (validation) {
        const { error } = validation(newValue);
        setError(error);
      }

      if (isEqualTo) {
        const isEqual = formGroup[isEqualTo.field]?.value === newValue;
        if (!isEqual) {
          setError(isEqualTo.errorMessage);
        } else {
          setError(null);
        }
      }
    }
  };

  const handleSubmitOnEnter = (event: KeyboardEvent<HTMLImageElement>) => {
    if (props.multiline) {
      if (submitOnEnter && event.key === 'Enter' && !event.shiftKey) {
        submit();
        event.stopPropagation();
        event.preventDefault();
      }
    } else {
      if (submitOnEnter && event.key === 'Enter') {
        submit();
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  return (
    <Stack
      direction="column"
      position="relative"
      sx={{ width: fullWidth ? '100%' : 'unset', ...containerStyle }}
    >
      <TextField
        {...props}
        id={props.id}
        label={label}
        value={value}
        onChange={handleChange}
        variant={variant}
        type={innerType}
        fullWidth={fullWidth}
        onKeyDown={handleSubmitOnEnter}
        required={required}
        error={Boolean(errorMessage)}
        helperText={errorMessage ?? helperText}
        InputProps={
          InputProps ?? {
            [`${iconPosition}Adornment`]: loading ? (
              <InputAdornment position={iconPosition}>
                <CircularProgress size={20} color="primary" />
              </InputAdornment>
            ) : Icon ? (
              <InputAdornment position={iconPosition}>{Icon}</InputAdornment>
            ) : (
              props.type === 'password' && (
                <CustomButton
                  icon
                  onClick={() =>
                    setInnerType(state =>
                      state === 'password' ? 'text' : 'password'
                    )
                  }
                >
                  {innerType === 'password' ? (
                    <VisibilityOffOutlined />
                  ) : (
                    <VisibilityOutlined />
                  )}
                </CustomButton>
              )
            ),
          }
        }
        sx={{ ...props.sx }}
        onBlur={() => {
          if (call) {
            if (!errorMessage && value) {
              call(value, setAnotherFieldValue);
            }
          }
        }}
      />
    </Stack>
  );
}
