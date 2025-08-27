import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../Hooks/FetchGetDataHook";
import {
  BriefcaseBusiness,
  CirclePlus,
  GraduationCap,
  IndianRupee,
  MapPin,
  Timer,
  Users,
} from "lucide-react";
import axios from "axios";

const JobDetails = () => {
  const [data, setData] = useState(null);
  const [getData, getLoading] = useGetData();
  const [applicationMsg, setApplicationMsg] = useState(null);
  const [applicationErr, setApplicationErr] = useState(null);

  const params = useParams();
  //   params.jobId

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const url = isDevelopment
    ? `http://localhost:7000/api/jobs/${params.jobId}`
    : import.meta.env.VITE_BACKEND_URL + `api/jobs/${params.jobId}`;

  useEffect(() => {
    async function fetchData(url) {
      const response = await getData(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setData(response.data);
    }

    fetchData(url);
  }, []);

  // submit application
  async function submitApplication(isDevelopment, jobId) {
    const url = isDevelopment
      ? `http://localhost:7000/api/applications/user/submit/${jobId}`
      : import.meta.env.VITE_BACKEND_URL +
        `api/applications/user/submit/${jobId}`;

    try {
      setApplicationErr("");
      const response = await axios.post(url, null, {
        withCredentials: true,
      });

      const data = response.data;
      setApplicationMsg(data.message);
    } catch (error) {
      setApplicationMsg("");
      setApplicationErr(error.response.data.message);
    }
  }

  if (getLoading) {
    return (
      <>
        <div className="h-screen flex items-center justify-center text-5xl font-medium">
          Loading...
        </div>
      </>
    );
  }

  return (
    <section className="font-poppins min-h-screen">
      {/* Heading of JObs */}
      <div className="h-50 mb-10 bg-black text-white text-4xl flex items-center justify-center">
        <h1>Job Details</h1>
      </div>

      {/* Desciption of Jobs */}
      <div className="max-w-[1000px] mx-auto px-4 py-3 ">
        {/* Date and Add to fav icon */}
        <div className="flex items-center justify-between">
          <div className="text-purple-900">{data?.createdAt.split("T")[0]}</div>
          <div className="cursor-pointer text-purple-800">
            <CirclePlus />
          </div>
        </div>

        {/* Job img and Title */}
        <div className="mt-3 flex gap-8">
          <div id="JObIMG">
            <img
              src={data?.company.companyLogo}
              alt="Company Logo"
              className="size-15 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-medium">{data?.title}</h1>
            <p className="text-sm mt-1">{data?.location}</p>
          </div>
        </div>

        {/* Other minor details */}
        <div className="mt-6 flex flex-wrap gap-5">
          <div className="flex items-center ">
            <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
              <BriefcaseBusiness />
            </p>
            <p>{data?.jobCategory}</p>
          </div>
          <div className="flex items-center ">
            <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
              <GraduationCap />
            </p>
            <p>{data?.educationLevel}</p>
          </div>
          <div className="flex items-center ">
            <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
              <IndianRupee size={24} />
            </p>
            <p>{data?.salary}</p>
          </div>
          <div className="flex items-center ">
            <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
              <Timer size={24} />
            </p>
            <p>{data?.employeeType}</p>
          </div>
          <div className="flex items-center ">
            <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
              <Users size={24} />
            </p>
            <p>{data?.numberOfOpenings}</p>
          </div>
          <div className="flex items-center ">
            <p className="px-1 py-1 rounded-full text-purple-700 bg-white">
              <MapPin size={24} />
            </p>
            <p>{data?.location}</p>
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-10">
          <div>
            <h1 className="text-2xl font-medium text-slate-900">
              JOB Description
            </h1>
          </div>

          <div className="mt-3">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              reprehenderit excepturi debitis exercitationem assumenda
              distinctio error, nihil expedita neque laudantium esse modi beatae
              rerum voluptatum culpa aliquid optio earum! Inventore voluptatum
              itaque consequatur, blanditiis cum quos ex. Corporis, impedit
              asperiores! Totam labore ipsam sed eaque quidem consequatur veniam
              consectetur at.
            </p>
          </div>
        </div>

        {/* Job Responsiblity */}
        <div className="mt-10">
          <div>
            <h1 className="text-2xl font-medium text-slate-900">
              JOB Responsibility
            </h1>
          </div>

          <div className="mt-3">
            <p>{data?.responsibility}</p>
          </div>
        </div>

        {/* Job requirements */}
        <div className="mt-10">
          <div>
            <h1 className="text-2xl font-medium text-slate-900">
              JOB Requirements
            </h1>
          </div>

          <div className="mt-3">
            <p>{data?.requirements}</p>
          </div>
        </div>

        {/* Nice to Have */}
        <div className="mt-10">
          <div>
            <h1 className="text-2xl font-medium text-slate-900">
              Nice To Have
            </h1>
          </div>

          <div className="mt-5">
            <p>{data?.niceToHave}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-10">
          <h1 className="text-2xl font-medium text-slate-900">Skills</h1>
          <ul className="mt-3 flex flex-wrap gap-5">
            {data?.skills.map((skill, index) => (
              <li key={index} className="px-3 py-2  rounded  bg-gray-200 ">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        {/*  */}

        {/* Allication Deadline */}
        <div className="mt-10">
          <h1 className="text-2xl font-medium text-slate-900">
            Application Deadline
          </h1>
          <p className="mt-3 flex gap-5">
            {data?.applicationDeadline.split("T")[0]}
          </p>
        </div>

        {applicationMsg && (
          <div className="px-5 py-2 my-3  bg-green-700 text-white rounded-lg">
            <p>{applicationMsg}</p>
          </div>
        )}
        {applicationErr && (
          <div className="px-5 py-2 my-3  bg-red-700 text-white rounded-lg">
            <p>{applicationErr}</p>
          </div>
        )}

        {/* Submit Your Application */}

        <div className="mt-10">
          <button
            onClick={() => {
              submitApplication(isDevelopment, data._id);
            }}
            className="px-4 py-2 rounded bg-gradient-to-tl from-purple-500  to-purple-900 text-white cursor-pointer hover:to-purple-100 hover:text-black transition duration-300 ease-linear"
          >
            Submit Your Application
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
