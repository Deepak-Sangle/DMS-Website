import React from "react";
import { Notify } from "../Components/Notify";

export function Fetch(url, options){
  const controller = new AbortController();
  const signal = controller.signal;
  
  const fetchResponse = fetch(url, {
    ...options,
    signal : signal
  });

  fetchResponse.catch((err)=> Notify("Please Check your Internet Connection", "ERROR"));
  
  const timeoutResponse = new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({isSuccess : false, message : "Timeout Error"});
      controller.abort();
    }, 5000);
  });

  return Promise.race([fetchResponse, timeoutResponse]);
}