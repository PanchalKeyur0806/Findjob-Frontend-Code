import React from "react";
import { IoBagHandleOutline, IoPeople } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="pt-10 flex flex-col justify-center items-center bg-black text-white ">
      <div>
        <h1 id="hero-heading" className="text-5xl font-mono  font-bold">
          Find Your Dream <span>JOb</span> Today
        </h1>
        <h3 id="hero-text" className="mt-3 font-extralight text-sm text-center">
          Connect with Opportunity: your gateway to success
        </h3>
      </div>
      <div id="hero-filter" className="mt-8 bg-white text-purple-900 rounded">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Find your job"
          className="px-4 py-3 border-r-2 border-l-purple-950 outline-none"
        />
        <select name="location" className="px-4 py-3  outline-none">
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Gandinagar">Gandinagar</option>
          <option value="Bhavnagar">Bhavnagar</option>
          <option value="Rajkot">Rajkot</option>
        </select>
        <button
          id="hero-filter"
          className="px-4 py-3 bg-purple-800 text-white cursor-pointer "
        >
          Search Job
        </button>
      </div>

      <div className="mt-10 flex gap-7">
        <div
          id="hero-totalJobs"
          className="flex gap-3 items-center justify-center "
        >
          <div>
            <h1 className="text-white bg-purple-800 rounded-full px-2 py-2">
              <IoBagHandleOutline />
            </h1>
          </div>
          <div>
            <h1>11000+</h1>
            <h3>Jobs</h3>
          </div>
        </div>
        <div
          id="hero-totalCandidates"
          className="flex gap-3 items-center justify-center "
        >
          <div>
            <h1 className="text-white bg-purple-800 rounded-full px-2 py-2">
              <IoPeople />
            </h1>
          </div>
          <div>
            <h1>11000+</h1>
            <h3>Candidates</h3>
          </div>
        </div>
        <div
          id="hero-totalCompanies"
          className="flex gap-3 items-center justify-center "
        >
          <div>
            <h1 className="text-white bg-purple-800 rounded-full px-2 py-2">
              <FaBuilding />
            </h1>
          </div>
          <div>
            <h1>11000+</h1>
            <h3>Companies</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
