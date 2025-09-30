import { Search, SearchX, SortDescIcon } from "lucide-react";

const SearchBtn = ({ handleSearch, searchOpen }) => {
  return (
    <div>
      <p
        onClick={handleSearch}
        className={`size-30 shadow rounded-lg  flex flex-col gap-3 items-center justify-center cursor-pointer hover:bg-purple-800 hover:text-white transition duration-150 ease-in-out ${
          searchOpen ? "bg-purple-800 text-white" : "bg-white text-slate-800"
        }`}
      >
        <span>
          <Search />
        </span>
        <span>Search</span>
      </p>
    </div>
  );
};

const CancelSearchBtn = ({ cancelSearch }) => {
  return (
    <div>
      <p
        onClick={cancelSearch}
        className={`size-30 shadow rounded-lg  flex flex-col gap-3 items-center justify-center cursor-pointer hover:bg-purple-800 hover:text-white transition duration-150 ease-in-out `}
      >
        <span>
          <SearchX />
        </span>
        <span>Cancel Search</span>
      </p>
    </div>
  );
};

const SortBtn = ({ handleSort, sortOpen }) => {
  return (
    <div>
      <p
        onClick={handleSort}
        className={`size-30 shadow rounded-lg  flex flex-col gap-3 items-center justify-center cursor-pointer hover:bg-purple-800 hover:text-white transition duration-150 ease-in-out ${
          sortOpen ? "bg-purple-800 text-white" : "bg-white text-slate-800"
        }`}
      >
        <span>
          <SortDescIcon />
        </span>
        <span>Sort By</span>
      </p>
    </div>
  );
};

export { CancelSearchBtn, SearchBtn, SortBtn };
