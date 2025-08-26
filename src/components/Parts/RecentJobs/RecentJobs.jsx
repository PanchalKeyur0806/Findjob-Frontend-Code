import React, { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import useGetData from "../../../Hooks/FetchGetDataHook";
import { IndianRupee, MapPin, SquarePlus, Timer, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentJobs = () => {
  const [data, setData] = useState(null);
  const [getData, getLoading, getMessage, getError] = useGetData();
  const navigate = useNavigate();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const url = isDevelopment
    ? "http://localhost:7000/api/jobs/latestjobs"
    : import.meta.env.VITE_BACKEND_URL + `api/jobs/latestjobs`;

  useEffect(() => {
    async function fetchLatestJobs(url) {
      const response = await getData(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = response.data;
      setData(data);
      console.log(data);
    }
    fetchLatestJobs(url);
  }, []);

  // handleNavigate
  const handleNavigate = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  if (getLoading) {
    return (
      <div className="h-[30vh] flex justify-center items-center text-4xl font-poppins font-medium">
        <h1>Loading ....</h1>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-[1000px] w-[95%] mx-auto">
        <div
          id="recent-jobHeading"
          className="mt-10 flex flex-col md:flex-row justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold font-mono">
              Recent Job Available
            </h1>
            <p className="mt-2 md:mt-4 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              saepe.
            </p>
          </div>

          <div className="mt-7 md:mt-0 text-purple-800 font-bold">
            <button className="cursor-pointer">View ALL</button>
          </div>
        </div>

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
                        src={job.company[0].companyLogo}
                        alt="Company Logo"
                        className="rounded-full size-15 object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="mt-1 text-xl font-medium">{job.title}</h1>
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
                      onClick={() => handleNavigate(job._id)}
                      className="px-3 py-2 mt-5 sm:mt-0 bg-purple-800 text-sm text-white rounded-lg cursor-pointer hover:bg-purple-950 transition duration-200 ease-in-out "
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
    </>
  );
};

export default RecentJobs;
