import { useState } from 'react'

export default function AuthUser() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const {data} = JSON.parse(tokenString);
        //  console.log(data)
        return data;
    }

    const [token, setToken] = useState( getToken() );

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token)
    }

    return {
        setToken: saveToken,
        token
  }
}