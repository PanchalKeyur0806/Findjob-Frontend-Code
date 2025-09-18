import React, { useEffect, useMemo, useState } from "react";
import Aside from "../Parts/Aside/Aside";
import { Menu, Users } from "lucide-react";
import useGetData from "../../Hooks/FetchGetDataHook";
import { useSocket } from "../../Contexts/useSocket";

const Dashboard = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [userPercentage, setUserPercentage] = useState("");
  const [companiesPercentage, setCompaniesPercentage] = useState("");
  const [jobsPercentage, setJobsPercentage] = useState("");
  const [claimsPercentage, setClaimsPercentage] = useState("");
  const [getData, getLoading, getMessage, getError] = useGetData();

  const socket = useSocket();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";

  // useEffect for sockets
  useEffect(() => {
    if (!socket) return;
    console.log("Socket connected");

    socket.on("connect", () => {
      console.log("User is connected");
    });

    // listing on job created event
    socket.on("job_created", (data) => {
      console.log("data from backend is ", data);
    });

    return () => {
      socket.off("job_created");
      socket.off("connect");
    };
  }, [socket]);

  // fetch all stats
  async function fetchAllStats() {
    const url = isDevelopment
      ? "http://localhost:7000/api/admin/allstats"
      : import.meta.env.VITE_BACKEND_URL + "api/admin/allstats";
    const response = await getData(url, {
      withCredentials: true,
    });

    setUserPercentage(response.data.users.percentageChange);
    setJobsPercentage(response.data.jobs.percentageChange);
    setCompaniesPercentage(response.data.companies.percentageChange);
    setClaimsPercentage(response.data.claims.percentageChange);
  }

  // use effect for fetching the data
  useEffect(() => {
    fetchAllStats();
  }, []);

  const hanldeAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };
  return (
    <>
      <main className="flex flex-row font-poppins  bg-purple-50 text-slate-900">
        <Aside
          isAsideOpen={isAsideOpen}
          onclose={() => setIsAsideOpen(false)}
        />
        <section className="w-[97%] md:w-3/4 mx-auto px-3 md:px-10 mt-5">
          <div className="block md:hidden">
            <Menu onClick={hanldeAside} />
          </div>

          {/* Dashboard Heading */}
          <div>
            <h1 className="text-2xl">Dashboard</h1>
            <p className="text-sm mt-1 text-gray-500">
              Welcome to your Dashboard
            </p>
          </div>

          {/* cards of the Activities */}
          <div className="mt-10 grid sm:grid-cols-2  lg:grid-cols-4 gap-5">
            {/* Users */}
            <div className="px-7 py-3 shadow rounded-md border-b-4 border-purple-800">
              <div>
                <Users
                  className="bg-purple-800 text-white rounded-full mt-2 px-1"
                  size={30}
                />
                <h1 className="text-xl mt-1">Users</h1>
                <p className="text-sm mt-1">Total Users Have</p>
              </div>
              <div className="mt-3">
                <p
                  className={`font-medium ${
                    userPercentage.startsWith("-")
                      ? "text-red-700"
                      : "text-green-800"
                  }`}
                >
                  {userPercentage}
                </p>
                <p>From pastweek</p>
              </div>
            </div>

            {/* Companies */}
            <div className="px-7 py-3 shadow rounded-md border-b-4 border-purple-800">
              <div>
                <Users
                  className="bg-purple-800 text-white rounded-full mt-2 px-1"
                  size={30}
                />
                <h1 className="text-xl mt-1">Companies</h1>
                <p className="text-sm mt-1">Total Companies Have</p>
              </div>
              <div className="mt-3">
                <p
                  className={`font-medium ${
                    companiesPercentage.startsWith("-")
                      ? "text-red-700"
                      : "text-green-800"
                  }`}
                >
                  {companiesPercentage}
                </p>
                <p>From pastweek</p>
              </div>
            </div>

            {/* Jobs */}
            <div className="px-7 py-3 shadow  rounded-md border-b-4 border-purple-800">
              <div>
                <Users
                  className="bg-purple-800 text-white rounded-full mt-2 px-1"
                  size={30}
                />
                <h1 className="text-xl mt-1">Jobs</h1>
                <p className="text-sm mt-1">Total Jobs Have</p>
              </div>
              <div className="mt-3">
                <p
                  className={`font-medium ${
                    jobsPercentage.startsWith("-")
                      ? "text-red-700"
                      : "text-green-800"
                  }`}
                >
                  {jobsPercentage}
                </p>
                <p>From pastweek</p>
              </div>
            </div>

            {/* Claims */}
            <div className="px-7 py-3 shadow  rounded-md border-b-4 border-purple-800">
              <div>
                <Users
                  className="bg-purple-800 text-white rounded-full mt-2 px-1"
                  size={30}
                />
                <h1 className="text-xl mt-1">Claims</h1>
                <p className="text-sm mt-1">Total Claims Have</p>
              </div>
              <div className="mt-3">
                <p
                  className={`font-medium ${
                    claimsPercentage.startsWith("-")
                      ? "text-red-700"
                      : "text-green-800"
                  }`}
                >
                  {claimsPercentage}
                </p>
                <p>From pastweek</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
