import React from "react";
import { IoBagRemoveSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <section className="min-h-70  bg-black text-white ">
      <div className="max-w-[1200px] mx-auto py-10 px-5 grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <h2 className="flex items-center gap-3 text-xl">
            <span>
              <IoBagRemoveSharp />
            </span>
            <span>Job</span>
          </h2>
          <p className="my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio illum
            quis perspiciatis expedita praesentium voluptates cum laborum,
            aliquid quasi nulla?
          </p>
        </div>
        <div className="">
          <h1 className="text-xl">Company</h1>
          <ul className="my-3 text-sm">
            <li className="mt-1 cursor-pointer">About us</li>
            <li className="mt-1 cursor-pointer">Our Team</li>
            <li className="mt-1 cursor-pointer">Partners</li>
            <li className="mt-1 cursor-pointer">Jobs</li>
            <li className="mt-1 cursor-pointer">Contact us</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl">Job Categories</h1>
          <ul className="my-3 text-sm">
            <li className="mt-1">Computer science</li>
            <li className="mt-1">Computer engineering</li>
            <li className="mt-1">Education</li>
            <li className="mt-1">Sports</li>
            <li className="mt-1">Civil Engineer</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl">News letter</h1>
          <p className="text-sm my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
            accusamus?
          </p>
          <div id="footer-from">
            <input
              type="email"
              name="email"
              id="email"
              className="my-3 outline outline-white rounded px-3 py-0.5"
            />
            <button className="my-3  md:mx-0 bg-purple-800 text-white px-3 py-1 rounded cursor-pointer">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
