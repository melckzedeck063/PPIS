import {useState} from "react";


export default  function AuthUser() {


    const getToken = () => {
        const tokenString = sessionStorage.getItem("ppis-token");

        if (tokenString) {
            const { data } = JSON.parse(tokenString);
            return data;
        }

        return null; // or handle the absence of a token in a way that makes sense for your application
    }


    const [token, setToken] = useState(getToken());

    const saveToken =  userToken =>  {
        sessionStorage.getItem("mripoti-token", JSON.stringify(userToken));
        setToken(userToken.token);
    }

      return {
        setToken : saveToken,
          token
      }
}
