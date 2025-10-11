import {
  Bell,
  House,
  MessageCircleCode,
  UserMinus,
  UserPlus,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { NavLink, useSearchParams } from "react-router-dom";
import useGetData from "../../Hooks/FetchGetDataHook";
import usePostData from "../../Hooks/FetchDataHook";
import { useSocket } from "../../Contexts/useSocket";

const ChatMenu = ({ notificationData, setNotificationData }) => {
  const [searchOpen, setSeachOpen] = useState(false);

  const [userData, setUserData] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [getData] = useGetData();
  const [postData] = usePostData();

  // ref
  const searchBoxRef = useRef(null);

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  const email = searchParams.get("email") || "";

  const socket = useSocket();

  const buildBaseUrl = () => {
    const params = new URLSearchParams();
    if (email) params.set("email", email);

    return `${baseUrl}api/search?${params.toString()}`;
  };

  const updateParams = (params) => {
    const currentParams = new URLSearchParams(params);

    Object.keys(params).map((key) => {
      if (params[key]) currentParams.set(key, params[key]);
      else currentParams.delete(key);
    });

    setSearchParams(currentParams);
  };

  const handleParams = (e) => {
    const email = e.target.value;
    if (email.length >= 1) setSeachOpen(true);

    updateParams({ email });
  };

  //   socket.io connection
  useEffect(() => {
    if (!socket) throw Error("Socket Not found");

    socket.on("connect", () => {
      console.log("socket.connected");
    });

    // listing on following requests
    socket.on("follow", (data) => {
      setNotificationMsg(`${data.meta.userName} has followed you`);
    });

    // listing on unfollowing requests
    socket.on("unfollow", (data) => {
      setNotificationData((prev) =>
        prev.filter((u) => u.meta.userId !== data.meta.userId)
      );
    });

    return () => {
      socket.disconnect();
      socket.off("follow");
      socket.off("unfollow");
    };
  }, []);

  //   useeffect for searching the users
  useEffect(() => {
    // find the user
    async function searchUsers() {
      const response = await getData(buildBaseUrl(), {
        withCredentials: true,
      });

      setUserData(response.data);
    }
    searchUsers();

    // function for handling outside click event
    const handleOutsideClick = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setSeachOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    // remove the notification message after 3 second
    const timer = setTimeout(() => {
      setNotificationMsg("");
    }, 3000);

    // clean up
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [searchParams, notificationMsg]);

  // function for clearing search Input
  const clearSearch = () => {
    setSeachOpen(false);
    updateParams({ email: "" });
  };

  //   follow user
  const followUser = async (userId) => {
    const response = await postData(`${baseUrl}api/follow/${userId}`);

    if (response.status === "success") {
      setUserData((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isFollowing: true } : user
        )
      );
    }
  };

  //   UnFollow user
  const unFollowuser = async (userId) => {
    const response = await postData(`${baseUrl}api/unfollow/${userId}`);

    if (response.status === "success") {
      setUserData((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isFollowing: false } : user
        )
      );
    }
  };

  return (
    <>
      <section className="relative top-0">
        <header className="bg-white    font-poppins px-4 py-2  border-b-2 border-gray-300">
          <nav className="h-20  max-w-[800px] mx-auto flex items-center justify-between">
            {/* Company Logo */}
            <div>
              <h1 className="text-2xl font-semibold">FoundIt</h1>
            </div>

            {/* Search */}
            <div className="hidden sm:flex  items-center relative">
              <input
                type="search"
                name="email"
                id="email"
                onChange={handleParams}
                className="shadow px-4 py-2 rounded-md focus:outline-none w-full "
                placeholder="Search User By Email"
              />
              <X
                className="absolute right-3 cursor-pointer"
                onClick={clearSearch}
              />
            </div>

            {/* Navigation */}
            <div>
              <ul className="flex gap-4 md:gap-10 text-sm ">
                <li>
                  <NavLink to={"/"} className={"flex flex-col items-center"}>
                    <span>
                      <House size={18} />
                    </span>
                    <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={""} className={"flex flex-col items-center"}>
                    <span>
                      <MessageCircleCode size={18} />
                    </span>
                    <span>Message</span>
                  </NavLink>
                </li>
                <li className="relative">
                  <NavLink
                    to={"notifications"}
                    className={"flex flex-col items-center "}
                  >
                    <span>
                      <Bell size={18} />
                    </span>
                    <span>Notifications</span>
                    <span
                      className={`absolute right-1 top-0 bg-green-700 text-white rounded-full size-6 flex items-center justify-center font-semibold text-[12px] ${
                        notificationData?.length === 0 ? "hidden" : "block"
                      }`}
                    >
                      {notificationData?.length > 10
                        ? "10+"
                        : notificationData?.length}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <span className="text-[20px]">
                    <BsPeople />
                  </span>
                  Me
                </li>
              </ul>
            </div>
          </nav>

          <div className="flex sm:hidden  relative">
            <input
              type="search"
              name="email"
              id="email"
              onChange={handleParams}
              className="shadow px-4 py-2 rounded-md focus:outline-none w-full"
              placeholder="Search User By Email"
            />
            <X
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={clearSearch}
            />
          </div>
        </header>
        {searchOpen && (
          <div
            ref={searchBoxRef}
            className="w-[550px] h-[300px] overflow-y-scroll mx-auto shadow-2xl rounded-xl absolute left-1/2 -translate-x-1/2 bg-white z-10"
          >
            {userData && userData.length >= 1 ? (
              <div className="divide-y divide-gray-100">
                {userData.map((user) => (
                  <div
                    key={user._id}
                    className="px-5 py-2 rounded-md mt-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {user.email}
                        </p>
                      </div>
                      <div>
                        {user.isFollowing === true ? (
                          <button
                            onClick={() => unFollowuser(user._id)}
                            className="flex items-center  gap-3  cursor-pointer px-5 py-2.5 rounded-lg bg-gray-100  text-gray-700 font-medium transition-transform duration-200 ease-in active:scale-98 hover:bg-gray-300 mt-2 hover:shadow-md"
                          >
                            <span>
                              <UserMinus size={20} />
                            </span>
                            <span>UnFollow</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => followUser(user._id)}
                            className="flex items-center  gap-3  cursor-pointer px-5 py-2.5 rounded-lg bg-purple-600 text-white font-medium transition-transform duration-200 ease-in  active:scale-98 hover:bg-purple-700 hover:shadow-md "
                          >
                            <span>
                              <UserPlus size={20} />
                            </span>
                            <span>Follow</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-xl text-gray-500">Users not found</p>
              </div>
            )}
          </div>
        )}

        {notificationMsg && (
          <div className="absolute right-20 shadow-md transition-opacity duration-200 bg-white  rounded-lg mt-4">
            <p className=" px-6 py-3 flex items-center gap-5">
              <span>{notificationMsg}</span>
              <span
                className="cursor-pointer"
                onClick={() => setNotificationMsg("")}
              >
                <X size={20} />
              </span>
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default ChatMenu;
