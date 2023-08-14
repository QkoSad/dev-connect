import React from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { useAppSelector } from "../../utils/hooks";

const PrivateRoute = ({
  component: Component,
}: {
  component: () => JSX.Element;
}) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

export default PrivateRoute;
