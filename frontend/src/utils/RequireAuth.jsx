import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, roles }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(role)
  if(!token){
    return <Navigate to='/login' state={{from: location}} replace/>
  }
  if(roles && !roles.includes(role)){
    return role === "STAFF" ? (
      <Navigate to = "/staff/dashboard" replace/>
    ) : (
      <Navigate to = "/room" replace />
    )
  }

  return children;
}
