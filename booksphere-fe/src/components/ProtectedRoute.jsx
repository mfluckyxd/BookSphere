import React, { useEffect } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ Component }) => {
  const loginStatus = true;


  if (!loginStatus) {
    return <Navigate to={"/login"} />;
  }
  return <div>{Component}</div>;
};

export default ProtectedRoute;