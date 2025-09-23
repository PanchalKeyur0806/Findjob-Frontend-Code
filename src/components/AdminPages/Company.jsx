import React, { useEffect, useState } from "react";
import { TbWorldWww } from "react-icons/tb";
import { IoIosCall } from "react-icons/io";
import { GoDot } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import Aside from "../Parts/Aside/Aside";
import { useSearchParams } from "react-router-dom";
import useGetData from "../../Hooks/FetchGetDataHook";
import LoadingBar from "react-top-loading-bar";
import { Dot, Eye, Mail, Trash } from "lucide-react";

const Company = () => {
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
      console.log(response);
    }

    fetchData();
  }, [searchParams]);

  const handleParams = (e) => {
    e.preventDefault();

    const email = emailField?.trim();
    const name = nameField?.trim();

    updateParams({ email, name });
  };

  const handleName = (e) => {
    setNameField(e.target.value);
  };

  const handleEmail = (e) => {
    setEmailField(e.target.value);
  };

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
        <section className="px-5 md:px-10 pt-10 w-full overflow-x-scroll overflow-y-scroll">
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

          {/* Searching functionality */}
          <div className="my-10 ">
            <div className="flex gap-3 my-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Company Name</label>
                <input
                  type="search"
                  name="name"
                  id="search"
                  className="outline rounded-md px-3 py-1"
                  onChange={handleName}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Company Email</label>
                <input
                  type="search"
                  name="email"
                  id="search"
                  className="outline rounded-md px-3 py-1"
                  onChange={handleEmail}
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleParams}
                className="px-4 py-1 transform hover:scale-105 active:scale-90 bg-purple-800 text-white rounded-md hover:bg-purple-800 cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          {/* Show Data  */}

          <div className="hidden md:block overflow-auto mt-10 border-l-2 border-r-2 border-purple-800 rounded-md">
            <table className="table-auto rounded-md shadow border-collapse">
              <thead>
                <tr className="bg-gradient-to-tr from-purple-600 to-purple-800 text-white">
                  <th className="mx-4 my-1 py-1 px-2 border-r-2 border-white">
                    Id
                  </th>
                  <th className="mx-4 my-1 py-1 px-2 border-2 border-white">
                    Company Logo
                  </th>
                  <th className="mx-4 my-1 py-1 px-2 border-2 border-white">
                    Company Name
                  </th>
                  <th className="mx-4 my-1 py-1 px-2 border-2 border-white">
                    Company Email
                  </th>
                  <th className="mx-4 my-1 py-1 px-2 border-2 border-white">
                    Company PhoneNumber
                  </th>
                  <th className="mx-4 my-1 py-1 px-2 border-2 border-white">
                    Description
                  </th>
                  <th className="mx-4 my-1 py-1 px-2 border-2 border-white">
                    Address
                  </th>
                  <th className="mx-4 my-1 py-1 px-2 border-2 border-white">
                    Websites
                  </th>
                  <th className="mx-4 my-1 py-1 px-2 border-2 border-white">
                    IsClaimed
                  </th>
                  <th className="mx-4 my-1 py-1 px-2 border-2 border-white">
                    createdBy
                  </th>
                  <th className="mx-4 my-1 py-1 px-2 border-r-2 border-white">
                    CompanyVerification
                  </th>
                  <th className="mx-4 my-1 py-1 px-2">Actions</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {companyData &&
                  companyData.map((company) => (
                    <tr key={company._id} className="text-center">
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

                      <td className="px-2 py-2 flex flex-row flex-wrap gap-2  border-b-2 border-purple-800">
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
                        <span>View Details</span>
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
        </section>
      </main>
    </>
  );
};

export default Company;
