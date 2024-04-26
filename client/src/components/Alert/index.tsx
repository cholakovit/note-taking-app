// React Elements
import { FC } from "react";

// MUI Elements
import { Alert, AlertColor } from "@mui/material";

// Custom Hooks
import { useAlertWithTimeout } from "../../helper/hooks";

const AlertMessage: FC<AlertMessageProps> = ({ alert, type }) => {

  // Sets an alert message to display for a specified duration (timeout), then automatically clears the message.
  const displayAlert: string | null = useAlertWithTimeout({
    initialAlert: alert,
    timeout: 30000,
  });

  // Different type of messages, different colors
  return displayAlert ? (
    <Alert severity={type as AlertColor} data-testid="alert">
      {displayAlert}
    </Alert>
  ) : null;
};

export default AlertMessage;
