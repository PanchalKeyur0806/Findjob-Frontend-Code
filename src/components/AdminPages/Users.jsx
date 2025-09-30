import React, { useEffect, useState } from "react";
import Aside from "../Parts/Aside/Aside";
import { Menu, PhoneCall, Search, SearchX, SortDesc } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import useGetData from "../../Hooks/FetchGetDataHook";
import LoadingBar from "react-top-loading-bar";
import SearchMenu from "../Parts/Admin/Search";
import InputFields from "../Parts/Admin/InputFields";
import SortMenu from "../Parts/Admin/SortMenu";
import {
  CancelSearchBtn,
  SearchBtn,
  SortBtn,
} from "../Parts/Admin/SearchingBtns";

const Users = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [searchField, setSearchField] = useState(null);
  const [emailField, setEmailField] = useState(null);
  const [rolesField, setRoles] = useState(null);
  const [sortField, setSortField] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState(null);
  const [numOfUsers, setNumOfUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);

  // custom hooks
  const [getData, getLoading, getMessage, getError, progress, setProgress] =
    useGetData();

  const search = searchParams.get("search") || undefined;
  const email = searchParams.get("email") || undefined;
  const roles = searchParams.get("roles") || "all";
  const page = Number(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "new";

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
    if (sort) params.set("sort", sort);

    return `${baseUrl}?${params}`;
  }

  // for fetching the data
  useEffect(() => {
    async function fetchData() {
      const response = await getData(buildBaseUrl(), {
        withCredentials: true,
      });

      setUserData(response.data.users);
      setCurrentPage(response.data.currentPage);
      setNumOfUsers(response.data.numOfPages);
      setTotalUsers(response.data.totalUsers);
    }

    fetchData();
  }, [searchParams]);

  const handleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  // handle submit
  const handleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const handleSortOpen = () => {
    setSortOpen(!sortOpen);
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
    const sort = sortField?.trim();

    updateParams({
      search,
      email,
      roles: rolesField,
      sort: sort,
    });
  };

  const handleCancelSearch = () => {
    updateParams({
      search: "",
      email: "",
      roles: "",
      sort: "new",
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

  const handleSorting = (sortOption) => {
    setSortField(sortOption);
    updateParams({
      search,
      email,
      roles,
      sort: sortOption,
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
    <>
      <LoadingBar color="#8b5cf6" progress={progress} />
      <div className="flex flex-row font-poppins ">
        <Aside
          isAsideOpen={isAsideOpen}
          onclose={() => setIsAsideOpen(false)}
        />
        <section className="h-screen  w-full mx-auto overflow-y-auto">
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

          <div className="flex gap-4 mt-10 ml-10">
            <SearchBtn searchOpen={searchOpen} handleSearch={handleSearch} />
            <CancelSearchBtn cancelSearch={handleCancelSearch} />
            <SortBtn handleSort={handleSortOpen} />
          </div>

          <div className="my-10 mx-10">
            {searchOpen && (
              <SearchMenu
                title={"Search"}
                onSubmit={handleParams}
                onCancel={() => setSearchOpen(false)}
              >
                <InputFields
                  labelId={"search"}
                  labelName={"Search"}
                  inputId={"search"}
                  inputName={"search"}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <InputFields
                  labelId={"email"}
                  labelName={"Email"}
                  inputId={"email"}
                  inputName={"email"}
                  onChange={(e) => setEmailField(e.target.value)}
                />

                <div className="flex flex-col gap-3">
                  <p>Select Role</p>
                  <select
                    name="roles"
                    id="roles"
                    onChange={(e) => setRoles(e.target.value)}
                    className="bg-gray-100 text-gray-500 focus:outline-none rounded-md shadow px-4 py-1"
                  >
                    <option value="all">All</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="candidate">Candidate</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </SearchMenu>
            )}

            {sortOpen && (
              <SortMenu sortField={sortField} handleSorting={handleSorting} />
            )}
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
                  <th className=" text-white font-semibold px-5 py-3 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {userData &&
                  userData.map((user) => (
                    <tr key={user._id} className="text-center">
                      <td className="px-5 py-2 text-sm">
                        {user._id.slice(0, 7)}
                        {"..."}
                      </td>
                      <td className="px-5 py-2 text-sm">
                        {user.name.slice(0, 10)}
                        {"..."}
                      </td>
                      <td className="px-5 py-2 text-sm">
                        {user.email.slice(0, 12)}
                        {"..."}
                      </td>
                      <td className="px-5 py-2 text-sm">{user.phoneNumber}</td>
                      <td className="px-5 py-2 text-sm">
                        {user.dateOfBirth.split("T")[0]}
                      </td>
                      <td className="px-5 py-2 text-sm">{user.authProvider}</td>
                      <td className="px-5 py-2 text-sm">{user.roles}</td>
                      <td className=" px-5 py-2 text-sm ">
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
                      <td className=" px-5 py-2 text-sm flex gap-2">
                        <button className="px-4 py-1 rounded-md my-1 cursor-pointer bg-green-700 text-white transform transition duration-75 ease-in hover:scale-105 active:scale-95">
                          View
                        </button>
                        <button className="px-4 py-1 rounded-md my-1 cursor-pointer bg-red-700 text-white transform transition duration-75 ease-in hover:scale-105 active:scale-95">
                          Delete
                        </button>
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
                    <p className={`${getRoleColors(user.roles)}`}>
                      {user.roles}
                    </p>
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
                {[...Array(Math.min(10, numOfUsers))].map((_, index) => {
                  const pageNumber = Math.min(1, numOfUsers - 2) + index;

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
    </>
  );
};

export default Users;
