import React, { useEffect, useMemo, useState } from "react";
import Aside from "../Parts/Aside/Aside";
import { Menu, Search, SearchX, SortAsc, SortDescIcon } from "lucide-react";
import InputFields from "../Parts/Admin/InputFields";
import SearchMenu from "../Parts/Admin/Search";
import useGetData from "../../Hooks/FetchGetDataHook";
import LoadingBar from "react-top-loading-bar";
import { useSearchParams } from "react-router-dom";
import SortMenu from "../Parts/Admin/SortMenu";
import {
  CancelSearchBtn,
  SearchBtn,
  SortBtn,
} from "../Parts/Admin/SearchingBtns";

const Contacts = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [contactData, setContactData] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalDocs, setTotalDocs] = useState(0);

  const [firstNameField, setFirstName] = useState("");
  const [lastNameField, setLastName] = useState("");
  const [emailField, setEmail] = useState("");
  const [messageField, setMessage] = useState("");
  const [statusField, setStatus] = useState("");
  const [sortField, setSortField] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const [getData, getLoading, getMessage, getError, progress] = useGetData();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  //
  const firstName = searchParams.get("firstName") || undefined;
  const lastName = searchParams.get("lastName") || undefined;
  const email = searchParams.get("email") || undefined;
  const message = searchParams.get("message") || undefined;
  const status = searchParams.get("status") || undefined;
  const sort = searchParams.get("sort") || "new";
  const page = Number(searchParams.get("page")) || 1;

  // build base url
  function buildBaseUrl() {
    const params = new URLSearchParams();

    if (firstName) params.set("firstName", firstName);
    if (lastName) params.set("lastName", lastName);
    if (email) params.set("email", email);
    if (message) params.set("message", message);
    if (status) params.set("status", status);
    if (page) params.set("page", page);
    if (sort) params.set("sort", sort);

    return `${baseUrl}api/contacts?${params.toString()}`;
  }

  // for fetching Data
  useEffect(() => {
    async function fetchData() {
      const response = await getData(buildBaseUrl(), {
        withCredentials: true,
      });

      setContactData(response.data.contacts);
      setCurrentPage(response.data.currentPage);
      setTotalDocs(response.data.totalDocs);
      setNumOfPages(response.data.numOfPages);
    }

    fetchData();
  }, [searchParams]);

  const updateParams = (params) => {
    const currentParams = new URLSearchParams(searchParams);

    Object.keys(params).map((key) => {
      if (params[key]) currentParams.set(key, params[key]);
      else currentParams.delete(key);
    });

    if (!params.hasOwnProperty("page")) {
      currentParams.set("page", 1);
    }

    if (!params.hasOwnProperty("sort")) {
      currentParams.set("sort", "new");
    }

    setSearchParams(currentParams);
  };

  const handleParams = (e) => {
    e.preventDefault();

    const firstName = firstNameField.trim();
    const lastName = lastNameField.trim();
    const email = emailField.trim();
    const message = messageField.trim();
    const sort = sortField.trim();

    updateParams({ firstName, lastName, email, message, sort });
  };

  const hanldeAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const handleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSort = () => {
    setSortOpen(!sortOpen);
  };

  const handleSearchCancel = () => {
    setSearchOpen(false);
  };

  // HANDLE INPUT FIELDS
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleSorting = (sortOption) => {
    setSortField(sortOption);

    updateParams({
      firstName,
      lastName,
      email,
      message,
      sort: sortOption,
    });
  };

  const handlePageChange = (newPage) => {
    updateParams({
      firstName,
      lastName,
      email,
      message,
      sort,
      page: newPage,
    });
  };

  const cancelSearch = () => {
    updateParams({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  const pageButtons = useMemo(() => {
    const buttons = [];
    const start = Math.max(1, currentPage - 2);

    for (let i = 0; i < numOfPages; i++) {
      const page = start + i;
      if (page > numOfPages) break;
      buttons.push(page);
    }

    return buttons;
  }, [currentPage, numOfPages]);

  return (
    <>
      <LoadingBar color="#8b5cf6" progress={progress} />
      <main className="flex gap-2 font-poppins">
        <Aside
          isAsideOpen={isAsideOpen}
          onclose={() => setIsAsideOpen(false)}
        />
        <section className="px-3 md:px-10 w-full min-h-screen md:h-screen md:overflow-y-scroll">
          <div className="mt-5 mb-10">
            <button className="block md:hidden">
              <Menu onClick={hanldeAside} />
            </button>
          </div>

          <div className="mt-5">
            <h3 className="text-2xl font-medium text-slate-800">
              Total <span className="font-medium">{totalDocs}</span> Contacts
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Total <span className="font-medium">{numOfPages}</span> Pages
            </p>
            <p className="text-sm text-gray-500">
              Current <span className="font-medium">{currentPage}</span> Page
            </p>
          </div>

          {/* searching section */}
          <div className="my-10">
            <div className="flex gap-4 flex-wrap">
              <SearchBtn handleSearch={handleSearch} searchOpen={searchOpen} />
              <CancelSearchBtn cancelSearch={cancelSearch} />
              <SortBtn handleSort={handleSort} sortOpen={sortOpen} />
            </div>

            {searchOpen && (
              <SearchMenu
                title={"Search"}
                onSubmit={handleParams}
                onCancel={handleSearchCancel}
              >
                <InputFields
                  labelId={"firstName"}
                  labelName={"First Name"}
                  inputId={"firstName"}
                  inputName={"firstName"}
                  onChange={handleFirstName}
                />
                <InputFields
                  labelId={"lastName"}
                  labelName={"Last Name"}
                  inputId={"lastName"}
                  inputName={"lastName"}
                  onChange={handleLastName}
                />
                <InputFields
                  labelId={"email"}
                  labelName={"Email"}
                  inputId={"email"}
                  inputName={"email"}
                  onChange={handleEmail}
                />

                <div className="flex flex-col gap-3">
                  <p id="status">Select Status </p>
                  <select
                    name="status"
                    id="status"
                    onChange={handleStatus}
                    className="rounded-md shadow bg-gray-100 text-gray-500 px-4 py-2 focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <InputFields
                  labelId={"message"}
                  labelName={"Message"}
                  inputId={"message"}
                  inputName={"message"}
                  onChange={handleMessage}
                />
              </SearchMenu>
            )}

            {sortOpen && (
              <SortMenu sortField={sortField} handleSorting={handleSorting} />
            )}
          </div>

          {/* Tables */}
          <div className="my-10 overflow-x-scroll rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                  <th className="py-5 px-2 font-medium">Id</th>
                  <th className="py-5 px-2 font-medium">First Name</th>
                  <th className="py-5 px-2 font-medium">Last Name</th>
                  <th className="py-5 px-2 font-medium">Email</th>
                  <th className="py-5 px-2 font-medium">Message</th>
                  <th className="py-5 px-2 font-medium">createdAt</th>
                  <th className="py-5 px-2 font-medium">updatedAt</th>
                  <th className="py-5 px-2 font-medium">status</th>
                  <th className="py-5 px-2 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {contactData &&
                  contactData.map((contact, index) => (
                    <tr
                      key={contact._id}
                      className={`text-center ${
                        index % 2 == 0 ? "bg-purple-100" : "bg-purple-300"
                      }`}
                    >
                      <td className="py-2 px-4">
                        {contact._id.slice(0, 13)}
                        {"..."}
                      </td>
                      <td className="py-2 px-4">{contact.firstName}</td>
                      <td className="py-2 px-4">{contact.lastName}</td>
                      <td className="py-2 px-4">
                        {contact.email.slice(0, 15)}
                        {"..."}
                      </td>
                      <td className="py-2 px-4">
                        {contact.message.slice(0, 20)}
                      </td>
                      <td className="py-2 px-4">
                        {contact.createdAt.split("T")[0]}
                      </td>
                      <td className="py-2 px-4">
                        {contact.updatedAt.split("T")[0]}
                      </td>
                      <td className={`py-2 px-4 `}>
                        <span
                          className={`px-4 py-1 rounded-md ${
                            contact.status === "pending"
                              ? "bg-gray-700 text-white"
                              : "bg-green-700 text-white"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex flex-col gap-1">
                        <button className="bg-green-800 text-white px-4 py-1 rounded-md hover:bg-green-900 transition transform active:scale-95 hover:scale-105 duration-100 ease-in cursor-pointer">
                          View
                        </button>
                        <button className="bg-red-800 text-white px-4 py-1 rounded-md hover:bg-red-900 transition transform active:scale-95 hover:scale-105 duration-100 ease-in cursor-pointer">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="my-10 text-sm block md:hidden">
            {contactData &&
              contactData.map((contact) => (
                <div
                  key={contact._id}
                  className="my-15 shadow rounded-md  px-4 py-2 border-b-4 border-purple-800"
                >
                  {/* Show Basic Details */}
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xl rounded-full size-10 flex items-center justify-center bg-purple-800 text-white">
                        {contact.firstName.slice(0, 1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-700">{contact.firstName}</p>
                      <p className="text-slate-700">{contact.lastName}</p>
                      <p className="text-slate-700">{contact.email}</p>
                    </div>
                  </div>

                  {/* Show status */}
                  <div className="my-5 px-3">
                    <span
                      className={`px-4 py-1  rounded-md ${
                        contact.status === "pending"
                          ? "bg-gray-700 text-white"
                          : "bg-green-700 text-white"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </div>

                  {/* Show messages */}
                  <div className="px-3 py-1 mt-4 shadow rounded-md ">
                    <p>
                      {contact.message.slice(0, 100)}
                      {"..."}
                    </p>
                  </div>

                  {/* Show Dates */}
                  <div className="px-3 py-3 my-4 rounded-md shadow">
                    <span className="bg-sky-700 text-white px-4 py-1 rounded-md">
                      {contact.createdAt.split("T")[0]}
                    </span>
                    <span className="bg-sky-700 text-white mx-5 px-4 py-1 rounded-md">
                      {contact.createdAt.split("T")[0]}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-4 mt-10 mb-5">
                    <button className="bg-green-700 hover:bg-green-900 text-white py-2 rounded-md transition transform active:scale-95">
                      View
                    </button>
                    <button className="bg-red-700 hover:bg-red-900 text-white py-2 rounded-md transition transform active:scale-95">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Page Number */}
          {numOfPages > 1 && (
            <div className="flex justify-evenly mb-10">
              <div>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="rounded-md bg-gray-100 hover:bg-gray-300 text-slate-800 px-4 py-2 cursor-pointer transition transform active:scale-95 hover:scale-103"
                >
                  Previous
                </button>
              </div>
              <div className="flex gap-4">
                {pageButtons &&
                  pageButtons.map((btn) => (
                    <button
                      key={btn}
                      onClick={() => handlePageChange(btn)}
                      className={`size-10   rounded-full  cursor-pointer ${
                        btn === currentPage
                          ? "bg-gray-300 text-slate-800"
                          : "bg-purple-600 text-white"
                      }`}
                    >
                      {btn}
                    </button>
                  ))}
              </div>
              <div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="rounded-md bg-gray-100 hover:bg-gray-300 text-slate-800 px-4 py-2 cursor-pointer transition transform active:scale-95 hover:scale-103"
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

export default Contacts;
