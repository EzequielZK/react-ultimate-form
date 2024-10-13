import * as React from 'react';

import useFormGroupHandler from '../../hooks/useFormGroupHandler';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useTransition } from 'react';
import { CustomSelectProps } from './types';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function Select({
  options,
  name,
  label,
  required,
  defaultValue,
  onChange,
  removeOnUnmount,
  submitOnSelect,
  loading,
  helperText,
  fullWidth,
  size,
  sx,
  ...props
}: CustomSelectProps) {
  const {
    data,
    setValue,
    setDisabled,
    removeValue,
    submit,
  } = useFormGroupHandler({
    name,
    label,
    required,
    defaultValue,
    disabled: props.disabled,
    initialValues: {
      defaultValue,
      required,
      disabled: props.disabled,
    },
  });

  const { value = props.multiple ? [] : '', errorMessage, disabled } = data;

  const [, setTransition] = useTransition();

  useEffect(() => {
    return () => {
      if (removeOnUnmount) {
        removeValue();
      }
    };
  }, []);

  useEffect(() => {
    if (defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (props.disabled !== disabled) {
      setDisabled(props.disabled ?? false);
    }
  }, [props.disabled]);

  const handleChange = (event: SelectChangeEvent<any>) => {
    if (event.target.value) {
      setValue(event.target.value);
      if (submitOnSelect) {
        submit({ [name]: event.target.value });
      }
      if (onChange) {
        setTransition(() =>
          onChange(
            event.target.value,
            options.find(opt => opt.value === event.target.value)
          )
        );
      }
    }
  };
  console.log({ value });
  return (
    <FormControl
      variant={props.variant}
      fullWidth={fullWidth}
      size={size}
      disabled={props.disabled}
      sx={sx}
    >
      <InputLabel>
        {label}
        {required ? '*' : null}
      </InputLabel>

      <MuiSelect
        {...props}
        fullWidth
        required={required}
        label={label}
        value={value}
        onClick={event => event.stopPropagation()}
        onChange={handleChange}
        renderValue={opts =>
          props.multiple ? (
            opts.map((opt: any) => (
              <Chip
                key={opt}
                label={options.find(option => option.value === opt)?.label}
                sx={{ ml: 1 }}
              />
            ))
          ) : options.find(option => option.value === opts)?.icon ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {options.find(option => option.value === opts)?.icon}

              {options.find(option => option.value === opts)?.label}
            </Box>
          ) : (
            options.find(option => option.value === opts)?.label
          )
        }
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
              },
            },
          },
        }}
      >
        {loading ? (
          <MenuItem value="loading" disabled>
            <CircularProgress size={20} color="inherit" />
          </MenuItem>
        ) : options.length ? (
          options.map(opt => (
            <MenuItem
              key={opt.id}
              value={opt.value}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              {opt.icon}

              {opt.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="noOpt" disabled>
            <Typography>Nenhum item a ser exibido</Typography>
          </MenuItem>
        )}
      </MuiSelect>
      {errorMessage ||
        (helperText && (
          <FormHelperText>{errorMessage || helperText}</FormHelperText>
        ))}
    </FormControl>
  );
}
