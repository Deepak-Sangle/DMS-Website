import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notify = (msg, type, time) => {
  const settings = {
    position: "top-left",
    autoClose: time !== undefined ? time : 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  if(type === "WARN")
    toast.warn(msg, settings);
  else if(type === "ERROR")
    toast.error(msg, settings);
  else if(type === "INFO")
    toast.info(msg, settings);
  else if(type === "SUCCESS")
    toast.success(msg, settings);
  
  toast.clearWaitingQueue();
}