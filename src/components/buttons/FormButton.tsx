import * as React from 'react';

import { FormGroupHandlerContext } from '../../context/form/FormGroupHandler';
import { FormHandlerContext } from '../../context/form/FormHandler';
import { FormButtonProps } from './types';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function FormButton({
  loading,
  variant = 'contained',
  onClick,
  children,
  icon,
  color,
  disabled,
  ...props
}: FormButtonProps) {
  const {
    submit: groupSubmit,
    canSubmit,
    hasContext,
    clear,
  } = React.useContext(FormGroupHandlerContext);

  const { submit, hasContext: handlerContext } = React.useContext(
    FormHandlerContext
  );

  const types = {
    submit() {
      groupSubmit();
    },
    submitAll() {
      submit();
    },
    clear() {
      clear();
    },
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
    if ((hasContext || handlerContext) && props.type) {
      const call = types[props.type];
      call();
    }
  };

  const Component = (btnProps: FormButtonProps) => {
    return icon ? (
      <IconButton {...btnProps} type="button">
        {btnProps.children}
      </IconButton>
    ) : (
      <Button
        {...btnProps}
        sx={{ display: 'flex', gap: 1, ...btnProps.sx }}
        type="button"
      >
        {btnProps.children}
      </Button>
    );
  };
  return (
    <Component
      {...props}
      color={color}
      sx={{ textTransform: 'none', ...props.sx }}
      variant={variant}
      disabled={
        disabled !== undefined
          ? disabled
          : hasContext
          ? (props.type === 'submit' || props.type === 'submitAll') &&
            (!canSubmit || loading)
          : loading ?? disabled
      }
      onClick={handleClick}
    >
      {loading ? <CircularProgress color={color} size={20} /> : children}
    </Component>
  );
}
