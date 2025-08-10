import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import { IoReorderThreeOutline, IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  function handleChange() {
    setOpen(!isOpen);
  }

  return (
    <header className="shadow">
      <nav className="relative max-w-[1200px] h-15 mx-auto px-3 flex justify-between items-center ">
        <div id="logo">
          <h1 className="text-3xl font-extrabold font-mono">FoundIt</h1>
        </div>
        <div id="navbar">
          <ul className="hidden lg:flex gap-3">
            <li>Home</li>
            <li>Opportunities</li>
            <li>Chat</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="flex gap-3 items-center">
          <div id="authentication" className="flex gap-3">
            <div className="bg-purple-800 text-white border border-white px-3 py-1 rounded ">
              <button className="cursor-pointer">Register</button>
            </div>
            <div className="border border-purple-800 bg-white text-purple-800 px-3 py-1 rounded">
              <button className="cursor-pointer">Login</button>
            </div>
            <div className="bg-purple-800 text-white border border-white px-3 py-1 rounded ">
              <button className="cursor-pointer">Logout</button>
            </div>
          </div>

          <div className="lg:hidden text-4xl">
            {isOpen ? (
              <IoClose onClick={handleChange} />
            ) : (
              <IoReorderThreeOutline onClick={handleChange} />
            )}
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden">
          <MobileNavbar />
        </div>
      )}
    </header>
  );
};

export default Navbar;
