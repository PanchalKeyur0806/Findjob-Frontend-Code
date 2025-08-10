import React from "react";
import { MdOutlineAgriculture } from "react-icons/md";

const Category = () => {
  return (
    <section className="max-w-[1200px] w-[95%] mx-auto bg-purple-50 rounded-md py-10 px-5">
      <div id="category-heading" className="text-center">
        <h1 className="text-4xl font-bold text-purple-900">
          Browse By Category
        </h1>
        <p className="mt-3 text-gray-600 max-w-lg mx-auto text-sm">
          Discover job opportunities across various industries. Find your
          perfect match and start your career today.
        </p>
      </div>

      <div
        id="category-cards"
        className="my-10 mx-5 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div className="bg-white text-purple-900 text-center rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-center items-center cursor-pointer">
          <div className="flex justify-center text-4xl text-purple-700">
            <MdOutlineAgriculture />
          </div>
          <div className="font-semibold mt-4">
            <h1>Agriculture</h1>
          </div>
          <div className="mt-2 text-gray-500 text-sm">
            <p>1254 jobs</p>
          </div>
        </div>

        <div className="bg-white text-purple-900 text-center rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-center items-center cursor-pointer">
          <div className="flex justify-center text-4xl text-purple-700">
            <MdOutlineAgriculture />
          </div>
          <div className="font-semibold mt-4">
            <h1>Technology</h1>
          </div>
          <div className="mt-2 text-gray-500 text-sm">
            <p>987 jobs</p>
          </div>
        </div>

        <div className="bg-white text-purple-900 text-center rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-center items-center cursor-pointer">
          <div className="flex justify-center text-4xl text-purple-700">
            <MdOutlineAgriculture />
          </div>
          <div className="font-semibold mt-4">
            <h1>Healthcare</h1>
          </div>
          <div className="mt-2 text-gray-500 text-sm">
            <p>543 jobs</p>
          </div>
        </div>

        <div className="bg-white text-purple-900 text-center rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-center items-center cursor-pointer">
          <div className="flex justify-center text-4xl text-purple-700">
            <MdOutlineAgriculture />
          </div>
          <div className="font-semibold mt-4">
            <h1>Education</h1>
          </div>
          <div className="mt-2 text-gray-500 text-sm">
            <p>789 jobs</p>
          </div>
        </div>

        <div className="bg-white text-purple-900 text-center rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-center items-center cursor-pointer">
          <div className="flex justify-center text-4xl text-purple-700">
            <MdOutlineAgriculture />
          </div>
          <div className="font-semibold mt-4">
            <h1>Finance</h1>
          </div>
          <div className="mt-2 text-gray-500 text-sm">
            <p>654 jobs</p>
          </div>
        </div>

        <div className="bg-white text-purple-900 text-center rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-center items-center cursor-pointer">
          <div className="flex justify-center text-4xl text-purple-700">
            <MdOutlineAgriculture />
          </div>
          <div className="font-semibold mt-4">
            <h1>Construction</h1>
          </div>
          <div className="mt-2 text-gray-500 text-sm">
            <p>412 jobs</p>
          </div>
        </div>

        <div className="bg-white text-purple-900 text-center rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-center items-center cursor-pointer">
          <div className="flex justify-center text-4xl text-purple-700">
            <MdOutlineAgriculture />
          </div>
          <div className="font-semibold mt-4">
            <h1>Marketing</h1>
          </div>
          <div className="mt-2 text-gray-500 text-sm">
            <p>872 jobs</p>
          </div>
        </div>

        <div className="bg-white text-purple-900 text-center rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-center items-center cursor-pointer">
          <div className="flex justify-center text-4xl text-purple-700">
            <MdOutlineAgriculture />
          </div>
          <div className="font-semibold mt-4">
            <h1>Hospitality</h1>
          </div>
          <div className="mt-2 text-gray-500 text-sm">
            <p>329 jobs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
