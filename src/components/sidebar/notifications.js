import { toast } from "react-toastify";
export const ShowToast = (type,msg) => {

    console.log(type)
    switch(type) {
        case "SUCCESS": 
          toast.success(msg, {
              position : toast.POSITION.BOTTOM_RIGHT,
              autoClose: 2000
          })
          break;
        case "ERROR" : 
        toast.error(msg,{
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000
        })
        break;
        default:
            return false; 

    }
}