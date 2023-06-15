import { toast } from "react-toastify";

export const notifyError = (message) => {
  toast.error(message, {
    theme: "colored",
    autoClose: 5000,
  });
}

export const notifySuccess = (message) => {
  toast.success(message, {
    autoClose: 3000,
    theme: "colored",
  });
}

export const notifyWarning = (message) => {
  toast.warning(message, {
    theme: "colored",
    autoClose: 5000,
  })
}
export const notifyInfo = (message) => {
  toast.info(message, {
    theme: "colored",
    autoClose: 1000,
  })
}

