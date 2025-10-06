import { Navigate } from "react-router-dom";
import { Children, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
    const {user} = useContext(AuthContext);

    if(!user){
        return <Navigate to="/login" replace/>;
    }
    return children
};

export default RequireAuth;