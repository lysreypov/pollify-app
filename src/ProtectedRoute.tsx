import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken || accessToken === "") {
    return <Navigate to="/user/sign_in" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
