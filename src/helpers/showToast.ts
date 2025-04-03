import { toast, ToastOptions } from "react-toastify";

const successToast: ToastOptions = {
  position: "bottom-right",
  autoClose: 4000,
  icon: false,
  style: {
    background: "#fff",
    color: "#35302D",
    fontSize: "16px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
    fontFamily: "Comfortaa, sans-serif",
  },
};

const errorToast: ToastOptions = {
  position: "bottom-right",
  autoClose: 4000,
  icon: false,
  style: {
    background: "#fff",
    color: "red",
    fontSize: "16px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
    fontFamily: "Comfortaa, sans-serif",
  },
};

export const showToast = (
  type: "success" | "error" | "warning" | "info",
  message: string
) => {
  switch (type) {
    case "success":
      toast.success(message, successToast);
      break;
    case "error":
      toast.error(message, errorToast);
      break;
    default:
      break
  }
};
