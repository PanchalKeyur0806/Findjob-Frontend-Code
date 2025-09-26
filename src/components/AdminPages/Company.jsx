import React, { useEffect, useMemo, useState } from "react";
import { TbWorldWww } from "react-icons/tb";
import { IoIosCall } from "react-icons/io";
import { GoDot } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import Aside from "../Parts/Aside/Aside";
import { useSearchParams } from "react-router-dom";
import useGetData from "../../Hooks/FetchGetDataHook";
import LoadingBar from "react-top-loading-bar";
import { Dot, Eye, Mail, Menu, Search, Trash } from "lucide-react";

const Company = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);

  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [getData, getLoading, getMessage, getError, progress, setProgress] =
    useGetData();

  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const page = Number(searchParams.get("page") || "1");

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  function buildBaseUrl() {
    const params = new URLSearchParams();

    if (name) params.set("name", name);
    if (email) params.set("email", email);

    if (page) params.set("page", page);

    return `${baseUrl}api/company?${params}`;
  }

  //   update the params
  const updateParams = (params) => {
    const currentParams = new URLSearchParams(searchParams);

    Object.keys(params).map((key) => {
      if (params[key]) currentParams.set(key, params[key]);
      else {
        currentParams.delete(key);
      }
    });

    if (!params.hasOwnProperty("page")) {
      currentParams.set("page", "1");
    }

    setSearchParams(currentParams);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getData(buildBaseUrl(), { withCredentials: true });

      setTotalPages(response.data.numOfPages);
      setTotalCompanies(response.data.totalDocs);
      setCurrentPage(response.data.page);
      setCompanyData(response.data.companies);
    }

    fetchData();
  }, [searchParams]);

  const hanldeAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const handleParams = (e) => {
    e.preventDefault();

    const email = emailField?.trim();
    const name = nameField?.trim();

    updateParams({ email, name });
  };

  const handlePageChange = (page) => {
    updateParams({ name, email, page: page });
  };

  const handleName = (e) => {
    setNameField(e.target.value);
  };

  const handleEmail = (e) => {
    setEmailField(e.target.value);
  };

  const handleSearchOpen = () => {
    setSearchOpen(!searchOpen);
  };

  const pageButtons = useMemo(() => {
    if (totalPages <= 1) return [1];

    const buttons = [];
    const start = Math.max(1, currentPage - 2);

    for (let i = 0; i < totalPages; i++) {
      const pageNumber = start + i;
      if (pageNumber > totalPages) break;
      buttons.push(pageNumber);
    }

    return buttons;
  }, [currentPage, totalPages]);

  function getColor(data) {
    switch (data) {
      case "pending":
        return "bg-gray-600 text-white px-3 py-2";
      case "verified":
        return "bg-green-700 text-white px-3 py-2";
      case "rejected":
        return "bg-red-800 text-white px-3 py-2";
    }
  }

  return (
    <>
      <LoadingBar
        color="#8b5cf6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)} // reset when done
      />
      <main className="flex flex-row font-poppins">
        <Aside
          isAsideOpen={isAsideOpen}
          onclose={() => setIsAsideOpen(false)}
        />
        <section className="px-5 md:px-10 pt-10 w-full h-screen overflow-y-scroll">
          <div className="block md:hidden">
            <Menu onClick={hanldeAside} />
          </div>
          {/* Heading of the Company */}
          <div>
            <h1 className="text-2xl text-slate-800">Company Management</h1>
            <div className="text-sm text-gray-500 mt-1">
              <p>
                Total{" "}
                <span className="text-gray-800 font-medium">{totalPages}</span>{" "}
                Pages
              </p>
              <p>
                Total{" "}
                <span className="text-gray-800 font-medium">
                  {totalCompanies}
                </span>{" "}
                Companies
              </p>
              <p>
                Current{" "}
                <span className="text-gray-800 font-medium">{currentPage}</span>{" "}
                Page
              </p>
            </div>
          </div>

          {/* Another searching functionality */}
          <div className="my-10">
            <div
              className="shadow  size-30 cursor-pointer"
              onClick={handleSearchOpen}
            >
              <h1
                className={`flex flex-col items-center justify-center gap-3 w-full h-full transition duration-75 ease-in rounded-lg ${
                  searchOpen
                    ? "bg-purple-800 text-white"
                    : "bg-white text-black"
                }`}
              >
                <span>
                  <Search />
                </span>
                <span className="text-center">Search Company</span>
              </h1>
            </div>
          </div>

          <div className="my-10 ">
            {searchOpen === true && (
              <div
                className={`  max-w-[700px] bg-white shadow rounded-lg px-5 py-2  `}
              >
                <h1 className="text-xl font-medium my-4">Search</h1>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name">Company Name</label>
                    <input
                      type="search"
                      name="name"
                      id="name"
                      onChange={handleName}
                      className="rounded-md shadow focus:outline-none text-gray-500 bg-gray-100 px-4 py-1 "
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label htmlFor="email">Company Email</label>
                    <input
                      type="search"
                      name="email"
                      id="email"
                      onChange={handleEmail}
                      className="rounded-md shadow focus:outline-none text-gray-500 bg-gray-100 px-4 py-1 "
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-row justify-end">
                  <button
                    onClick={handleParams}
                    className="px-4 py-2 bg-purple-700 text-white rounded-lg mx-2 cursor-pointer hover:bg-purple-900 transform transition duration-75 ease-in-out hover:scale-105 active:scale-95"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-slate-950  rounded-lg mx-2 cursor-pointer hover:bg-gray-300 transform transition duration-75 ease-in-out hover:scale-105 active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Show Data  */}

          <div className="hidden md:block overflow-auto mt-10 shadow rounded-md  ">
            <table className="table-auto rounded-md shadow border-collapse ">
              <thead>
                <tr className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium">
                  <td className="py-3 px-5 tracking-wider">Id</td>
                  <td className="py-3 px-5  tracking-wider">Company Logo</td>
                  <td className=" py-3 px-5  tracking-wider">Company Name</td>
                  <td className=" py-3 px-5  tracking-wider">Company Email</td>
                  <td className=" py-3 px-5  tracking-wider">
                    Company PhoneNumber
                  </td>
                  <td className=" py-3 px-5 tracking-wider">Description</td>
                  <td className=" py-3 px-5 tracking-wider">Address</td>
                  <td className="mx-4 my-1 py-3 px-2 tracking-wider">
                    Websites
                  </td>
                  <td className=" py-3 px-5 tracking-wider">IsClaimed</td>
                  <td className=" py-3 px-5 tracking-wider">createdBy</td>
                  <td className=" py-3 px-5 tracking-wider">
                    CompanyVerification
                  </td>
                  <td className=" py-3 px-5 tracking-wider">Actions</td>
                </tr>
              </thead>

              <tbody className="text-sm">
                {companyData &&
                  companyData.map((company, index) => (
                    <tr
                      key={company._id}
                      className={`text-center ${
                        index % 2 === 0 ? "bg-gray-200" : "bg-white"
                      }`}
                    >
                      {/* ID */}
                      <td className="border-b-2  border-purple-800 px-2 py-2">
                        {company._id.slice(0, 10)}
                        {"..."}
                      </td>

                      {/* Logo */}
                      <td className="border-b-2  border-purple-800 px-2 py-2">
                        <div className="flex justify-center">
                          <img
                            className="rounded-full w-10 h-10 object-cover"
                            src={company.companyLogo}
                            alt="Company Logo"
                          />
                        </div>
                      </td>

                      {/* Company Name */}
                      <td className="border-b-2  border-purple-800 px-2 py-2">
                        {company.companyName.slice(0, 10)}
                        {"..."}
                      </td>

                      {/* Email */}
                      <td className="border-b-2  border-purple-800 px-2 py-2">
                        {company.email.slice(0, 10)}
                        {"..."}
                      </td>

                      {/* Phone */}
                      <td className="border-b-2  border-purple-800 px-2 py-2">
                        {company.phoneNumber}
                      </td>

                      {/* Description */}
                      <td className="border-b-2  border-purple-800 px-2 py-2">
                        {company.description?.slice(0, 10)}
                        {"..."}
                      </td>

                      {/* Address */}
                      <td className="border-b-2  border-purple-800 px-2 py-2">
                        {company.address.slice(0, 10)}
                        {"..."}
                      </td>

                      {/* Website (just first element for now) */}
                      <td className="border-b-2  border-purple-800 px-2 py-2 font-medium cursor-pointer">
                        {company.website &&
                          company.website.map((web, index) => (
                            <span key={index} className="hover:text-blue-900">
                              {web}
                            </span>
                          ))}
                      </td>

                      {/* Claimed Status */}
                      <td className="border-b-2  border-purple-800 px-2 py-2">
                        <span
                          className={`px-2 py-1 rounded-md text-white ${
                            company.isClaimed ? "bg-red-700" : "bg-green-700"
                          }`}
                        >
                          {company.isClaimed ? "True" : "False"}
                        </span>
                      </td>

                      {/* Created By */}
                      <td className="border-b-2  border-purple-800 px-2 py-2">
                        {company.createdBy.slice(0, 10)}
                        {"..."}
                      </td>

                      {/* Verification */}
                      <td className={`border-b-2  border-purple-800 px-2 py-2`}>
                        <span
                          className={`rounded-md ${getColor(
                            company.companyVerification
                          )}`}
                        >
                          {company.companyVerification}
                        </span>
                      </td>

                      <td className="px-2 py-2 flex flex-col  gap-2  border-b-2 border-purple-800">
                        <button className="bg-green-700 text-white px-3 py-1 rounded-sm hover:bg-green-900 transition duration-200 ease-in-out cursor-pointer transform hover:scale-110 active:scale-90">
                          View
                        </button>
                        <button className="bg-red-700 text-white px-3 py-1 rounded-sm hover:bg-red-900 transition duration-200 ease-in-out cursor-pointer transform hover:scale-110 active:scale-90">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Showing Data for Mobile Devices  */}
          <div className="my-10 block md:hidden">
            {companyData &&
              companyData.map((company) => {
                return (
                  <div
                    key={company._id}
                    className="rounded-lg shadow my-10 px-5 py-2"
                  >
                    <div className="flex gap-5">
                      <div>
                        <img
                          src={`${company.companyLogo}`}
                          alt="Company Logo"
                          className="size-15"
                        />
                      </div>

                      <div>
                        <p>{company.companyName}</p>
                        <p className="flex gap-2 text-sm text-gray-500 my-0.5">
                          <span>
                            <Mail size={18} />
                          </span>
                          <span className="">{company.email}</span>
                        </p>
                        <p className="flex gap-2 text-sm text-gray-500 my-0.5">
                          <span>
                            <IoIosCall />
                          </span>
                          <span className="">{company.phoneNumber}</span>
                        </p>
                      </div>
                    </div>

                    {/* Active and Verification */}
                    <div className="mt-4 flex gap-3">
                      <span
                        className={`flex items-center w-28 px-2 py-1 rounded-lg ${
                          company.isActive ? "bg-green-200" : "bg-red-200"
                        }`}
                      >
                        <GoDot />
                        {company.isActive ? "Available" : "Not Available"}
                      </span>
                      <span
                        className={`rounded-lg ${getColor(
                          company.companyVerification
                        )}`}
                      >
                        {company.companyVerification}
                      </span>
                    </div>

                    {/* Summary */}
                    <div className="my-4 rounded-lg border border-gray-500/20 px-4 py-1">
                      <p>
                        <span className="font-medium">About : </span>
                        {company.description.slice(0, 30)} ...
                      </p>
                    </div>

                    {/* Address */}
                    <div className="rounded-lg border border-gray-500/20 px-4 py-2">
                      <p className="flex items-center gap-2 ">
                        <span>
                          <FaLocationDot />
                        </span>
                        <span>Address</span>
                      </p>
                      <p className="mt-1 text-gray-500/80">
                        {company.address.slice(0, 20)}
                      </p>
                    </div>

                    {/* Website */}
                    <div className="mt-3">
                      <p className="flex gap-2 items-center">
                        <span>
                          <TbWorldWww />
                        </span>
                        <span>Website</span>
                      </p>
                      {company.website.map((web) => (
                        <p
                          key={web}
                          className="mt-1 rounded-4xl border border-blue-700 px-3 bg-blue-50 text-blue-700 font-medium"
                        >
                          {web}
                        </p>
                      ))}
                    </div>

                    {/* View And Delete */}
                    <div className="mt-10 grid grid-cols-2 gap-3 items-center">
                      <button className="flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-green-700 text-white transition transform ease-in duration-200  hover:scale-110 active:scale-90">
                        <span>
                          <Eye size={18} />
                        </span>
                        <span>View</span>
                      </button>
                      <button className="flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-red-700 text-white transition transform ease-in duration-200  hover:scale-110 active:scale-90">
                        <span>
                          <Trash size={18} />
                        </span>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* page number */}
          <div className="my-10 ">
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`bg-gray-100 px-4 py-2 rounded-md   hover:bg-gray-300 ${
                    currentPage == 1 ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {pageButtons?.map((page) => (
                    <button
                      onClick={() => handlePageChange(page)}
                      key={page}
                      className={`rounded-full cursor-pointer  px-3 py-1 ${
                        page === currentPage
                          ? "bg-gray-300 text-black"
                          : "bg-purple-700 text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-300 ${
                    currentPage == totalPages
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Company;
