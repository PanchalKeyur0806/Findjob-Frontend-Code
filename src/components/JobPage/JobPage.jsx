import React, { useEffect, useState } from "react";
import { IndianRupee, MapPin, SquarePlus, Timer, Users } from "lucide-react";
import useGetData from "../../Hooks/FetchGetDataHook";
import { useNavigate, useSearchParams } from "react-router-dom";

const JobPage = () => {
  const [data, setData] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [getData, getLoading, getMessage, getError] = useGetData();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current filter values from URL
  const search = searchParams.get("search") || "";
  const employeeType = searchParams.get("employeeType") || "all";
  const sort = searchParams.get("sort") || "newest";
  const page = parseInt(searchParams.get("page")) || 1;

  // Local state for form inputs
  const [searchInput, setSearchInput] = useState(search);
  const [locationInput, setLocationInput] = useState("");
  const [selectedEmployeeType, setSelectedEmployeeType] =
    useState(employeeType);
  const [selectedSort, setSelectedSort] = useState(sort);

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/api/jobs"
    : import.meta.env.VITE_BACKEND_URL + "api/jobs";

  // Build URL with current search parameters
  const buildApiUrl = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (employeeType && employeeType !== "all")
      params.set("employeeType", employeeType);
    if (sort) params.set("sort", sort);
    params.set("page", page.toString());

    return `${baseUrl}?${params.toString()}`;
  };

  // Update URL search parameters
  const updateSearchParams = (newParams) => {
    const currentParams = new URLSearchParams(searchParams);

    Object.keys(newParams).forEach((key) => {
      if (newParams[key] && newParams[key] !== "all") {
        currentParams.set(key, newParams[key]);
      } else {
        currentParams.delete(key);
      }
    });

    // Reset to page 1 when filters change (except when only page changes)
    if (!newParams.hasOwnProperty("page")) {
      currentParams.set("page", "1");
    }

    setSearchParams(currentParams);
  };

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getData(buildApiUrl(), {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response?.data) {
          setData(response.data.jobs);
          setTotalJobs(response.data.totalJobs);
          setNumOfPages(response.data.numOgPages);
          setCurrentPage(response.data.currentPage);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [searchParams]); // Re-fetch when search params change

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = searchInput.trim() || locationInput.trim();
    updateSearchParams({
      search: searchValue,
      employeeType: selectedEmployeeType,
      sort: selectedSort,
    });
  };

  // Handle employee type filter change
  const handleEmployeeTypeChange = (type) => {
    setSelectedEmployeeType(type);
    updateSearchParams({
      search,
      employeeType: type,
      sort: selectedSort,
    });
  };

  // Handle sort change
  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    updateSearchParams({
      search,
      employeeType: selectedEmployeeType,
      sort: sortOption,
    });
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    updateSearchParams({
      search,
      employeeType: selectedEmployeeType,
      sort: selectedSort,
      page: newPage,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchInput("");
    setLocationInput("");
    setSelectedEmployeeType("all");
    setSelectedSort("newest");
    setSearchParams(new URLSearchParams());
  };

  // Open job details
  const openJobDetails = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  if (getLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-3xl font-poppins">Loading.....</h1>
      </div>
    );
  }

  return (
    <main>
      <section className="font-poppins">
        {/* Heading section */}
        <div className="mb-10 h-50 bg-black font-bold font-mono text-white flex justify-center items-center">
          <h1 className="text-4xl">Jobs</h1>
        </div>

        <div className="max-w-[1300px] w-[95%] mx-auto md:flex gap-5">
          <aside className=" md:w-1/4 bg-white shadow rounded-2xl p-4 md:sticky top-5 md:h-fit mb-4">
            <form onSubmit={handleSearch}>
              {/* Search by Job Title */}
              <div className="flex flex-col justify-center mb-4">
                <h1 className="my-1 font-medium">Search By Job Title</h1>
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search your Jobs"
                  className="px-3 py-2 shadow focus:outline-none rounded bg-white"
                />
              </div>

              {/* Search by Location */}
              <div className="flex flex-col justify-center mb-4">
                <h1 className="my-1 font-medium">Location</h1>
                <input
                  type="search"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter your location"
                  className="px-3 py-2 shadow focus:outline-none rounded bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-800 text-white px-5 py-2 rounded mb-4 hover:bg-purple-900 transition duration-200"
              >
                Search
              </button>
            </form>

            {/* Employee Type Filter */}
            <div className="mb-4 mt-7">
              <h1 className="my-1 font-medium">Employee Type</h1>
              <div className="space-y-2">
                {["all", "fulltime", "parttime", "contract", "internship"].map(
                  (type) => (
                    <div key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="employeeType"
                        id={type}
                        checked={selectedEmployeeType === type}
                        onChange={() => handleEmployeeTypeChange(type)}
                      />
                      <label
                        htmlFor={type}
                        className="cursor-pointer capitalize"
                      >
                        {type === "all" ? "All Types" : type.replace("-", " ")}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Sorting Options */}
            <div className="mb-4 mt-7">
              <h1 className="my-1 font-medium">Sort By</h1>
              <div className="space-y-2">
                {[
                  { value: "newest", label: "Newest First" },
                  { value: "price", label: "Highest Salary" },
                ].map((sortOption) => (
                  <div
                    key={sortOption.value}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="sort"
                      id={sortOption.value}
                      checked={selectedSort === sortOption.value}
                      onChange={() => handleSortChange(sortOption.value)}
                    />
                    <label
                      htmlFor={sortOption.value}
                      className="cursor-pointer"
                    >
                      {sortOption.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="w-full  bg-gray-600 text-white mt-7 cursor-pointer px-5 py-2 rounded hover:bg-gray-700 transition duration-200"
            >
              Clear Filters
            </button>
          </aside>

          <section className="w-[95%] md:w-3/4 mx-auto ">
            {getError && (
              <div className="px-5 py-2 my-3 bg-red-700 text-white rounded-lg">
                <p>{getError}</p>
              </div>
            )}

            {/* Results Info */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-slate-700">
                Showing {data?.length || 0} results of {totalJobs} total jobs
                {search && <span className="font-medium"> for "{search}"</span>}
              </p>
              <p className="text-sm text-slate-700">
                Page {currentPage} of {numOfPages}
              </p>
            </div>

            {/* Active Filters Display */}
            {(search || employeeType !== "all") && (
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {search && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    Search: {search}
                  </span>
                )}
                {employeeType !== "all" && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm capitalize">
                    Type: {employeeType.replace("-", " ")}
                  </span>
                )}
              </div>
            )}

            {/* Job Listings */}
            <div>
              {data?.length > 0 ? (
                data.map((job) => (
                  <div
                    key={job._id}
                    className="mx-3 my-10 px-3 py-2 shadow rounded-lg border-b-4 border-purple-800"
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
                            className="px-3 py-2 mt-5 sm:mt-0 bg-purple-800 text-sm text-white rounded-lg cursor-pointer hover:bg-purple-950 transition duration-200 ease-in-out"
                            onClick={() => openJobDetails(job._id)}
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
                    onClick={clearFilters}
                    className="mt-4 bg-purple-800 text-white px-5 py-2 rounded hover:bg-purple-900 transition duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {numOfPages >= 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 mb-4">
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
          </section>
        </div>
      </section>
    </main>
  );
};

export default JobPage;
