import { BlocksIcon, ShieldBan, X } from "lucide-react";
import React from "react";

const ChatAside = ({ chats, asideOpen, onclick }) => {
  return (
    <aside
      className={`fixed md:static top-[187px] bg-white z-10 md:w-4/9 w-[95%] mx-auto h-screen overflow-y-scroll px-2 pt-5   font-poppins transition-transform md:translate-x-0 ${
        asideOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div onClick={onclick} className="flex flex-row-reverse md:hidden">
        <X />
      </div>
      {chats?.length >= 1 ? (
        <div className="divide-y divide-gray-500 space-y-4">
          {chats &&
            chats?.map((chat) => (
              <div
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
                      <p>
                        {chat.users.map((user) =>
                          user.name.charAt(0).toUpperCase()
                        )}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className=" font-medium text-gray-700">
                      {chat.users.map((user) => user.name)}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {chat.users.map((user) => user.email)}
                    </p>
                  </div>
                </div>
                <div className="text-center text-sm mt-3 text-gray-500 font-medium">
                  <p>
                    <span>{chat.latestMessage || "No Messages found"}</span>
                  </p>
                </div>
              </div>
            ))}
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
