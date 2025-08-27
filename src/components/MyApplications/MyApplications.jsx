import { useEffect, useState } from "react";
import useGetData from "../../Hooks/FetchGetDataHook";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyApplications = () => {
  const [applicationData, setApplicationData] = useState(null);
  const [getData, getLoading, getMessage, getError] = useGetData();
  const [isDeleted, setIsDeleted] = useState(false);

  const navigate = useNavigate();

  //   fetch total users
  useEffect(() => {
    const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
    const url = isDevelopment
      ? `http://localhost:7000/api/applications/user/views`
      : import.meta.env.VITE_BACKEND_URL + `api/applications/user/views/`;

    async function fetchData(url) {
      const response = await getData(url, {
        withCredentials: true,
      });

      console.log(response.data);

      setApplicationData(response.data);
    }
    fetchData(url);
  }, []);

  //   go to job page
  const goToJobPage = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  //   retrive application
  const handleDeleteApplication = async (applicationId) => {
    const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
    const url = isDevelopment
      ? `http://localhost:7000/api/applications/user/retrive/${applicationId}`
      : import.meta.env.VITE_BACKEND_URL +
        `api/applications/user/retrive/${applicationId}`;

    const response = await axios.delete(url, {
      withCredentials: true,
    });

    setIsDeleted(response.data.message);
  };

  if (getLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-medium">Loading ...</h1>
      </div>
    );
  }
  return (
    <section className="min-h-screen font-poppins">
      <div className="h-50 flex justify-center items-center bg-black text-white">
        <h1 className="text-2xl">My Applications</h1>
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
      {isDeleted && (
        <div className="px-5 py-2 my-3  bg-red-700 text-white rounded-lg">
          <p>{isDeleted}</p>
        </div>
      )}

      {/* List of all the applications */}
      <div className="max-w-[1000px] w-[95%] mx-auto">
        {applicationData &&
          applicationData.map((application) => (
            <div key={application._id} className="px-5 py-3 shadow">
              {/* Company Info */}
              <h1 className="text-2xl font-semibold mt-7 mb-2">Company Info</h1>
              <div className="flex gap-2 flex-wrap text-sm">
                <h1>
                  <span className="font-medium">Company Name :- </span>{" "}
                  {application?.job?.company?.companyName}
                </h1>
                <h2>
                  <span className="font-medium">Company Email :- </span>{" "}
                  {application?.job?.company?.email}
                </h2>
                <h2>
                  <span className="font-medium">Company Phone Number</span>{" "}
                  {application?.job?.company?.phoneNumber}{" "}
                </h2>
                <h2>
                  <span className="font-medium">Website :- </span>{" "}
                  {application?.job?.company?.website}
                </h2>
              </div>

              {/* Job Info */}
              <h1 className="text-2xl font-semibold mt-7 mb-2 py-1">
                Job Info
              </h1>
              <div className="flex flex-wrap gap-3 text-sm">
                <h1>
                  <span className="font-medium">Job Title :- </span>
                  {application?.job?.title}
                </h1>

                <h1>
                  <span className="font-medium">Application Count :- </span>
                  {application?.job?.applicationCount}
                </h1>
                <h1>
                  <span className="font-medium">Empyoyee Type :- </span>
                  {application?.job?.employeeType}
                </h1>

                <h1>
                  <span className="font-medium">Views Count :- </span>
                  {application?.job?.viewsCount}
                </h1>
              </div>

              {/*  */}

              <div className="my-7 mb-2 ">
                {application.isRetrived === true ? (
                  <div>
                    <button className="px-5 py-2 bg-red-800 text-white rounded cursor-pointer hover:bg-red-950 transition duration-300 ease-linear">
                      Application Deleted
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-5 flex-col md:flex-row">
                    <button
                      onClick={() => goToJobPage(application?.job?._id)}
                      className="px-5 py-2 bg-purple-800 text-white rounded cursor-pointer hover:bg-purple-950 transition duration-300 ease-linear"
                    >
                      View Job
                    </button>
                    <button
                      onClick={() => handleDeleteApplication(application?._id)}
                      className="px-5 py-2 bg-red-800 text-white rounded cursor-pointer hover:bg-red-950 transition duration-300 ease-linear"
                    >
                      Retrive Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default MyApplications;
