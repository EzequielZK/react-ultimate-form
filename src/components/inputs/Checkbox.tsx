import * as React from 'react'

import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import useFormGroupHandler from "../../hooks/useFormGroupHandler";
import type { CustomCheckboxProps } from "./types";
import { useTransition, useEffect } from "react";
import Box from '@mui/material/Box'

export default function Checkbox({
  name,
  label,
  required,
  variant,
  fontWeight,
  defaultValue = false,
  autoSubmit,
  alignItems = 'flex-start',
  justifyContent = 'flex-start',
  onChange,
  ...props
}: CustomCheckboxProps) {
  const { setValue, setDisabled, setError, submit, data } = useFormGroupHandler({
    name,
    required,
    label,
    defaultValue,
    disabled: props.disabled
  });
  const { value, errorMessage, disabled } = data;
  const [, setTransition] = useTransition();

  useEffect(() => {
    if (defaultValue !== value) {
      handleChange(defaultValue)
    }
  }, [defaultValue]);

  useEffect(() => {
    if (props.disabled !== disabled) {
      setDisabled(props.disabled ?? false)
    }
  }, [props.disabled]);

  const handleChange = (
    checked: boolean
  ) => {
    setValue(checked);

    if (errorMessage) {
      setError(null);
    }
    if (autoSubmit) {
      submit({ [name]: checked });
    }
    if (onChange) {
      setTransition(() => onChange(checked));
    }
  };
  return (

    <Box display='flex' flexDirection="column" alignItems={alignItems} justifyContent={justifyContent}>
      <FormControlLabel
        {...props}
        control={
          <MuiCheckbox
            checked={value}
            onChange={(_event, checked) => handleChange(checked)}
            sx={{
              fontSize: variant ?? "body1.fontSize",
              fontWeight: fontWeight,
              color: Boolean(errorMessage) ? "error.main" : "action.disabled",
            }}
          />
        }
        label={label}
      />
      {errorMessage && (
        <Typography
          component="span"
          color="error"
          variant="caption"
          sx={{ m: 0 }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}