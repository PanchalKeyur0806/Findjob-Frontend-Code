import React from "react";
import { NavLink } from "react-router-dom";

const MobileNavbar = () => {
  return (
    <div className="sticky left-0 top-15 w-full z-50">
      <ul className="py-5 flex flex-col text-center gap-5 bg-purple-900 text-white text-xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "text-gray-300  font-medium" : ""}`
          }
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `${isActive ? "text-gray-300  font-medium" : ""}`
          }
        >
          <li>Opportunities</li>
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `${isActive ? "text-gray-300  font-medium" : ""}`
          }
        >
          <li>Chat</li>
        </NavLink>
        <NavLink
          to={"/aboutus"}
          className={({ isActive }) =>
            `${isActive ? "text-gray-300 font-medium" : ""}`
          }
        >
          <li>About Us</li>
        </NavLink>
        <NavLink
          to={"/contactus"}
          className={({ isActive }) =>
            `${isActive ? "text-gray-300  font-medium" : ""}`
          }
        >
          <li>Contact Us</li>
        </NavLink>

        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            `${isActive ? "text-gray-300 font-medium" : ""}`
          }
        >
          <li>Profile</li>
        </NavLink>

        <NavLink
          to={"applications"}
          className={({ isActive }) =>
            `${isActive ? "text-gray-300 font-medium" : ""}`
          }
        >
          <li>My Applications</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default MobileNavbar;
