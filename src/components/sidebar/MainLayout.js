import React from "react";
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const MainLayout = (props) => {
    return (
        <>
        <div className="container-fluid mt-2">
              {props.children}
              <ToastContainer/>
        </div>
       
        </>
    )
}
export default MainLayout;