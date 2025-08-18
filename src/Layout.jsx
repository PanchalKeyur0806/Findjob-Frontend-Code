import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./components/Parts/Navbar/Navbar";
import Footer from "./components/Parts/Footer/Footer";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get("token"));
  }, []);

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Outlet context={{ setIsAuthenticated }} />
      <Footer />
    </>
  );
};

export default Layout;
