import React, { useEffect, useState } from "react";
import Aside from "../Parts/Aside/Aside";
import { Menu, Users } from "lucide-react";
import useGetData from "../../Hooks/FetchGetDataHook";
import { useSocket } from "../../Contexts/useSocket";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [userPercentage, setUserPercentage] = useState("");
  const [companiesPercentage, setCompaniesPercentage] = useState("");
  const [jobsPercentage, setJobsPercentage] = useState("");
  const [claimsPercentage, setClaimsPercentage] = useState("");
  const [allcharts, setAllCharts] = useState();

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

  // fetch user stats for charts
  async function fetchAllCharts() {
    const url = isDevelopment
      ? "http://localhost:7000/api/admin/allcharts"
      : import.meta.env.VITE_BACKEND_URL + "api/admin/allcharts";
    const response = await getData(url, {
      withCredentials: true,
    });

    setAllCharts(response.data);

    console.log(response);
  }

  // use effect for fetching the data
  useEffect(() => {
    fetchAllStats();
    fetchAllCharts();
  }, []);

  const hanldeAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };
  return (
    <>
      <main className="flex flex-row font-poppins  ">
        <Aside
          isAsideOpen={isAsideOpen}
          onclose={() => setIsAsideOpen(false)}
        />
        <section className="w-full  min-h-screen md:h-screen md:overflow-y-scroll bg-purple-50 text-slate-900">
          <div className="px-6 md:px-10 mt-5">
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
              <div className="px-7 py-3 shadow rounded-md border-b-4 border-purple-800 bg-white">
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
              <div className="px-7 py-3 shadow rounded-md border-b-4 border-purple-800 bg-white">
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
              <div className="px-7 py-3 shadow  rounded-md border-b-4 border-purple-800 bg-white">
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
              <div className="px-7 py-3 shadow  rounded-md border-b-4 border-purple-800 bg-white">
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

            {/* charts */}
            <div className="mt-10">
              <div>
                <h1 className="font-medium text-xl underline underline-offset-8 text-slate-800">
                  Daily Activity Charts
                </h1>
              </div>

              <div className="lg:flex gap-5 block">
                {/* Charts  */}
                <div className="mt-5 rounded-lg bg-white p-5 shadow-md  w-full lg:w-3/5 h-[350px]">
                  {allcharts && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={allcharts || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          tickMargin={15}
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          allowDecimals={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            borderRadius: "30px",
                            border: "1px solid #ddd",
                          }}
                        />
                        <Line
                          type="bump"
                          dataKey="user"
                          stroke="#f78d02"
                          strokeWidth={5}
                          dot={{
                            r: 4,
                            stroke: "#f78d02",
                            strokeWidth: 4,
                            fill: "#fff",
                          }}
                        />
                        <Line
                          type="bump"
                          dataKey="companies"
                          stroke="#0213f7"
                          strokeWidth={5}
                          dot={{
                            r: 4,
                            stroke: "#0213f7",
                            strokeWidth: 4,
                            fill: "#fff",
                          }}
                        />
                        <Line
                          type="bump"
                          dataKey="jobs"
                          stroke="#0213f7"
                          strokeWidth={5}
                          dot={{
                            r: 4,
                            stroke: "#0213f7",
                            strokeWidth: 4,
                            fill: "#fff",
                          }}
                        />
                        <Line
                          type="bump"
                          dataKey="claims"
                          stroke="#a80000"
                          strokeWidth={5}
                          dot={{
                            r: 4,
                            stroke: "#a80000",
                            strokeWidth: 4,
                            fill: "#fff",
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Live Popup Section */}
                <div className="bg-white rounded-md mt-5 px-5 py-5 w-full lg:w-2/5 h-[350px]">
                  <div>
                    <h1 className="text-xl font-medium mb-10">
                      Recent Activities
                    </h1>
                  </div>

                  <div className="text-sm">
                    {/* user */}
                    <div className="flex justify-between items-center shadow px-2 py-1 bg-[#f78d02] text-white rounded">
                      <div className="mb-1">
                        <h1>Users</h1>
                        <p>name of the user</p>
                      </div>

                      <div>
                        <button className="px-5 py-1 bg-white text-slate-950 rounded-md  cursor-pointer">
                          View
                        </button>
                      </div>
                    </div>

                    {/* Company */}
                    <div className="flex justify-between px-2 py-1 shadow items-center bg-blue-600 text-white my-2 rounded-md">
                      <div>
                        <h1>Company</h1>
                        <p>Name of the company</p>
                      </div>

                      <div>
                        <button className="px-5 py-1 bg-white text-slate-950 rounded-md cursor-pointer">
                          View
                        </button>
                      </div>
                    </div>

                    {/* jobs */}
                    <div className="flex justify-between items-center shadow px-2 py-1 my-2 bg-sky-600 text-white">
                      <div>
                        <h1>Jobs</h1>
                        <p>name of the jobs</p>
                      </div>

                      <div>
                        <button className="px-5 py-1 bg-white text-slate-950 rounded-md cursor-pointer">
                          View
                        </button>
                      </div>
                    </div>

                    {/* claims */}
                    <div className="flex justify-between items-center px-2 py-1 my-2 bg-red-600 text-white">
                      <div>
                        <h1>Claims</h1>
                        <p>username of the user</p>
                      </div>

                      <div>
                        <button className="px-5 py-1 bg-white text-slate-950 rounded-md cursor-pointer">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
