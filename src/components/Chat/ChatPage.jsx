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
import { usePatchData } from "../../Hooks/usePatchData";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [asideOpen, setAsideOpen] = useState(false);

  const [selectChat, setSelectChat] = useState();
  const [unreadMsg, setUnreadMsg] = useState(() => {
    const saved = localStorage.getItem("unreadMsg");
    return saved ? JSON.parse(saved) : {};
  });

  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  const [getData, , , , progress] = useGetData();
  const [postData] = usePostData();
  const [patchData] = usePatchData();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  const socket = useSocket();
  const { user } = useAuth();

  const messageEndRef = useRef(null);
  const selectChatRef = useRef(null);
  const chatsRef = useRef([]);

  // whenever unreadMsg change, store it on localStorage
  useEffect(() => {
    localStorage.setItem("unreadMsg", JSON.stringify(unreadMsg));
  }, [unreadMsg]);

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

  const handleSelectChat = async (chat) => {
    if (chat.status === "disabled") {
      alert("Follow this user to chat with him");
      return;
    }
    setSelectChat(chat);
    setUnreadMsg((prev) => ({
      ...prev,
      [chat._id]: 0,
    }));

    // update the message to read
    await patchData(`${baseUrl}api/messages/${chat._id}/read`, {});
  };

  // get all messages
  const getMessages = async () => {
    const response = await getData(
      `${baseUrl}api/messages/${selectChatRef.current?._id}`,
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

  // handle latestMessage on deletion
  const updateLastMsgOnDeletion = async (chatId, message) => {
    const chatToUpdate = chats.find((chat) => chat._id === chatId);
    if (!chatToUpdate) return;

    // find the remaingMsgs and find the latestMessage
    const remaingMsg = messages.filter((msg) => msg._id !== message._id);
    const newLastestMsg = remaingMsg[remaingMsg.length - 1] || null;

    // update the latest msgs
    chatToUpdate.latestMessage[0] = newLastestMsg;

    // save changes to chat
    setChats([chatToUpdate, ...chats.filter((chat) => chat._id !== chatId)]);
  };

  // handle delete messages
  const handleDeleteMsgs = async (message) => {
    // get the chatId
    const chatId = selectChatRef.current?._id;

    // delete the current msg
    const response = await axios.delete(
      `${baseUrl}api/messages/${chatId}/${message._id}`,
      {
        withCredentials: true,
      }
    );

    // remove the deleted msg from the "messages" state
    setMessages((prev) =>
      prev.filter((msg) => msg._id !== response.data.data._id)
    );

    // update the latestMsg on chat
    updateLastMsgOnDeletion(message.chat, message);
  };

  // handle message
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  // send message when enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      handleSendMessage();
    }
  };

  // when new message is received
  const onMessageRecived = async (message) => {
    const chatId = message.chat;
    const currentSelectedChats = selectChatRef.current;

    if (message.chat !== currentSelectedChats?._id) {
      setUnreadMsg((prev) => ({ ...prev, [chatId]: (prev[chatId] || 0) + 1 }));
    } else {
      await patchData(`${baseUrl}api/messages/${chatId}/read`, {});
      setMessages((prev) => [...prev, message]);
      setUnreadMsg((prev) => ({ ...prev, [chatId]: 0 }));
    }

    updateChatLastMessage(message.chat, message);
  };

  // this function runs when user reads the message
  const onMessageRead = (data) => {
    const currentChat = selectChatRef.current?._id;

    if (
      currentChat &&
      currentChat === data.chatId &&
      data.targetUserId !== data.userId
    ) {
      getMessages();
    }
  };

  const onMessageDeleted = (data) => {
    if (data.chat === selectChatRef.current?._id) {
      setMessages((prev) => prev.filter((msg) => msg._id !== data._id));
    }

    // update the last msg
    updateLastMsgOnDeletion(data.chat, data);
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

    // listing on message read
    socket.on("message_read", onMessageRead);

    // listing on message delete
    socket.on("message_deleted", onMessageDeleted);

    return () => {
      socket.off("chat_created");
      socket.off("chat_updated");
      socket.off("chat_deleted");
      socket.off("message_received");
      socket.off("message_read");
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
                messages={messages}
                user={user}
                messageEndRef={messageEndRef}
                // Input
                content={content}
                handleContent={handleContent}
                handleKeyDown={handleKeyDown}
                handleSendMessage={handleSendMessage}
                handleDeleteMsgs={handleDeleteMsgs}
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
