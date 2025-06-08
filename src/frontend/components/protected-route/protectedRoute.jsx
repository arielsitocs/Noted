import { useContext } from "react";
import { AuthContext } from "../../../backend/context/authContext.jsx";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);

    // Si no hay usuario, redirige al home //
    if (!user) {
        return <Navigate to="/home" replace />;
    }

    // Si hay usuario, renderiza el componente envuelto //
    return children;
}

export default ProtectedRoute;