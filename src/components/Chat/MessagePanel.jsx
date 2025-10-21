import { MoveDown, Trash } from "lucide-react";
import { useEffect, useRef } from "react";
import { Virtuoso } from "react-virtuoso";

const MessagePanel = ({
  messages,
  user,
  messageEndRef,
  content,
  handleContent,
  handleKeyDown,
  handleSendMessage,
  handleDeleteMsgs,
}) => {
  const virtuosoRef = useRef(null);

  // goto bottom
  const gotToBottom = () => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: messages.length - 1,
        align: "start",
        behavior: "auto",
      });
    }
  };

  // when message panel load it will automatically scroll to bottom of the message
  useEffect(() => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: messages.length - 1,
        align: "start",
        behavior: "auto",
      });
    }
  }, [messages]);

  // Each message item for Virtuoso
  const MessageItem = (index, msg) => {
    if (!msg || !msg.sender || !msg.sender[0] || !user) return null;

    const isOwnMsg = msg.sender[0]._id === user._id;

    return (
      <div
        className={`flex ${
          isOwnMsg ? "justify-end" : "justify-start"
        } px-1 sm:px-2 md:px-4 mb-3`}
      >
        <div
          className={`max-w-[80%] sm:max-w-[75%] md:max-w-[60%] flex items-center gap-4 break-words px-4 py-2 rounded-2xl shadow-md ${
            isOwnMsg ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          <div>
            <p className="text-sm sm:text-base">{msg.content}</p>

            {isOwnMsg && (
              <p className="text-xs mt-1 opacity-70 text-right">
                {msg.isRead === true ? "✓✓ Read" : "✓ Sent"}
              </p>
            )}
          </div>

          {isOwnMsg && (
            <button
              className="cursor-pointer px-2 py-1 text-white rounded-md mt-3 hover:bg-purple-800 transition-transform duration-200 ease-in-out hover:scale-103 active:scale-98"
              onClick={(e) => {
                e.stopPropagation();
                const ok = confirm(
                  "Are you sure you want to delete this message?"
                );
                if (ok) {
                  handleDeleteMsgs(msg);
                }
              }}
            >
              <Trash size={18} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between h-full max-h-screen bg-white p-2 sm:p-4 md:p-6">
      {/* Messages Container */}
      <div className="flex-1  overflow-hidden">
        {messages && messages.length > 0 && user ? (
          <Virtuoso
            ref={virtuosoRef}
            data={messages}
            itemContent={MessageItem}
            followOutput="auto"
            className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
            style={{ height: "100%" }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No messages yet
          </div>
        )}
        {/* <div ref={messageEndRef} /> */}
      </div>

      {/* go to bottom btn */}
      {messages.length >= 8 && (
        <button
          onClick={gotToBottom}
          className="fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-white hover:bg-gray-50 text-purple-600 shadow-lg rounded-full size-10 cursor-pointer grid place-items-center transition-all duration-200 hover:scale-110 active:scale-95 border border-purple-200"
        >
          <MoveDown size={20} />
        </button>
      )}

      {/* Input Box */}
      <div className=" flex items-center gap-2 sm:gap-4 mt-3  border-t border-gray-300 pt-3">
        <input
          type="text"
          name="content"
          id="content"
          value={content}
          onKeyDown={handleKeyDown}
          onChange={handleContent}
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-700 text-sm sm:text-base shadow-inner"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="px-3 sm:px-5 py-2 sm:py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white rounded-full transition-all duration-150 text-sm sm:text-base"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagePanel;
