import { useState } from "react";
import { IoReorderThreeOutline, IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import MobileNavbar from "./MobileNavbar";
import axios from "axios";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setOpen] = useState(false);

  function handleChange() {
    setOpen(!isOpen);
  }

  // check that project is in development
  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";

  // handle Logout
  const handleLogout = async () => {
    // setLoggingOut(true);
    try {
      const url = isDevelopment
        ? "http://localhost:7000/api/auth/logout"
        : import.meta.env.VITE_BACKEND_URL + "api/auth/logout";

      await axios.post(url, null, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthenticated(false);
    }
  };

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
          {isAuthenticated ? (
            <div id="authentication" className="flex gap-3">
              <div className="bg-purple-800 text-white border border-white px-3 py-1 rounded ">
                <button className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div id="authentication" className="flex gap-3">
              <div className="bg-purple-800 text-white border border-white px-3 py-1 rounded ">
                <button className="cursor-pointer">Register</button>
              </div>
              <div className="border border-purple-800 bg-white text-purple-800 px-3 py-1 rounded">
                <button className="cursor-pointer">Login</button>
              </div>
            </div>
          )}

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
