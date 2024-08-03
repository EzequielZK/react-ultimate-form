import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import useFormGroupHandler from '../../hooks/useFormGroupHandler';
import { CustomRadioButtonProps } from './types';
import Box from '@mui/material/Box';

export default function RadioButton({
  defaultValue = '',
  name,
  options,
  onChange,
  orientation = 'column',
  ...props
}: CustomRadioButtonProps) {
  const { setValue, data } = useFormGroupHandler({
    name,
    defaultValue,
  });
  const { value } = data;
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <FormControl>
      <RadioGroup
        {...props}
        defaultValue={defaultValue}
        value={value}
        onChange={(event, newValue) => {
          handleChange(newValue);
          if (onChange) {
            onChange(event, newValue);
          }
        }}
      >
        <Box display="flex" flexDirection={orientation}>
          {options.map(item => (
            <FormControlLabel
              {...item}
              key={item.value}
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
}
