import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ChatMenu from "./components/Chat/ChatMenu";
import useGetData from "./Hooks/FetchGetDataHook";

const ChatLayout = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [getData] = useGetData();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchNotifications() {
      const response = await getData(`${baseUrl}api/notifications/follow/me`, {
        withCredentials: true,
      });

      setNotificationData(response.data);
    }

    fetchNotifications();
  }, []);

  return (
    <>
      <ChatMenu
        notificationData={notificationData}
        setNotificationData={setNotificationData}
      />
      <Outlet context={[notificationData, setNotificationData]} />
    </>
  );
};

export default ChatLayout;
