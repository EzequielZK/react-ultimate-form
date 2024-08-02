import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { setAlertRef } from "./openModal";

export default class AlertFeedback extends React.Component {
  state = {
    open: false,
    variant: "success" as AlertColor,
    text: "",
  };

  componentDidMount(): void {
    setAlertRef(this);
  }

  close = () => {
    const { open } = this.state;
    if (open) {
      this.setState({ open: false });
    }
  };

  setAlertProps = (variant: AlertColor, text?: string) => {
    this.setState({ variant, text, open: true });
  };

  handleClose = (_: any, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render(): React.ReactNode {
    const { open, variant, text } = this.state;
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={this.handleClose}
      >
        <Alert severity={variant} variant="filled" elevation={6}>
          {text}
        </Alert>
      </Snackbar>
    );
  }
}