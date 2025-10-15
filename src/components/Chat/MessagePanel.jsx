const MessagePanel = ({
  messages,
  user,
  messageEndRef,
  content,
  handleContent,
  handleKeyDown,
  handleSendMessage,
}) => {
  return (
    <div className="flex flex-col justify-between h-full max-h-screen bg-white p-2 sm:p-4 md:p-6">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-3 px-1 sm:px-2 md:px-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {messages &&
          messages.map((msg) => {
            const isOwnMsg = msg.sender[0]._id === user._id;

            return (
              <div
                key={msg._id}
                className={`flex ${isOwnMsg ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[75%] md:max-w-[60%] break-words px-4 py-2 rounded-2xl shadow-md ${
                    isOwnMsg
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm sm:text-base">{msg.content}</p>
                </div>
              </div>
            );
          })}

        <div ref={messageEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 sm:gap-4 mt-3 sm:mt-5 border-t border-gray-300 pt-3">
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
