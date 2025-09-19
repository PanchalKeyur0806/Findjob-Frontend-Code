import React, { useEffect, useState } from "react";
import Aside from "../Parts/Aside/Aside";
import { Menu, PhoneCall } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import useGetData from "../../Hooks/FetchGetDataHook";
import { io } from "socket.io-client";

const Users = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const [searchField, setSearchField] = useState(null);
  const [emailField, setEmailField] = useState(null);
  const [rolesField, setRoles] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState(null);
  const [numOfUsers, setNumOfUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [userCreated, setUserCreated] = useState(null);

  // custom hooks
  const [getData, getLoading, getMessage, getError] = useGetData();

  const search = searchParams.get("search") || undefined;
  const email = searchParams.get("email") || undefined;
  const roles = searchParams.get("roles") || "all";
  const page = Number(searchParams.get("page") || "1");

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/api/userprofile/users"
    : import.meta.env.VITE_BACKEND_URL;

  // function for setting base url
  function buildBaseUrl() {
    const params = new URLSearchParams();

    if (search) params.set("search", searchField);
    if (email) params.set("email", email);
    if (page) params.set("page", page);
    if (roles && roles !== "all") params.set("roles", roles);

    return `${baseUrl}?${params}`;
  }

  // for fetching the data
  useEffect(() => {
    async function fetchData() {
      const response = await getData(buildBaseUrl(), {
        withCredentials: true,
      });

      console.log(response);
      setUserData(response.data.users);
      setCurrentPage(response.data.currentPage);
      setNumOfUsers(response.data.numOfPages);
      setTotalUsers(response.data.totalUsers);
    }

    fetchData();
  }, [searchParams]);

  if (getLoading) {
    return (
      <div className="h-screen flex justify-center items-center text-4xl font-medium font-poppins">
        <h1>Loading...</h1>
      </div>
    );
  }

  // handle submit
  const handleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  // hanlde params
  const updateParams = (params) => {
    const currentParams = new URLSearchParams(searchParams);

    // get all the keys from params
    // loop through keys and set the params
    Object.keys(params).map((key) => {
      if (params[key] && params[key] !== "all") {
        currentParams.set(key, params[key]);
      } else {
        currentParams.delete(key);
      }

      // set page
      if (!params.hasOwnProperty("page")) {
        currentParams.set("page", 1);
      }

      setSearchParams(currentParams);
    });
  };

  // for fetching the data accroding to query params
  const handleParams = (e) => {
    e.preventDefault();

    const search = searchField?.trim();
    const email = emailField?.trim();

    updateParams({
      search,
      email,
      roles: rolesField,
    });
  };

  // handle page change
  const handlePageChange = (newPage) => {
    updateParams({
      search,
      email,
      roles: rolesField,
      page: newPage,
    });
  };

  // css functions
  const getRoleColors = (roles) => {
    switch (roles) {
      case "candidate":
        return "bg-blue-800 text-white px-2 rounded-md";
      case "recruiter":
        return "bg-green-800 text-white px-2 rounded-md";
      case "admin":
        return "bg-red-800 text-white px-2 rounded-md";
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-row font-poppins ">
      <Aside isAsideOpen={isAsideOpen} onclose={() => setIsAsideOpen(false)} />
      <section className="h-screen  w-full mx-auto overflow-auto">
        <div className="px-10 block md:hidden mt-5">
          <button>
            <Menu onClick={handleAside} />
          </button>
        </div>

        <div className="md:my-10 my-5 px-10">
          <h1 className="text-3xl font-medium">User Management</h1>
          <p className="text-gray-500">
            Total <span className="font-medium text-black">{totalUsers}</span>{" "}
            users
          </p>
          <p className="text-gray-500">
            Total Pages{" "}
            <span className="font-medium text-black">{numOfUsers}</span>
          </p>
          <p className="text-gray-500">
            Current Page{" "}
            <span className="font-medium text-black">{currentPage}</span>
          </p>
        </div>

        {/* Searching functionality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="search">Searcy By User Name</label>
            <input
              type="search"
              name="search"
              id="search"
              className="px-2 py-2 outline rounded-md"
              onChange={(e) => setSearchField(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Search By Email</label>
            <input
              type="search"
              name="email"
              id="email"
              className="px-2 py-2 outline rounded-md"
              onChange={(e) => setEmailField(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p>Select Role</p>
            <select
              name="roles"
              id="roles"
              className="outline rounded-md px-5 py-2"
              onChange={(e) => setRoles(e.target.value)}
            >
              <option value="all">All</option>
              <option value="recruiter">Recruiter</option>
              <option value="candidate">Candidate</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="px-10 my-5">
          <button
            onClick={handleParams}
            className="px-10 py-2 text-white bg-purple-800 rounded hover:bg-purple-900 transition duration-150 ease-in-out"
          >
            Filter
          </button>
        </div>

        {/* function for showing all the users */}
        <div className="hidden md:block overflow-auto shadow mt-10 mx-10 rounded-lg">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-purple-800">
                <th className=" text-white font-semibold px-5 py-3 tracking-wider">
                  Id
                </th>
                <th className=" text-white font-semibold px-5 py-3 tracking-wider">
                  Name
                </th>
                <th className=" text-white font-semibold px-5 py-3 tracking-wider">
                  Email
                </th>
                <th className=" text-white font-semibold px-5 py-3 tracking-wider">
                  PhoneNumber
                </th>
                <th className=" text-white font-semibold px-5 py-3 tracking-wider">
                  Date Of Birth
                </th>
                <th className=" text-white font-semibold px-5 py-3 tracking-wider">
                  authProvider
                </th>
                <th className=" text-white font-semibold px-5 py-3 tracking-wider">
                  Roles
                </th>
                <th className=" text-white font-semibold px-5 py-3 tracking-wider">
                  isVerified
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {userData?.map((user) => (
                <tr key={user._id}>
                  <td className="  text-start px-5 py-2 text-sm">{user._id}</td>
                  <td className="  text-start px-5 py-2 text-sm">
                    {user.name}
                  </td>
                  <td className="  text-start px-5 py-2 text-sm">
                    {user.email}
                  </td>
                  <td className="  text-start px-5 py-2 text-sm">
                    {user.phoneNumber}
                  </td>
                  <td className="  text-start px-5 py-2 text-sm">
                    {user.dateOfBirth}
                  </td>
                  <td className="  text-start px-5 py-2 text-sm">
                    {user.authProvider}
                  </td>
                  <td className="  text-start px-5 py-2 text-sm">
                    {user.roles}
                  </td>
                  <td className="  text-start px-5 py-2 text-sm ">
                    <p
                      className={`${
                        user.isVerified === true
                          ? "bg-green-800 text-white"
                          : "bg-red-800 text-white"
                      } rounded-lg text-center py-1`}
                    >
                      {" "}
                      {user.isVerified === true ? "true" : "false"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* showing data form mobile devices */}
        <div className="block md:hidden px-10">
          {userData &&
            userData.map((user) => (
              <div
                key={user._id}
                className="my-5 border-b-4 border-purple-800 rounded-lg px-5 py-3 shadow"
              >
                <div className="flex justify-between flex-wrap">
                  <div className="flex items-center gap-4 ">
                    <div>
                      <p className="text-2xl rounded-full bg-purple-800 text-white px-2 ">
                        {user.name.slice(0, 1)}
                      </p>
                    </div>
                    <div>
                      <p> {user.name}</p>
                      <p>{user.email}</p>
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="mt-3 md:mt-0">
                    <button className="bg-red-900 text-white px-4 rounded-md transition duration-150 ease-in-out hover:bg-red-900">
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-10 flex gap-5 flex-wrap">
                  <div className="flex gap-2 bg-slate-600 text-white px-2 rounded-md">
                    <p>
                      <PhoneCall />
                    </p>
                    <p> {user.phoneNumber}</p>
                  </div>
                  <p className="bg-sky-800 text-white rounded-md px-2">
                    {user.dateOfBirth.split("T")[0]}
                  </p>
                  <p className="bg-gray-700 text-white px-2 rounded-md">
                    {user.authProvider}
                  </p>
                  <p className={`${getRoleColors(user.roles)}`}>{user.roles}</p>
                  <p
                    className={`${
                      user.isVerified === true
                        ? "bg-green-700 text-white"
                        : "bg-red-700"
                    } rounded-md px-2 `}
                  >
                    {user.isVerified === true ? "true" : "false"}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* showing pagination button */}
        {numOfUsers >= 1 && (
          <div className="flex justify-between px-10 mt-10 mb-10">
            {/* Previous button */}
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`bg-purple-800 text-white px-10 py-2 rounded-md  hover:bg-purple-900 transition duration-200 ease-in ${
                  currentPage === 1 ? "cursor-not-allowed" : " cursor-pointer"
                }`}
              >
                Previous
              </button>
            </div>

            {/* Showing page number */}
            <div className="flex gap-4">
              {[...Array(Math.min(5, numOfUsers))].map((_, index) => {
                const pageNumber = Math.max(1, numOfUsers - 2) + index;
                console.log("Page numbers is ", pageNumber);

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className="rounded-full px-4 shadow bg-gradient-to-tr from-purple-500 to-purple-700 text-white cursor-pointer"
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            {/*  */}
            {/* next button */}
            <div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === numOfUsers}
                className={`bg-purple-800 text-white px-10 py-2 rounded-md  hover:bg-purple-900 transition duration-200 ease-in ${
                  currentPage === numOfUsers
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Users;
