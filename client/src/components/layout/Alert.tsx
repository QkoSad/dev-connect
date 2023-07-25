import React from "react";
import { useAppSelector } from "../../utils/hooks";
const Alert = () => {
  const alerts = useAppSelector((state) => state.alert);
  return (
    <div className="alert-wrapper">
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </div>
  );
};

export default Alert;
