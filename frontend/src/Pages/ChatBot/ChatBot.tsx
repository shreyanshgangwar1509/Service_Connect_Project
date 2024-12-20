
function ChatBot() {
  return (
      
      <div>
<div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button id="open-chat" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path> */}
            </svg>
            Chat with Admin Bot
        </button>
    </div>
    <div id="chat-container" className="hidden fixed bottom-16 right-4 w-96">
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                <p className="text-lg font-semibold">Admin Bot</p>
                <button id="close-chat" className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {/* <path strokelinecap="round" strokelinejoin="round" strokewidth="2" d="M6 18L18 6M6 6l12 12"></path> */}
                    </svg>
                </button>
            </div>
            <div id="chatbox" className="p-4 h-80 overflow-y-auto">
              {/* <!-- Chat messages will be displayed here --> */}
              <div className="mb-2 text-right">
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">hello</p>
              </div>
              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
              </div>
              <div className="mb-2 text-right">
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">this example of chat</p>
              </div>
              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
              </div>
              <div className="mb-2 text-right">
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">design with tailwind</p>
              </div>
              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
              </div>
            </div>
            <div className="p-4 border-t flex">
                <input id="user-input" type="text" placeholder="Type a message" className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <button id="send-button" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
            </div>
        </div>
    </div>
      </div>
  )
}
{/* 
<script>
        const chatbox = document.getElementById("chatbox");
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const openChatButton = document.getElementById("open-chat");
const closeChatButton = document.getElementById("close-chat");

let isChatboxOpen = true; // Set the initial state to open

// Function to toggle the chatbox visibility
function toggleChatbox() {
    chatContainer.classNameList.toggle("hidden");
    isChatboxOpen = !isChatboxOpen; // Toggle the state
}

// Add an event listener to the open chat button
openChatButton.addEventListener("click", toggleChatbox);

// Add an event listener to the close chat button
closeChatButton.addEventListener("click", toggleChatbox);

// Add an event listener to the send button
sendButton.addEventListener("click", function () {
    const userMessage = userInput.value;
    if (userMessage.trim() !== "") {
        addUserMessage(userMessage);
        respondToUser(userMessage);
        userInput.value = "";
    }
});

userInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const userMessage = userInput.value;
        addUserMessage(userMessage);
        respondToUser(userMessage);
        userInput.value = "";
    }
});

function addUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classNameList.add("mb-2", "text-right");
    messageElement.innerHTML = `<p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function addBotMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classNameList.add("mb-2");
    messageElement.innerHTML = `<p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function respondToUser(userMessage) {
    // Replace this with your chatbot logic
    setTimeout(() => {
        addBotMessage("This is a response from the chatbot.");
    }, 500);
}

// Automatically open the chatbox on page load
toggleChatbox();

        </script> */}

export default ChatBot