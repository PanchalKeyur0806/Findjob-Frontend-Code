import React from "react";
import { NavLink } from "react-router-dom";

const Aside = () => {
  return (
    <aside className="hidden md:block w-[95%] md:w-1/4 bg-purple-800 h-screen text-white font-poppins">
      <div className="px-10 text-center mt-10 text-xl">
        <ul>
          <NavLink
            to={"/admin/dashboard"}
            className={({ isActive }) =>
              `w-full block my-5 py-1  ${
                isActive
                  ? "font-medium bg-white text-purple-800 rounded"
                  : "hover:bg-white hover:text-purple-800 rounded"
              }`
            }
          >
            <li>Dashboard</li>
          </NavLink>
          <NavLink
            to={"/admin/jobs"}
            className={({ isActive }) =>
              `w-full block mt-5 py-1   ${
                isActive
                  ? "font-medium bg-white text-purple-800 rounded"
                  : "hover:bg-white hover:text-purple-800 rounded"
              }`
            }
          >
            <li className="w-full ">Jobs</li>
          </NavLink>
          <NavLink
            to={"/admin/users"}
            className={({ isActive }) =>
              `w-full block mt-5 py-1  ${
                isActive
                  ? "font-medium bg-white text-purple-800  rounded"
                  : "hover:bg-white hover:text-purple-800 rounded"
              }`
            }
          >
            <li>Users</li>
          </NavLink>
          <NavLink
            to={"/admin/companies"}
            className={({ isActive }) =>
              `w-full block mt-5 py-1  ${
                isActive
                  ? "font-medium bg-white text-purple-800 "
                  : "hover:bg-white hover:text-purple-800 rounded"
              }`
            }
          >
            <li>Companies</li>
          </NavLink>
          <NavLink
            to={"/admin/claims"}
            className={({ isActive }) =>
              `w-full block mt-5 py-1  ${
                isActive
                  ? "font-medium bg-white text-purple-800 rounded"
                  : "hover:bg-white hover:text-purple-800 rounded"
              }`
            }
          >
            <li>Claims</li>
          </NavLink>
          <NavLink
            to={"/admin/contacts"}
            className={({ isActive }) =>
              `w-full block mt-5 py-1  ${
                isActive
                  ? "font-medium bg-white text-purple-800 rounded"
                  : "hover:bg-white hover:text-purple-800 rounded"
              }`
            }
          >
            <li>Contacts</li>
          </NavLink>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
