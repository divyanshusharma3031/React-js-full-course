import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const {isAuthenticated} = useAuth();
  const navigate=useNavigate();
  useEffect(()=>{
    if(!isAuthenticated)
        navigate("/");
  },[isAuthenticated,navigate]);
  if(!isAuthenticated)
  {
    // kyuki after render hi run hoga so error dega ki user is not defined (UseEffect tab hi run hota hai jab pura component render ho jaaye)
    return null;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
