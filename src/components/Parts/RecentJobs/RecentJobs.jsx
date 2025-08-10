import React from "react";
import { CiSaveDown2 } from "react-icons/ci";

const RecentJobs = () => {
  let logo =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrvNmVpIrWrF4MKWIgvXO3I_pvVLEOt6PciQ&s";
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

        <div id="cards" className="mt-13">
          <div id="card" className="shadow pl-10 mb-5">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              {/* something else */}
              <div className="pt-3">
                <div className="flex gap-10">
                  <div id="card-img">
                    <img
                      src={logo}
                      alt="Company logo"
                      className="w-15 h-15 object-cover rounded-full"
                    />
                  </div>
                  <div className="card-heading">
                    <h1 className="text-2xl font-bold font-mono">
                      Company Name
                    </h1>
                    <p className="text-sm">Location to the comapny</p>
                  </div>
                </div>

                <div>
                  <div className="flex gap-10 mt-5">
                    <div>
                      <h1>Category</h1>
                    </div>
                    <div>
                      <h1>Full time</h1>
                    </div>
                    <div>
                      <h1>29000/- only</h1>
                    </div>
                    <div>
                      <h1>Location</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="card-btn"
                className="mt-5 sm:mt-4 pr-4 flex flex-col sm:items-center justify-between gap-4 sm:gap-8"
              >
                <div>
                  <h1 className="text-2xl font-medium cursor-pointer">
                    <CiSaveDown2 />
                  </h1>
                </div>
                <div>
                  <button className="mb-4 bg-purple-800 text-white px-3 py-2 rounded cursor-pointer">
                    Job Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentJobs;
