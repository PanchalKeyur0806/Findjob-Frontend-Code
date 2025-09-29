import React from 'react'

const SortMenu = ({sortField, handleSorting}) => {
  return (
    <div className="max-w-[700px] shadow rounded-lg px-5 py-5 my-5">
      <div className="flex gap-3">
        <button
          onClick={() => handleSorting("new")}
          className={` px-5 py-2 rounded-lg hover:bg-gray-300 text-slate-800 cursor-pointer transition transform duration-100 ease-in hover:scale-103 active:scale-98 ${
            sortField === "new" ? "bg-gray-300" : "bg-gray-100"
          }`}
        >
          Newest
        </button>
        <button
          onClick={() => handleSorting("old")}
          className={` px-5 py-2 rounded-lg hover:bg-gray-300 text-slate-800 cursor-pointer transition transform duration-100 ease-in hover:scale-103 active:scale-98 ${
            sortField === "old" ? "bg-gray-300" : "bg-gray-100"
          }`}
        >
          Oldest
        </button>
      </div>
    </div>
  );
}

export default SortMenu