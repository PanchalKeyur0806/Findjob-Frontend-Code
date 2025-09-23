import React, { useEffect, useState, lazy, Suspense } from "react";
import Aside from "../Parts/Aside/Aside";
import { MailCheck, Menu, Phone, Users } from "lucide-react";
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
  Pie,
  PieChart,
  Cell,
} from "recharts";
import LoadingBar from "react-top-loading-bar";

const AdminModel = lazy(() => import("../Parts/Admin/AdminModel"));

const Dashboard = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [userPercentage, setUserPercentage] = useState("");
  const [companiesPercentage, setCompaniesPercentage] = useState("");
  const [jobsPercentage, setJobsPercentage] = useState("");
  const [claimsPercentage, setClaimsPercentage] = useState("");
  const [jobsNotifications, setJobsNotifications] = useState(null);
  const [userNotifications, setUserNotifications] = useState(null);
  const [companyNotifications, setCompanyNotifications] = useState(null);
  const [claimsNotifications, setClaimsNotifications] = useState(null);
  const [allcharts, setAllCharts] = useState();
  const [activeUsers, setActiveUsers] = useState(null);

  const [getData, getLoading, getMessage, getError, progress, setProgress] =
    useGetData();

  const socket = useSocket();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  // useEffect for sockets
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("User is connected");
    });

    // listing on job created event
    socket.on("job_created", (data) => {
      setJobsNotifications((prev) => [...prev, data]);
    });

    // listing on user created event
    socket.on("user_created", (data) => {
      setUserNotifications((prev) => [...prev, data]);
    });

    // listing on company created event
    socket.on("company_created", (data) => {
      setCompanyNotifications((prev) => [...prev, data]);
    });

    // listing for creating claims
    socket.on("claim_created", (data) => {
      setClaimsNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off("job_created");
      socket.off("connect");
      socket.off("claim_created");
      socket.off("user_created");
      socket.off("company_created");
    };
  }, [socket]);

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  // use effect for fetching the data
  useEffect(() => {
    async function fetchAllData() {
      try {
        const [stats, charts, activeUsers, users, jobs, companies, claims] =
          await Promise.all([
            getData(`${baseUrl}api/admin/allstats`, { withCredentials: true }),
            getData(`${baseUrl}api/admin/allcharts`, { withCredentials: true }),
            getData(`${baseUrl}api/admin/activeusers`, {
              withCredentials: true,
            }),
            getData(`${baseUrl}api/notifications/users`, {
              withCredentials: true,
            }),
            getData(`${baseUrl}api/notifications/jobs`, {
              withCredentials: true,
            }),
            getData(`${baseUrl}api/notifications/companies`, {
              withCredentials: true,
            }),
            getData(`${baseUrl}api/notifications/claims`, {
              withCredentials: true,
            }),
          ]);

        // get all the stats
        setUserPercentage(stats.data.users.percentageChange);
        setJobsPercentage(stats.data.jobs.percentageChange);
        setCompaniesPercentage(stats.data.companies.percentageChange);
        setClaimsPercentage(stats.data.claims.percentageChange);

        // get all the charts
        setAllCharts(charts.data);

        // active users
        setActiveUsers([
          { name: "Active Users", count: activeUsers.data[0].totalActiveUser },
          {
            name: "InActive Users",
            count: activeUsers.data[0].totalInActiveUsers,
          },
        ]);

        // fetch all the notifications
        setUserNotifications(users.data);
        setJobsNotifications(jobs.data);
        setCompanyNotifications(companies.data);
        setClaimsNotifications(claims.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllData();
  }, []);

  const hanldeAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };
  return (
    <>
      <LoadingBar color="#8b5cf6" progress={progress} />
      <main className="flex flex-row font-poppins  ">
        <Aside
          isAsideOpen={isAsideOpen}
          onclose={() => setIsAsideOpen(false)}
        />
        <section className="w-full  min-h-screen md:h-screen md:overflow-y-scroll text-slate-900">
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
                <div className="mt-5 rounded-lg bg-white p-5 shadow-md  w-full lg:w-3/5 h-[350px] border-b-4 border-purple-800">
                  {allcharts && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={allcharts || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 11, fill: "#6b7280" }}
                          tickMargin={15}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#6b7280" }}
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
                          strokeWidth={2}
                          dot={{
                            r: 2,
                            stroke: "#f78d02",
                            strokeWidth: 2,
                            fill: "#fff",
                          }}
                        />
                        <Line
                          type="bump"
                          dataKey="companies"
                          stroke="#0213f7"
                          strokeWidth={2}
                          dot={{
                            r: 2,
                            stroke: "#0213f7",
                            strokeWidth: 2,
                            fill: "#fff",
                          }}
                        />
                        <Line
                          type="bump"
                          dataKey="jobs"
                          stroke="#0213f7"
                          strokeWidth={2}
                          dot={{
                            r: 2,
                            stroke: "#0213f7",
                            strokeWidth: 2,
                            fill: "#fff",
                          }}
                        />
                        <Line
                          type="bump"
                          dataKey="claims"
                          stroke="#a80000"
                          strokeWidth={2}
                          dot={{
                            r: 2,
                            stroke: "#a80000",
                            strokeWidth: 2,
                            fill: "#fff",
                          }}
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Live Popup Section */}
                <div className=" rounded-md mt-5 px-5 py-5 w-full lg:w-2/5 h-[350px] shadow border-b-4 border-purple-800">
                  <div>
                    <h1 className="text-xl font-medium mb-10">
                      Recent Activities
                    </h1>
                  </div>

                  <div className="text-sm">
                    {/* user */}
                    <div className="flex justify-between items-center shadow px-2 py-1 bg-[#E3F2FD] text-slate-900 rounded">
                      <div className="mb-1">
                        <h1>Users</h1>
                        <p>
                          {userNotifications?.[userNotifications.length - 1]
                            ?.meta?.userEmail || "Not such a activity"}
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={() => openModal(userNotifications)}
                          className="px-5 py-1 bg-[#2196F3] text-white rounded-md  cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    </div>

                    {/* Company */}
                    <div className="flex justify-between px-2 py-1 shadow items-center bg-[#E8F5E9] text-slate-900 my-2 rounded-md">
                      <div>
                        <h1>Company</h1>
                        <p>
                          {companyNotifications?.[
                            companyNotifications.length - 1
                          ]?.meta?.companyEmail || "Not such a activity"}
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={() => openModal(companyNotifications)}
                          className="px-5 py-1 bg-[#4CAF50] text-white rounded-md cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    </div>

                    {/* jobs */}
                    <div className="flex justify-between items-center shadow px-2 py-1 my-2 bg-[#FFF3E0] text-slate-900">
                      <div>
                        <h1>Jobs</h1>

                        <p>
                          {
                            jobsNotifications?.[jobsNotifications.length - 1]
                              ?.meta?.jobTitle
                          }
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={() => openModal(jobsNotifications)}
                          className="px-5 py-1 bg-[#FF9800] text-white rounded-md cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    </div>

                    {/* claims */}
                    <div className="flex justify-between items-center px-2 py-1 my-2 bg-[#FFEBEE] text-slate-900">
                      <div>
                        <h1>Claims</h1>
                        <p>
                          {claimsNotifications?.[claimsNotifications.length - 1]
                            ?.message || "Not such a activity"}
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={() => openModal(claimsNotifications)}
                          className="px-5 py-1 bg-[#F44336] text-white rounded-md cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <Suspense
                  fallback={
                    <div className="flex items-center h-screen justify-center text-3xl">
                      Loading...
                    </div>
                  }
                >
                  <AdminModel
                    isModalOpen={isModalOpen}
                    onModalClose={() => setIsModalOpen(false)}
                    data={modalData || "No data provided"}
                  />
                </Suspense>
              </div>

              <div className="xl:flex gap-5 block">
                <div className="mt-10">
                  {/* User Chart Heading */}
                  <div>
                    <h1 className="text-xl font-medium underline underline-offset-8">
                      Total Active Uses
                    </h1>
                    <p className="text-sm mt-2 text-gray-500">
                      Total{" "}
                      <span className="font-bold">
                        {activeUsers?.reduce((a, b) => a + b.count, 0)}
                      </span>{" "}
                      Users
                    </p>
                  </div>

                  {/* Chart OF Active and InActive Users */}
                  <div className="mt-4 w-full lg:w-[550px] h-[350px] bg-white rounded-md shadow border-b-4 border-purple-800">
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                      <PieChart>
                        <Pie
                          data={activeUsers}
                          dataKey={"count"}
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          innerRadius={60}
                          label
                          paddingAngle={5}
                          fill="#8884d8"
                        >
                          {activeUsers?.map((entry) => (
                            <Cell
                              key={`ceil-${entry.name}`}
                              fill={`${
                                entry.name == "Active Users"
                                  ? "#039612"
                                  : "#960303"
                              }`}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            borderRadius: "30px",
                            border: "1px solid #ddd",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Claims  */}
                <div className="mt-10 w-full">
                  {/* Recent Claims Heading */}
                  <div>
                    <h1 className="mb-11 text-xl font-medium underline underline-offset-8">
                      Recent Claims
                    </h1>
                  </div>

                  {/* Claims data */}
                  <div className="shadow rounded-md mt-4 box-border min-h-[350px]  xl:h-[350px] border-b-4 border-purple-800 overflow-auto scroll-smooth scroll-sm transition duration-150 ease-in">
                    {claimsNotifications?.map((data) => (
                      <div
                        key={data._id}
                        className="bg-[#F3E5F5] text-[#9C27B0] my-4 mx-5 px-4 rounded-md shadow py-1 text-sm"
                      >
                        <h3 className="bold border-b-4 border-[#9C27B0] rounded-md px-4 text-xl">
                          {data.meta.companyName}
                        </h3>

                        <div className="flex gap-5 mt-2 ">
                          <div className="flex gap-3">
                            <MailCheck size={16} />
                            <p>{data.meta.companyEmail}</p>
                          </div>
                          <div className="md:ml-10 flex gap-3">
                            <Phone size={16} />
                            <p>{data.meta.companyPhone}</p>
                          </div>
                        </div>

                        {/* date of the claim */}
                        <p className="mt-2">{data.createdAt.split("T")[0]}</p>
                      </div>
                    ))}
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
