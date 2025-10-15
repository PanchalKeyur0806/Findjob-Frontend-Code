import React, { useEffect, useRef, useState } from "react";
import ChatMenu from "./ChatMenu";
import useGetData from "../../Hooks/FetchGetDataHook";
import ChatAside from "./ChatAside";
import { Menu } from "lucide-react";
import LoadingBar from "react-top-loading-bar";
import { useSocket } from "../../Contexts/useSocket";
import MessagePanel from "./MessagePanel";
import usePostData from "../../Hooks/FetchDataHook";
import { useAuth } from "../../Contexts/useAuth";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [asideOpen, setAsideOpen] = useState(false);

  const [selectChat, setSelectChat] = useState();
  const [unreadMsg, setUnreadMsg] = useState({});

  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  const [getData, , , , progress] = useGetData();
  const [postData] = usePostData();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  const socket = useSocket();
  const { user } = useAuth();

  const messageEndRef = useRef(null);
  const selectChatRef = useRef(null);
  const chatsRef = useRef([]);

  // whenever stats changes update the ref
  useEffect(() => {
    selectChatRef.current = selectChat;
  }, [selectChat]);

  useEffect(() => {
    chatsRef.current = chats;
  }, [chats]);

  // useEffect for getting all the chats
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

  const handleSelectChat = (chat) => {
    setSelectChat(chat);
    setUnreadMsg((prev) => ({
      ...prev,
      [chat._id]: 0,
    }));
  };

  // get all messages
  const getMessages = async () => {
    const response = await getData(
      `${baseUrl}api/messages/${selectChat?._id}`,
      {
        withCredentials: true,
      }
    );

    setMessages(response.messages);
  };

  useEffect(() => {
    if (selectChat?._id) getMessages();
  }, [selectChat]);

  useEffect(() => {
    // scroll to bottom of the message (RECENT)
    const scrollToBottom = () => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToBottom();
  }, [messages]);

  // update the last send message
  const updateChatLastMessage = (chatUpdatedId, message) => {
    //
    const currentChats = chatsRef.current;
    const chatToUpdate = currentChats?.find(
      (chat) => chat._id === chatUpdatedId
    );

    // if the chat is found
    if (chatToUpdate) {
      chatToUpdate.latestMessage = [message];
      chatToUpdate.updatedAt = message.updatedAt;

      setChats([
        chatToUpdate,
        ...chats.filter((chat) => chat._id !== chatUpdatedId),
      ]);
    }
  };

  // send message to chat
  const handleSendMessage = async () => {
    if (!content.trim()) return;
    const response = await postData(
      `${baseUrl}api/messages/${selectChat?._id}`,
      {
        content,
      }
    );
    const newMsg = response.receivedMsg;

    setContent("");
    setMessages((prev) => [...prev, newMsg]);
    updateChatLastMessage(newMsg.chat, newMsg);
  };

  // handle message
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  // send message when enter key is pressed
  const handleKeyDown = (e) => {
    if ((e.key === "Enter") & (e.target.value.trim() !== "")) {
      handleSendMessage();
    }
  };

  console.log("chats", chats);

  // this is something new
  const onMessageRecived = (message) => {
    const chatId = message.chat;
    const currentSelectedChats = selectChatRef.current;

    if (message.chat !== currentSelectedChats?._id) {
      setUnreadMsg((prev) => ({ ...prev, [chatId]: (prev[chatId] || 0) + 1 }));
    } else {
      setMessages((prev) => [...prev, message]);
      setUnreadMsg((prev) => ({ ...prev, [chatId]: 0 }));
    }

    updateChatLastMessage(message.chat, message);
  };

  // listing for sockets
  useEffect(() => {
    if (!socket) {
      console.error("Socket not found");
      return;
    }

    // when new chats is created
    socket.on("chat_created", (chatData) => {
      setChats((prev) => [...prev, chatData]);
    });

    socket.on("chat_updated", (chat) => {
      setChats((prev) => prev.map((c) => (c._id === chat._id ? chat : c)));
    });

    socket.on("chat_deleted", (chat) => {
      setChats((prev) => prev.map((c) => (c._id === chat._id ? chat : c)));
    });

    // listing on receivedMsg
    socket.on("message_received", onMessageRecived);

    return () => {
      socket.off("chat_created");
      socket.off("chat_updated");
      socket.off("chat_deleted");
      socket.off("message_received");
    };
  }, [socket, chats]);

  return (
    <>
      <LoadingBar color="#8b5cf6" progress={progress} />
      <main className="px-3 flex gap-5">
        <ChatAside
          chats={chats}
          asideOpen={asideOpen}
          onclick={() => setAsideOpen(false)}
          setSelectChat={handleSelectChat}
          unreadMsg={unreadMsg}
        />

        <section className="md:w-5/9 w-[95%] mx-auto h-[85vh] relative">
          <div className="fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md md:hidden cursor-pointer">
            <Menu size={26} className="text-purple-800" onClick={hanldeAside} />
          </div>

          {/* Chat messages */}
          <div className="h-full">
            {selectChat ? (
              <MessagePanel
                key={selectChat._id}
                // chatId={selectChat._id}
                // chats={chats}
                // setChats={setChats}
                messages={messages}
                user={user}
                messageEndRef={messageEndRef}
                // Input
                content={content}
                handleContent={handleContent}
                handleKeyDown={handleKeyDown}
                handleSendMessage={handleSendMessage}
              />
            ) : (
              <div className="h-screen flex items-center justify-center text-xl font-poppins font-semibold">
                <p>Please Select Chat To See Message</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default ChatPage;
