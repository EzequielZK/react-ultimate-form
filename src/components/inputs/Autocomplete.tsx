import * as React from "react";
import TextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";
import useFormGroupHandler from "../../hooks/useFormGroupHandler";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import type { CustomAutocompleteProps, ItemOption } from "./types";
import CircularProgress from "@mui/material/CircularProgress";
// import { styled, lighten, darken } from "@mui/system";

// const GroupHeader = styled("div")(({ theme }) => ({
//   position: "sticky",
//   top: "-8px",
//   padding: "4px 10px",
//   color: theme.palette.primary.main,
//   zIndex: 2000,
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? lighten(theme.palette.primary.light, 0.85)
//       : darken(theme.palette.primary.main, 0.8),
// }));

// const GroupItems = styled("ul")(({ theme }) => ({
//   padding: 0,
// }));

export default function Autocomplete({
  disableCloseOnSelect,
  name,
  defaultValue = null,
  required,
  label,
  placeholder,
  options,
  disableClearable,
  sx,
  autoSubmit,
  call,
  removeOnUnmount,
  loading,
  ...props
}: CustomAutocompleteProps) {
  const {
    setValue,
    data,
    submit,
    setAnotherFieldValue,
    removeValue,
    setDisabled,
  } = useFormGroupHandler({
    name,
    label,
    defaultValue,
    required,
  });

  const { value, errorMessage, disabled } = data;

  const handleChange = (
    event: any,
    newValue: ItemOption | ItemOption[] | null
  ) => {
    console.log({ value: event.target.value });
    setValue(newValue);
    if (autoSubmit) {
      submit({ [name]: newValue });
    }
    if (call) {
      if (newValue) {
        call(newValue, setAnotherFieldValue);
      }
    }
  };
  React.useEffect(() => {
    return () => {
      if (removeOnUnmount) {
        removeValue();
      }
    };
  }, []);

  React.useEffect(() => {
    if (defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    if (props.disabled !== disabled) {
      setDisabled(props.disabled ?? false);
    }
  }, [props.disabled]);

  return (
    <MuiAutocomplete
      {...props}
      fullWidth
      loading={loading}
      color="primary"
      options={options}
      disableCloseOnSelect={disableCloseOnSelect}
      disableClearable={disableClearable}
      groupBy={(option: ItemOption) => (option.category ? option.category : "")}
      isOptionEqualToValue={(option) => option.value}
      value={value}
      onChange={handleChange}
      getOptionLabel={(option) => {
        return String(option.label);
      }}
      //   renderGroup={(params) => {
      //     return (
      //       <li key={params.key}>
      //         <GroupHeader>{params.group}</GroupHeader>
      //         <GroupItems>{params.children}</GroupItems>
      //       </li>
      //     );
      //   }}
      renderOption={(props, option) => {
        const { Icon } = option;
        delete props.color;
        delete props.style;
        return (
          <ListItem
            {...props}
            key={option.id}
            sx={{
              bgcolor: (theme) =>
                `${theme.palette.background.paper} !important`,

              // zIndex: -100,
              width: "100%",
              ":hover": {
                bgcolor: (theme) =>
                  `${theme.palette.background.default} !important`,
              },
            }}
          >
            {Icon && (
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
            )}
            <ListItemText> {option.label}</ListItemText>
          </ListItem>
        );
      }}
      sx={{
        ...sx,
        minWidth: 300,
      }}
      //   style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label={label}
          placeholder={placeholder}
          helperText={errorMessage ?? " "}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="primary" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
