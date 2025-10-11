import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, roles = [] }) {
  const location = useLocation();
  const isStaffArea = location.pathname.startsWith("/staff");

  const DEV_OPEN_STAFF = true; // ← เปลี่ยนเป็น false เวลา deploy

  if (DEV_OPEN_STAFF && isStaffArea) {
    return children;
  }

  const token = localStorage.getItem("token");
  const raw = localStorage.getItem("user");
  const user = raw ? JSON.parse(raw) : null;

  if (!token || !user) {
    return <Navigate to={isStaffArea ? "/staff/login" : "/login"} replace />;
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/room" replace />;
  }

  return children;
}
