import React, { useEffect, useMemo, useState } from "react";
import Aside from "../Parts/Aside/Aside";
import {
  ArrowDownWideNarrow,
  Menu,
  PhoneCall,
  Search,
  SearchX,
  User,
} from "lucide-react";
import useGetData from "../../Hooks/FetchGetDataHook";
import { useSearchParams } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { MdEmail } from "react-icons/md";
import SearchMenu from "../Parts/Admin/Search";
import InputFields from "../Parts/Admin/InputFields";
import SortMenu from "../Parts/Admin/SortMenu";
import {
  CancelSearchBtn,
  SearchBtn,
  SortBtn,
} from "../Parts/Admin/SearchingBtns";

const Claims = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [claimsData, setClaimsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numOfpages, setNumOfPages] = useState(0);
  const [totalDocs, setTotalDocs] = useState(0);

  const [userNameField, setUserNameField] = useState("");
  const [userEmailField, setUserEmailField] = useState("");
  const [companyNameField, setCompanyNameField] = useState("");
  const [sortField, setSortField] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [getData, getLoading, getMessage, getError, progress, setProgress] =
    useGetData();

  const userName = searchParams.get("userName") || undefined;
  const email = searchParams.get("email") || undefined;
  const companyName = searchParams.get("companyName") || undefined;
  const sort = searchParams.get("sort") || "new";
  const page = Number(searchParams.get("page")) || 1;

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  // function for bulding query params
  const buildBaseUrl = () => {
    const params = new URLSearchParams();

    if (userName) params.set("userName", userName);
    if (email) params.set("email", email);
    if (companyName) params.set("companyName", companyName);
    if (page) params.set("page", page);
    if (sort) params.set("sort", sort);

    return `${baseUrl}api/claims?${params.toString()}`;
  };

  // function for updating params
  const updateParams = (params) => {
    const currentParams = new URLSearchParams(params);

    Object.keys(params).map((key) => {
      if (params[key]) currentParams.set(key, params[key]);
      else {
        currentParams.delete(key);
      }
    });

    if (!params.hasOwnProperty("page")) currentParams.set("page", 1);
    if (!params.hasOwnProperty("sort")) currentParams.set("sort", "new");

    setSearchParams(currentParams);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getData(buildBaseUrl(), {
        withCredentials: true,
      });

      setClaimsData(response.data.claims);
      setCurrentPage(response.data.currentPage);
      setNumOfPages(response.data.numOfPages);
      setTotalDocs(response.data.totalClaims);
    }

    fetchData();
  }, [searchParams]);

  const handleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const handleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSort = () => {
    setSortOpen(!sortOpen);
  };

  const handleResetSearch = () => {
    updateParams({
      userName: "",
      email: "",
      companyName: "",
      page: "1",
      sort: sortField,
    });
  };

  const handleSorting = (sortOption) => {
    setSortField(sortOption);
    updateParams({
      userName,
      email,
      companyName,
      sort: sortOption,
    });
  };

  const handlePageChange = (pageNumber) => {
    updateParams({
      userName,
      email,
      companyName,
      sort,
      page: pageNumber,
    });
  };

  const handleParams = () => {
    const userName = userNameField.trim() || "";
    const email = userEmailField.trim() || "";
    const companyName = companyNameField.trim() || "";
    const sort = sortField;

    updateParams({ userName, email, companyName, sort });
  };

  const handleUserName = (e) => {
    setUserNameField(e.target.value);
  };
  const handleUserEmail = (e) => {
    setUserEmailField(e.target.value);
  };
  const handleCompanyName = (e) => {
    setCompanyNameField(e.target.value);
  };

  const pageButtons = useMemo(() => {
    const buttons = [];
    const start = Math.max(1, currentPage - 2);

    for (let i = 0; i < numOfpages; i++) {
      const page = start + i;
      if (page > numOfpages) break;
      buttons.push(page);
    }

    return buttons;
  }, [currentPage, numOfpages]);

  function getColor(field) {
    switch (field) {
      case "pending":
        return "bg-gray-700 text-white px-4 py-2 rounded-md";
      case "approved":
        return "bg-green-700 text-white px-4 py-2 rounded-md";
      case "rejected":
        return "bg-red-700 text-white px-4 py-2 rounded-md";
      case "date":
        return "bg-blue-700 text-white px-4 py-2 rounded-md";
      default:
        return;
    }
  }

  return (
    <>
      <LoadingBar color="#8b5cf6" progress={progress} />
      <main className="flex font-poppins">
        <Aside
          isAsideOpen={isAsideOpen}
          onclose={() => setIsAsideOpen(false)}
        />

        <section className="px-3 md:px-10 h-screen overflow-y-scroll">
          <div className="md:hidden block my-10">
            <Menu onClick={handleAside} />
          </div>

          {/* Heading Section */}
          <div className="mt-10">
            <h1 className="text-2xl text-slate-800 font-medium">
              Claims Management
            </h1>
            <p className="text-sm text-gray-600">
              Total{" "}
              <span className="text-gray-900 font-medium">{totalDocs}</span>{" "}
              Claims Found
            </p>
            <p className="text-sm text-gray-600">
              Total{" "}
              <span className="text-gray-900 font-medium">{numOfpages}</span>{" "}
              pages
            </p>
            <p className="text-sm text-gray-600">
              Current{" "}
              <span className="text-gray-900 font-medium">{currentPage}</span>{" "}
              page
            </p>
          </div>

          {/* Searching */}
          <div>
            {/* Searching Buttons */}

            <div className="flex gap-3 flex-wrap mt-10">
              <SearchBtn handleSearch={handleSearch} searchOpen={searchOpen} />
              <CancelSearchBtn cancelSearch={handleResetSearch} />
              <SortBtn handleSort={handleSort} sortOpen={sortOpen} />
            </div>

            {/*  */}
            {searchOpen === true && (
              <SearchMenu
                title={"Search"}
                onSubmit={handleParams}
                onCancel={() => setSearchOpen(false)}
              >
                <InputFields
                  labelId={"userName"}
                  labelName={"Search By Username"}
                  inputId={"userName"}
                  inputName={"userName"}
                  onChange={handleUserName}
                />
                <InputFields
                  labelId={"email"}
                  labelName={"Search By email"}
                  inputId={"email"}
                  inputName={"email"}
                  onChange={handleUserEmail}
                />
                <InputFields
                  labelId={"companyName"}
                  labelName={"Search By Company Name"}
                  inputId={"companyName"}
                  inputName={"companyName"}
                  onChange={handleCompanyName}
                />
              </SearchMenu>
            )}

            {sortOpen === true && (
              <SortMenu sortField={sortField} handleSorting={handleSorting} />
            )}
          </div>

          <div className="mt-10 hidden md:block">
            <div className="overflow-auto rounded-lg">
              <table className="text-sm table-auto w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-700 to-purple-800 text-white">
                    <th className="px-5 py-2 font-semibold">_id</th>
                    <th className="px-5 py-2 font-semibold">User Name</th>
                    <th className="px-5 py-2 font-semibold">User Email</th>
                    <th className="px-5 py-2 font-semibold">
                      User PhoneNumber
                    </th>
                    <th className="px-5 py-2 font-semibold">Company Name</th>
                    <th className="px-5 py-2 font-semibold">Company Email</th>
                    <th className="px-5 py-2 font-semibold">
                      Company PhoneNumber
                    </th>
                    <th className="px-5 py-2 font-semibold">Message</th>
                    <th className="px-5 py-2 font-semibold">Status</th>
                    <th className="px-5 py-2 font-semibold">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {claimsData &&
                    claimsData.map((claim, index) => (
                      <tr
                        key={claim._id}
                        className={`${
                          index % 2 === 0 ? "bg-purple-100" : "bg-purple-200"
                        }`}
                      >
                        <td className="px-4 my-1 border-b-2 border-purple-800">
                          {claim._id.slice(0, 7)}
                          {"..."}
                        </td>
                        <td className="px-4 my-1 border-b-2 border-purple-800">
                          {claim.user.name.slice(0, 7)}
                          {"..."}
                        </td>
                        <td className="px-4 my-1 border-b-2 border-purple-800">
                          {claim.user.email.slice(0, 15)}
                          {"..."}
                        </td>
                        <td className="px-4 my-1 border-b-2 border-purple-800">
                          {claim.user.phoneNumber}
                        </td>
                        <td className="px-4 my-1 border-b-2 border-purple-800">
                          {claim.company.companyName.slice(0, 6)}
                          {"..."}
                        </td>
                        <td className="px-4 my-1 border-b-2 border-purple-800">
                          {claim.company.email.slice(0, 15)}
                          {"..."}
                        </td>
                        <td className="px-4 my-1 border-b-2 border-purple-800">
                          {claim.company.phoneNumber}
                        </td>
                        <td className="px-4 my-1 border-b-2 border-purple-800">
                          {claim.message.slice(0, 10)}
                          {"..."}
                        </td>
                        <td className="px-4 my-1 border-b-2 border-purple-800">
                          {claim.status}
                        </td>
                        <td className="px-4 my-1 border-b-2 border-purple-800">
                          {claim.createdAt.split("T")[0]}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data For Mobile Devices */}
          <div className="my-10 block md:hidden text-sm">
            {claimsData &&
              claimsData.map((claim) => (
                <div
                  key={claim._id}
                  className="my-15 px-3 py-2 shadow rounded-md"
                >
                  {/* Company Info */}
                  <div className="flex items-center gap-5">
                    <div>
                      <img
                        src={claim.company.companyLogo}
                        alt="Company Logo"
                        className="size-20 rounded-lg"
                      />
                    </div>
                    <div>
                      <h1>{claim.company.companyName}</h1>
                      <h1>{claim.company.email}</h1>
                      <h1>{claim.company.phoneNumber}</h1>
                    </div>
                  </div>

                  <div className="mt-5 px-3 py-2 shadow rounded-md flex items-center gap-3">
                    <p className={`${getColor(claim.status)}`}>
                      {claim.status}
                    </p>
                    <p className={`${getColor("date")}`}>
                      {claim.createdAt.split("T")[0]}
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="mt-5 shadow rounded-md px-3 py-2">
                    <h1 className="font-semibold">Created By</h1>
                    <p className="flex items-center gap-2 mt-2">
                      <span>
                        <User size={14} />
                      </span>
                      <span>{claim.user.name}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>
                        <MdEmail className="text-sm" />
                      </span>
                      <span>{claim.user.email}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>
                        <PhoneCall size={14} />
                      </span>
                      <span>{claim.user.phoneNumber}</span>
                    </p>
                  </div>

                  {/* Message section */}
                  <div className="mt-5 shadow rounded-md px-3 py-2">
                    <h1 className="font-semibold">Message</h1>
                    <p className="mt-2">{claim.message}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5 mb-2">
                    <button className="bg-green-700 text-white py-2 rounded-md shadow transform active:scale-95 transition duration-100 ease-in-out">
                      Accept
                    </button>
                    <button className="bg-red-700 text-white py-2 rounded-md shadow transform active:scale-95 transition duration-100 ease-in-out">
                      Rejected
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Rendering Buttons */}
          {numOfpages > 1 && (
            <div className="flex justify-evenly items-center mt-10 mb-5">
              <div>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-300 cursor-pointer transition transform duration-100 ease-in-out hover:scale-103 active:scale-98"
                >
                  Previous
                </button>
              </div>

              <div>
                {pageButtons &&
                  pageButtons.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 mx-1 rounded-full shadow cursor-pointer ${
                        pageNumber === currentPage
                          ? "bg-white text-slate-800"
                          : "bg-purple-800 text-white"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
              </div>

              <div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-300 cursor-pointer transition transform duration-100 ease-in-out hover:scale-103 active:scale-98"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Claims;
