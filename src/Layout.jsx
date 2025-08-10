import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Parts/Navbar/Navbar";
import Footer from "./components/Parts/Footer/Footer";

const Layout = () => {
  return (
    <section>
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
};

export default Layout;
