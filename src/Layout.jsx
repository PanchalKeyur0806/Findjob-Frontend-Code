import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./components/Parts/Navbar/Navbar";
import Footer from "./components/Parts/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
