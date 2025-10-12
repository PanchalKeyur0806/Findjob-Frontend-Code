import React, { useEffect, useState } from "react";
import ChatMenu from "./ChatMenu";
import useGetData from "../../Hooks/FetchGetDataHook";
import ChatAside from "./ChatAside";
import { Menu } from "lucide-react";
import LoadingBar from "react-top-loading-bar";
import { useSocket } from "../../Contexts/useSocket";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [asideOpen, setAsideOpen] = useState(false);

  const [getData, getLoading, getMessage, getError, progress] = useGetData();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  const socket = useSocket();

  // listing for sockets
  useEffect(() => {
    if (!socket) console.error("Socket not found");

    socket.on("chat_created", (chatData) => {
      setChats((prev) => [...prev, chatData]);
    });

    socket.on("chat_updated", (chat) => {
      setChats((prev) => prev.map((c) => (c._id === chat._id ? chat : c)));
    });

    socket.on("chat_deleted", (chat) => {
      setChats((prev) => prev.map((c) => (c._id === chat._id ? chat : c)));
    });

    return () => {
      socket.disconnect();
      socket.off("chat_created");
      socket.off("chat_updated");
      socket.off("chat_deleted");
    };
  }, []);

  useEffect(() => {
    async function getAllUserChats() {
      const response = await getData(`${baseUrl}api/chats/user/chats`, {
        withCredentials: true,
      });

      setChats(response.data);
    }

    getAllUserChats();
  }, []);

  const hanldeAside = () => {
    setAsideOpen(true);
  };

  return (
    <>
      <LoadingBar color="#8b5cf6" progress={progress} />
      <main className="px-3 flex gap-5">
        <ChatAside
          chats={chats}
          asideOpen={asideOpen}
          onclick={() => setAsideOpen(false)}
        />

        <section className="md:w-5/9 w-[95%] mx-auto">
          <div className="mt-5 w-full  md:hidden cursor-pointer flex flex-row-reverse">
            <Menu onClick={hanldeAside} />
          </div>
        </section>
      </main>
    </>
  );
};

export default ChatPage;
