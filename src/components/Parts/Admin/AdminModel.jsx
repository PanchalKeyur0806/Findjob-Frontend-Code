import { X } from "lucide-react";
import React from "react";

const AdminModel = ({ isModalOpen, onModalClose, data }) => {
  if (!isModalOpen) return null;

  function colorPicker(theme) {
    switch (theme) {
      case "user":
        return "bg-[#E3F2FD] text-slate-950";
      case "company":
        return "bg-[#E8F5E9] text-slate-950";
      case "jobs":
        return "bg-[#FFF3E0] text-slate-950";
      case "claims":
        return "bg-[#FFEBEE] text-slate-950";
    }
  }

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/60 ">
      <div className="bg-white md:max-w-[800px] h-[300px] w-[95%] mx-auto  overflow-y-scroll scroll-smooth shadow-lg rounded-lg relative">
        {/* close button */}
        <div className="sticky h-10 top-0 flex justify-end bg-white  ">
          <button
            onClick={onModalClose}
            className=" hover:bg-gray-200 px-1 my-1 rounded-full cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* listing the data */}
        <div className="text-sm">
          {data.length > 0 &&
            data?.map((data) => (
              <div
                key={data._id}
                className={`my-5 mx-5 rounded-md shadow py-1 px-5 ${colorPicker(
                  data.type
                )}`}
              >
                <p className="font-medium">Type :- {data.type}</p>
                <p>{data.message}</p>

                {data.type === "user" && (
                  <div className="mt-2 text-gray-700">
                    <p>User Email :- {data.meta.userEmail}</p>
                    <p>User Name :- {data.meta.userName}</p>
                  </div>
                )}

                {data.type === "company" && (
                  <div className="mt-2 text-gray-700">
                    <p>Company Name :- {data.meta.companyName}</p>
                    <p>Company Email :- {data.meta.companyEmail}</p>
                  </div>
                )}

                {data.type === "jobs" && (
                  <div className="mt-2 text-gray-700">
                    <p>Created By :- {data.meta.userId}</p>
                  </div>
                )}

                {data.type === "claims" && (
                  <div className="mt-2 text-gray-700">
                    <p>Created By :- {data.meta.userId}</p>
                    <div>
                      <p>
                        On :- <span>{data.meta.companyName}</span>
                      </p>
                      <p>
                        Email :- <span>{data.meta.companyEmail}</span>
                      </p>
                      <p>
                        companyPhone :- <span>{data.meta.companyPhone}</span>
                      </p>
                    </div>
                  </div>
                )}

                {data.createdAt && (
                  <div className="mt-2 text-gray-700">
                    <p>
                      Date :- <span>{data.createdAt.split("T")[0]}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>

        <div className="sticky bottom-0 bg-gray-100 border-t-2 border-t-purple-800 w-full flex items-center gap-5 px-10 py-2 justify-end">
          <button
            onClick={onModalClose}
            className="bg-purple-700 hover:bg-purple-900 transition duration-200 ease-in-out text-white rounded shadow px-5 py-2 cursor-pointer"
          >
            Okay
          </button>
          <button
            onClick={onModalClose}
            className="bg-gray-200 hover:bg-gray-400 hover:text-white transition duration-200 ease-in-out font-medium text-gray-700 rounded shadow px-5 py-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModel;
