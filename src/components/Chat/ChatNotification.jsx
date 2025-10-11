import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import useGetData from "../../Hooks/FetchGetDataHook";
import { UserPlus } from "lucide-react";
import usePostData from "../../Hooks/FetchDataHook";
import { useSocket } from "../../Contexts/useSocket";
import { useOutletContext } from "react-router-dom";

const ChatNotification = () => {
  const [notificationData, setNotificationData] = useOutletContext();

  const [getData, getLoading, getMessage, getError, progress] = useGetData();
  const [postData] = usePostData();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  const socket = useSocket();

  useEffect(() => {
    if (!socket) console.error("Socket Not connected");

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("follow", (data) => {
      setNotificationData((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
      socket.off("follow");
    };
  }, []);

  useEffect(() => {
    async function fetchNotifications() {
      const response = await getData(`${baseUrl}api/notifications/follow/me`, {
        withCredentials: true,
      });

      setNotificationData(response.data);
    }

    fetchNotifications();
  }, []);

  //   follow user
  const followUser = async (userId) => {
    await postData(`${baseUrl}api/follow/${userId}`);

    const data = notificationData.filter(
      (notification) => notification.meta.userId !== userId
    );

    setNotificationData(data);
  };

  return (
    <div className="px-2  md:px-10">
      <LoadingBar color="#8b5cf6" progress={progress} />

      {/* Notification User */}
      <div className="flex justify-center">
        <div className=" mt-10  md:max-w-[600px] w-[95%]  shadow px-2 md:px-7 py-5">
          <div className="border-b-2 font-medium text-xl border-gray-300 rounded-md pb-1 px-3 mb-4">
            <h1 className="font-semibold">Follow Notification</h1>
          </div>

          <div className="overflow-y-scroll h-[420px] space-y-3 ">
            {notificationData && notificationData.length >= 1 ? (
              notificationData.map((notification) => (
                <div
                  key={notification._id}
                  className="w-full shadow-sm p-4 rounded-md  bg-gray-50 hover:bg-purple-50 transition-colors duration-100 border border-gray-100 cursor-pointer"
                >
                  <div className="flex justify-between md:flex-row flex-col">
                    <div className="flex gap-5 items-center">
                      <div>
                        <p className="rounded-full size-8 flex items-center justify-center text-white bg-purple-500">
                          {notification.meta.userName.charAt(0).toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {notification.meta.userName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification.meta.userEmail}
                        </p>
                      </div>
                    </div>

                    {/* Follow BTN */}
                    <div className="mt-5">
                      <button
                        onClick={() => followUser(notification.meta.userId)}
                        className="flex gap-3 flex-row items-center justify-center w-fit px-4 mx-10 bg-purple-600 rounded-full size-9 text-white cursor-pointer "
                      >
                        <span>
                          <UserPlus size={18} />
                        </span>
                        <span>Follow</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500 text-xl">Notifications not found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatNotification;
