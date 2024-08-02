import * as React from 'react'

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
import FormHelperText from '@mui/material/FormHelperText'

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
  ...props
}: CustomSelectProps) {
  const { data, setValue, removeValue, submit } = useFormGroupHandler({
    name,
    label,
    required,
    defaultValue,
  });

  const { value = props.multiple ? [] : '', errorMessage } = data;

  const [, setTransition] = useTransition();

  useEffect(() => {
    return () => {
      if (removeOnUnmount) {
        removeValue();
      }
    };
  }, []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

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

  return (
    <FormControl variant={props.variant} fullWidth={fullWidth}>
      <InputLabel>
        {label}
        {required ? '*' : null}
      </InputLabel>

      <MuiSelect
        {...props}
        required={required}
        label={label}
        value={value}
        onClick={event => event.stopPropagation()}
        onChange={handleChange}
        renderValue={opts =>
          props.multiple
            ? opts.map((opt: any) => (
                <Chip
                  key={opt}
                  label={options.find(option => option.value === opt)?.label}
                  sx={{ ml: 1 }}
                />
              ))
            : options.find(option => option.value === opts)?.label
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
          <MenuItem value='loading' disabled>
            <CircularProgress size={20} color='inherit' />
          </MenuItem>
        ) : options.length ? (
          options.map(opt => (
            <MenuItem
              key={opt.label}
              value={opt.value}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              {opt.icon}

              {opt.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem value='noOpt' disabled>
            <Typography>Nenhum item a ser exibido</Typography>
          </MenuItem>
        )}
      </MuiSelect>
      {<FormHelperText>{errorMessage ?? helperText}</FormHelperText>}
    </FormControl>
  );
}
