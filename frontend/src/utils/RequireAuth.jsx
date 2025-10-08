import { Navigate } from "react-router-dom";
import { Children, useContext } from "react";
import { useAuth } from "../context/AuthProvider";

const RequireAuth = ({ children }) => {
    const {user} = useAuth();

    if(!user){
        return <Navigate to="/login" replace/>;
    }
    return children
};

export default RequireAuth;