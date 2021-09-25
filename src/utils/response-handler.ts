/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { toast } from "react-toastify";
import { deleteCurrentFamily } from "../utils/storage";

export const errorResponseHandler = (error: any): any => {
  if (!error.response || !error.response.data) {
    if (error.statusCode && error.statusCode === 403) {
      toast.error(error.message, { autoClose: 2500 });
      deleteCurrentFamily();
      setTimeout(() => {
        window.location.href = "/Auth/SignIn";
      }, 3500);
      return;
    }
    if (error.statusCode && error.statusCode === 401) {
      toast.error(error.message, { autoClose: 2500 });
      deleteCurrentFamily();
      window.location.href = "/Auth/SignIn";
      return;
    }
    toast.error(error.message, { autoClose: 2500 });
    return;
  }
  const { data } = error.response;
  if (data) {
    if (data.statusCode) {
      if (data.statusCode === 401 || data.statusCode === 403) {
        toast.error(data.message, { autoClose: 2500 });
        deleteCurrentFamily();
        setTimeout(() => {
          window.location.href = "/";
        }, 2500);
      }

      return;
    }
    if (data.details) {
      const input = data.details[0].path.replace("/", "").toLowerCase();
      const message = data.details[0].message;
      toast.error(`${input} ${message}`, { autoClose: 2500 });
      return;
    }
    if (data.message) {
      const message = data.message;
      toast.error(message, { autoClose: 2500 });
      return;
    }
  }
};

export const successResponseHandler = (response: any): any => {
  const { data } = response;
  if (data) {
    if (!data.success) {
      toast.error(data.message, { autoClose: 2500 });
      return;
    }
    if (data.message) {
      toast.success(data.message, { autoClose: 2500 });
    }
    return data.data;
  }

  return response;
};
