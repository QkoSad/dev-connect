import { Box } from "@mui/material";
import AlertMUI from "@mui/material/Alert";
import { useAppSelector } from "../../utils/hooks";
const Alert = () => {
  const alerts = useAppSelector((state) => state.alert);
  return (
    <Box sx={{ position: "fixed" }}>
      {alerts.map((alert) =>
        alert.alertType === "danger" ? (
          <AlertMUI key={alert.id} severity="error">
            {alert.msg}
          </AlertMUI>
        ) : (
          <AlertMUI key={alert.id} severity="success">
            {alert.msg}
          </AlertMUI>
        ),
      )}
    </Box>
  );
};

export default Alert;
