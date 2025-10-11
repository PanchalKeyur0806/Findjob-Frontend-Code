import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ChatMenu from "./components/Chat/ChatMenu";

const ChatLayout = () => {
  const [notificationData, setNotificationData] = useState([]);

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
