import { toast } from "react-toastify";

export const ShowToast = (type, msg) => {
  const showToast = (type, msg, options) => {
    toast[type](msg, {
      ...options,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      onClose: () => {
        // Show the next toast if there is one in the queue
        const nextToast = document.querySelector(".Toastify__toast--rtl");
        if (nextToast) {
          nextToast.click();
        }
      },
    });
  };

  // Dismiss all currently displayed toasts
  toast.dismiss();

  switch (type) {
    case "SUCCESS":
      showToast("success", msg);
      break;
    case "ERROR":
      showToast("error", msg);
      break;
    default:
      return false;
  }
};
