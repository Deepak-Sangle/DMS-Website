import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";

const CommonComponents = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
 
export default CommonComponents;