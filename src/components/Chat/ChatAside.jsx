import { BlocksIcon, ShieldBan, X } from "lucide-react";
import React from "react";
import { useAuth } from "../../Contexts/useAuth";

const ChatAside = ({ chats, asideOpen, onclick, setSelectChat, unreadMsg }) => {
  const { user } = useAuth();
  console.log(user);

  return (
    <aside
      className={`fixed md:static top-[187px] bg-white z-10 md:w-4/9 w-[95%] mx-auto h-[85vh] overflow-y-scroll px-2 pt-5   font-poppins transition-transform md:translate-x-0 ${
        asideOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div onClick={onclick} className="flex flex-row-reverse md:hidden">
        <X />
      </div>
      {chats?.length >= 1 ? (
        <div className="divide-y divide-gray-500 space-y-4">
          {chats &&
            chats?.map((chat) => {
              const count = unreadMsg[chat._id] || 0;
              const opponent = chat.users.find((u) => u._id !== user._id);

              return (
                <div
                  onClick={() => setSelectChat(chat)}
                  key={chat._id}
                  className="py-3 hover:bg-gray-100 rounded-xl px-2 cursor-pointer"
                >
                  <div className="flex items-center gap-10">
                    <div className="size-10 font-bold text-white px-5 py-2 rounded-full bg-purple-600 flex items-center justify-center">
                      {chat.status === "disabled" ? (
                        <p>
                          <ShieldBan />
                        </p>
                      ) : (
                        <p>{opponent?.name.charAt(0).toUpperCase()}</p>
                      )}
                    </div>
                    <div>
                      <p className=" font-medium text-gray-700">
                        {opponent?.name}
                      </p>
                      <p className="text-gray-500 text-sm">{opponent?.email}</p>
                    </div>

                    {count > 0 && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        {count}
                      </span>
                    )}
                  </div>
                  <div className="text-center text-sm mt-3 text-gray-500 font-medium">
                    <p>
                      {chat?.latestMessage[0]?.content || "No Messages found"}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-2xl font-poppins font-medium text-gray-600">
            No Chats Found
          </h1>
        </div>
      )}
    </aside>
  );
};

export default ChatAside;
