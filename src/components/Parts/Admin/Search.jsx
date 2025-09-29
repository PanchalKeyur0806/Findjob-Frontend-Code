const SearchMenu = ({ title, children, onSubmit, onCancel }) => {
  return (
    <div
      className={`  max-w-[1000px] bg-white shadow rounded-lg mt-5 px-5 py-2  `}
    >
      <h1 className="text-xl font-medium my-4">{title}</h1>

      <div className="grid grid-cols-2 gap-3">{children}</div>

      {/* searching buttons */}
      <div className="mt-10 flex flex-row justify-end">
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-purple-700 text-white rounded-lg mx-2 cursor-pointer hover:bg-purple-900 transform transition duration-75 ease-in-out hover:scale-105 active:scale-95"
        >
          Search
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-slate-950  rounded-lg mx-2 cursor-pointer hover:bg-gray-300 transform transition duration-75 ease-in-out hover:scale-105 active:scale-95"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SearchMenu;
