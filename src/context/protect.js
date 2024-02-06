import {useContext} from "react";
import {AuthContext} from "./index";
import {useNavigate} from "react-router-dom";
import AuthUser from "./authUser";


export default function ProtectedRoute({ children }) {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const { token } = AuthUser();

    if (!token) {
        setTimeout(() => {
            navigate("/");
            context.handleLogout();
        }, 10);
    }

    return <>{children}</>; // Render children directly, no need for a new AuthProvider
}
