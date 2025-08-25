import React, { useEffect, useState } from "react";
import { IndianRupee, MapPin, SquarePlus, Timer, Users, X } from "lucide-react";
import useGetData from "../../Hooks/FetchGetDataHook";
import { useNavigate } from "react-router-dom";

const JobPage = () => {
  const [data, setData] = useState(null);
  const [getData, getLoading, getMessage, getError] = useGetData();
  const navigate = useNavigate();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const url = isDevelopment
    ? "http://localhost:7000/api/jobs"
    : import.meta.env.VITE_BACKEND_URL + "api/jobs";

  useEffect(() => {
    async function fetchData() {
      const data = await getData(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setData(data?.data);
    }

    fetchData();
  }, []);

  // open job Details
  const openJobDetails = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  if (getLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-3xl font-poppins"> Loading.....</h1>
      </div>
    );
  }

  return (
    <main>
      <section className="font-poppins">
        {/* Heading section */}
        <div className="mb-10  h-50 bg-black font-bold font-mono text-white flex justify-center items-center">
          <h1 className="text-4xl">Jobs</h1>
        </div>

        <div className="max-w-[1300px] w-[95%] mx-auto flex gap-5">
          <aside className="hidden md:block md:w-1/4 bg-purple-200 rounded-2xl">
            {/* search by Job  */}
            <div className="px-4  flex flex-col justify-center">
              <h1 className="my-1 font-medium ">Search By Job Title</h1>
              <input
                type="search"
                name="q"
                id="q"
                placeholder="Seach your Jobs"
                className=" px-3 py-0.5 shadow focus:outline-none rounded bg-white"
              />
            </div>

            {/* search by location */}
            <div className="mt-4 px-4 flex flex-col justify-center">
              <h1 className="my-1 font-medium ">Location</h1>
              <input
                type="search"
                name="location"
                id="location"
                placeholder="Enter your location"
                className="px-3 py-0.5 shadow focus:outline-none rounded bg-white"
              />
            </div>

            {/* Filter */}
            <div className="mt-4 px-4 ">
              {/* Filter heading */}
              <h1 className="my-1 font-medium">Filter By</h1>

              {/* Filter options */}
              <div className="flex items-center gap-5 ">
                <input type="checkbox" name="salary" id="salary" />
                <label htmlFor="salary" className="cursor-pointer">
                  Salary
                </label>
              </div>

              <div className="flex items-center gap-5">
                <input type="checkbox" name="createdAt" id="createdAt" />
                <label htmlFor="createdAt" className="cursor-pointer">
                  Past 24hours
                </label>
              </div>
            </div>

            {/* Sorting  */}
            <div className="mt-4 px-4">
              <h1 className="my-3 font-medium">Sort By </h1>

              <div className="flex items-center gap-5">
                <input
                  type="checkbox"
                  name="salaryHightToLow"
                  id="salaryHighToLow"
                />
                <label htmlFor="salaryHighToLow" className="cursor-pointer">
                  Salary :- High to Low
                </label>
              </div>

              <div className="flex items-center gap-5">
                <input
                  type="checkbox"
                  name="salaryLowToHigh"
                  id="salaryLowToHigh"
                />
                <label htmlFor="salaryLowToHigh" className="cursor-pointer">
                  Salary :- Low to High
                </label>
              </div>

              <div className="flex items-center gap-5">
                <input
                  type="checkbox"
                  name="recentlyCreated"
                  id="recentlyCreated"
                />
                <label htmlFor="recentlyCreated" className="cursor-pointer">
                  Recenty created
                </label>
              </div>
            </div>

            {/* button */}
            <div className="mt-7 mb-5 px-4 pb-5">
              <button className="bg-purple-800 text-white px-5 py-0.5 rounded">
                Filter
              </button>
            </div>
          </aside>
          <section className="w-[95%] md:w-3/4 mx-auto">
            {getMessage && (
              <div className="px-5 py-2 my-3  bg-green-700 text-white rounded-lg">
                <p>{getMessage}</p>
              </div>
            )}
            {getError && (
              <div className="px-5 py-2 my-3  bg-red-700 text-white rounded-lg">
                <p>{getError}</p>
              </div>
            )}

            <div>
              <p className=" text-sm text-slate-700">
                showing Result {data?.length} - {data?.length} results
              </p>
            </div>

            {/* Job Listing */}
            <div>
              {data?.map((job) => (
                <div key={job._id} className="mx-3 my-5 px-3 py-2  shadow">
                  <div>
                    {/* Job Info and add to later menu */}
                    <div className="flex justify-between">
                      {/* images and job title menu */}
                      <div className="flex gap-7">
                        <div>
                          <img
                            src={job.company.companyLogo}
                            alt="Company Logo"
                            className="rounded-full size-15 object-cover"
                          />
                        </div>
                        <div>
                          <h1 className="mt-1 text-xl font-medium">
                            {job.title}
                          </h1>
                          <h3 className="mt-1 text-sm">{job.location}</h3>
                        </div>
                      </div>

                      {/* add to later meu */}
                      <div>
                        <h2 className="cursor-pointer text-purple-800">
                          <SquarePlus />
                        </h2>
                      </div>
                    </div>

                    {/* Job description */}
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="mt-4 flex flex-wrap gap-5">
                        <div className="flex items-center ">
                          <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
                            <IndianRupee size={16} />
                          </p>
                          <p>{job.salary}</p>
                        </div>
                        <div className="flex items-center ">
                          <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
                            <Timer size={16} />
                          </p>
                          <p>{job.employeeType}</p>
                        </div>
                        <div className="flex items-center ">
                          <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
                            <Users size={16} />
                          </p>
                          <p>{job.numberOfOpenings}</p>
                        </div>
                        <div className="flex items-center ">
                          <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
                            <MapPin size={16} />
                          </p>
                          <p>{job.location}</p>
                        </div>
                      </div>

                      <div>
                        <button
                          className="px-3 py-2 mt-5 sm:mt-0 bg-purple-800 text-sm text-white rounded-lg cursor-pointer hover:bg-purple-950 transition duration-200 ease-in-out "
                          onClick={() => openJobDetails(job._id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default JobPage;
