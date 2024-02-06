import {createContext, useCallback, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";


const AuthContext = createContext();

const AuthProvider =  (props) => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();


    const handleLogin = useCallback(() => {
        const storage = sessionStorage.getItem("ppis-token");

        if (storage) {
            const {data} = JSON.parse(storage);

            setAuthenticatedUser(data);
            const origin = location.state?.from?.pathname || "/dashboard";
            navigate(origin)
        }
    }, [navigate, location])

    const handleLogout = () => {
        navigate("/");

        setTimeout(() => {
            setAuthenticatedUser(null);
            sessionStorage.removeItem("ppis-token");
        }, 2000)
    }

    const values = useMemo(() => ({
        authenticatedUser,
        handleLogout,
        handleLogin
    }),[authenticatedUser,handleLogout,handleLogin]);


    return (
        <AuthContext.Provider value={values} >
            {props.children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider}
