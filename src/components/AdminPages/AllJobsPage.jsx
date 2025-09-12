import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import useGetData from "../../Hooks/FetchGetDataHook";
import {
  IndianRupee,
  MapPin,
  Menu,
  SquarePlus,
  Timer,
  Users,
} from "lucide-react";
import Aside from "../Parts/Aside/Aside";

const AllJobsPage = () => {
  // const socket = useMemo(
  //   () =>
  //     io("http://localhost:7000", {
  //       withCredentials: true,
  //     }),
  //   []
  // );

  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [jobData, setJobData] = useState(null);
  const [newCreatedJob, setNewCreatedJob] = useState(null);
  const [searchField, setSearchField] = useState(null);
  const [locationField, setLocationField] = useState(null);
  const [employeeType, setEmployeeType] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalJobs, setTotalJobs] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [getData, getLoading, getMessage, getError] = useGetData();

  const navigate = useNavigate();

  const search = searchParams.get("search") || "";
  const employee = searchParams.get("employeeType") || "";
  const page = Number(searchParams.get("page") || "1");

  const isDevelopment = import.meta.env.VITE_REACT_ENV;
  const baseUrl = isDevelopment
    ? "http://localhost:7000/api/jobs"
    : import.meta.env.VITE_BACKEND_URL;

  // Build the base url with params
  function buildBaseUrl() {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (employee && employee !== "all")
      params.set("employeeType", employeeType);
    if (page) params.set("page", page);

    return `${baseUrl}?${params.toString()}`;
  }

  // Update the params
  const updateParams = (params) => {
    const currentParams = new URLSearchParams(searchParams);

    Object.keys(params).map((key) => {
      if (params[key] && params[key] !== "all") {
        currentParams.set(key, params[key]);
      } else {
        currentParams.delete(key);
      }
    });

    // Reset to page 1 when filters change (except when only page changes)
    if (!params.hasOwnProperty("page")) {
      currentParams.set("page", "1");
    }

    setSearchParams(currentParams);
  };

  // handle params
  const handleParams = (e) => {
    e.preventDefault();

    const serachValue = searchField?.trim() || locationField?.trim();
    updateParams({
      search: serachValue,
      employeeType: employeeType,
    });
  };

  //   use effect hook
  useEffect(() => {
    let socket = io("http://localhost:7000", {
      withCredentials: true,
    });

    // Admin conencted Event
    socket.on("connect", () => {
      socket.emit("admin_connected", "admin connected successfully");
    });
    // listing  on created job
    socket.on("job_created", (data) => {
      setNewCreatedJob(data);
    });

    // Admin disconnected Event

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getData(buildBaseUrl(), {
        withCredentials: true,
      });

      if (response?.data) {
        setJobData(response.data.jobs);
        setTotalJobs(response.data.totalJobs);
        setNumOfPages(response.data.numOgPages);
        setCurrentPage(response.data.currentPage);
      }
    }

    fetchData();
  }, [searchParams]);

  // Go to view jobs page
  const gotoJobDetails = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const handlePageChange = (newPage) => {
    updateParams({
      search,
      employeeType: employeeType,
      page: newPage,
    });
  };

  const hanldeAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  // functions for input handling
  const handleSearch = (e) => {
    setSearchField(e.target.value);
  };

  const handleLocation = (e) => {
    setLocationField(e.target.value);
  };

  const handleEmployeeType = (e) => {
    setEmployeeType(e.target.value);
  };

  return (
    <>
      <section className="flex flex-row">
        <Aside />
        <div className="h-screen w-full md:w-3/4 font-poppins  overflow-y-scroll">
          {newCreatedJob &&
            setTimeout(() => {
              <div className=" px-5 py-2 font-medium">
                <p>{newCreatedJob}</p>
              </div>;
            }, 1000)}

          {/* menu for sidebar */}
          <div className="block md:hidden w-[95%] mx-auto px-7 mt-5">
            <Menu onClick={hanldeAside} />
          </div>

          {/* searching functionality */}
          <div
            id="JobSearchBar"
            className="max-w-[1200px] w-[95%] mx-auto px-7 pt-5 md:flex justify-center block"
          >
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="search">Search</label>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    onChange={handleSearch}
                    className="px-3 py-2 outline  rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    onChange={handleLocation}
                    className="px-3 py-2 outline  rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="employeeType">Employee Type </label>
                  <select
                    name="employeeType"
                    onChange={handleEmployeeType}
                    id="employeeType"
                    className="flex flex-col gap-2  border mt-2  px-3 py-2 rounded"
                  >
                    <option value="all">all</option>
                    <option value="fulltime">Full Time</option>
                    <option value="parttime">Part Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  onClick={handleParams}
                  className="w-40  py-2 bg-purple-800 text-white rounded-md cursor-pointer font-medium hover:bg-purple-950 hover:font-semibold transition duration-300 ease-in-out"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* JOb section */}
          <div className="max-w-[1200px] w-[95%] mx-auto px-7 pt-10 ">
            {jobData?.length > 0 ? (
              jobData.map((job) => (
                <div
                  key={job._id}
                  className="mx-3 mt-5 px-3 py-2 shadow rounded-lg  border-b-4 border-b-purple-800 bg-white text-black"
                >
                  <div>
                    {/* Job Info and add to later menu */}
                    <div className="flex justify-between">
                      {/* Images and job title menu */}
                      <div className="flex gap-7">
                        <div>
                          <img
                            src={job.company?.companyLogo}
                            alt="Company Logo"
                            className="rounded-full size-15 object-cover"
                          />
                        </div>
                        <div>
                          <h1 className="mt-1 text-xl font-medium">
                            {job.title}
                          </h1>
                          <h3 className="mt-1 text-sm text-gray-600">
                            {job.company?.companyName}
                          </h3>
                        </div>
                      </div>

                      {/* Add to later menu */}
                      <div>
                        <h2 className="cursor-pointer text-purple-800 hover:text-purple-900">
                          <SquarePlus />
                        </h2>
                      </div>
                    </div>

                    {/* Job description */}
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="mt-4 flex flex-wrap gap-5">
                        <div className="flex items-center gap-1">
                          <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
                            <IndianRupee size={16} />
                          </p>
                          <p className="text-sm">₹{job.salary}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
                            <Timer size={16} />
                          </p>
                          <p className="text-sm capitalize">
                            {job.employeeType}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
                            <Users size={16} />
                          </p>
                          <p className="text-sm">
                            {job.numberOfOpenings} openings
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
                            <MapPin size={16} />
                          </p>
                          <p className="text-sm">{job.location}</p>
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={() => gotoJobDetails(job._id)}
                          className="px-3 py-2 mt-5 sm:mt-0 bg-purple-800 text-sm text-white rounded-lg cursor-pointer hover:bg-purple-950 transition duration-200 ease-in-out"
                          // onClick={() => openJobDetails(job._id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-gray-600">
                  No jobs found matching your criteria.
                </p>
                <button
                  // onClick={}
                  className="mt-4 bg-purple-800 text-white px-5 py-2 rounded hover:bg-purple-900 transition duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {numOfPages >= 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 pb-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {/* Page numbers */}
                <div className="flex gap-1">
                  {[...Array(Math.min(5, numOfPages))].map((_, index) => {
                    const pageNumber = Math.max(1, currentPage - 2) + index;
                    if (pageNumber > numOfPages) return null;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-2 rounded ${
                          currentPage === pageNumber
                            ? "bg-purple-800 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === numOfPages}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllJobsPage;
