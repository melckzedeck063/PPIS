
import React, { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext =  React.createContext(null);

const AuthProvider = (props) => {

    const [authenticatedUser, setAuthinticatedUser] = useState(null);
    const  navigate =  useNavigate();
    const location =  useLocation();

    const handleLogin =  useCallback(() => {
        const  storage =  sessionStorage.getItem('token');
        // console.log(storage)

        if(storage){
        const {data} =  JSON.parse(storage);

        console.log(data);
        setAuthinticatedUser(data);
        const origin =  location.state?.from?.pathname || "/dashboard";
        navigate(origin);
        }
    },[navigate,location]) ;

    const handleLogout = () => {
        setAuthinticatedUser(null);
        sessionStorage.removeItem('token')

        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    const values =  useMemo(() =>({
        authenticatedUser,
        handleLogin,
        handleLogout,
    }),[authenticatedUser,handleLogin,handleLogout])
    
  return (
   <AuthContext.Provider value={values}>
         {props.children}
   </AuthContext.Provider>
  )
}

export  {AuthContext,AuthProvider};

