function ChatBot() {
  return (
    <div>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          id="open-chat"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Add an icon here if needed */}
          </svg>
          Chat with Admin Bot
        </button>
      </div>
      <div
        id="chat-container"
        className="hidden fixed bottom-16 right-4 w-96 max-h-[400px] overflow-y-auto"
      >
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">Admin Bot</p>
            <button
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Add an icon here if needed */}
              </svg>
            </button>
          </div>
          <div
            id="chatbox"
            className="p-4 h-80 overflow-y-auto flex flex-col space-y-2"
          >
            {/* Chat messages will be displayed here */}
            <div className="mb-2 text-right">
              <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                hello
              </p>
            </div>
            <div className="mb-2">
              <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                This is a response from the chatbot.
              </p>
            </div>
            {/* Additional messages */}
          </div>
          <div className="p-4 border-t flex">
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              id="send-button"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
