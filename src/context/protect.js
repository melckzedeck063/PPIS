

import React, { useContext } from 'react'
import { AuthContext, AuthProvider } from '.'
import { useNavigate } from 'react-router-dom';
import AuthUser from './authUser';

export default function ProtectedRoute ({children}) {

    const context = useContext(AuthContext);
    const navigate =  useNavigate();
    const {token} = AuthUser();

    // console.log(token)

    if (!token) {
        setTimeout(() => {
            // window.location.reload(false);
            context.handleLogout();
            navigate('/')
        }, 100);
    }

  return (
     <AuthProvider>
        {children}
     </AuthProvider>
  )
}
