import AlertFeedback from "./Alert";
import { AlertColor } from "@mui/material/Alert";

let alertRef: AlertFeedback;

export function setAlertRef(ref: AlertFeedback) {
  alertRef = ref;
}

function showAlert(variant: AlertColor, text?: string) {
  if (!alertRef) {
    return;
  }

  setTimeout(() => {
    alertRef.setAlertProps(variant, text);
  }, 100);
}

const openModal = {
  showAlert,
};

export default openModal;