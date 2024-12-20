
function Chat() {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/4 bg-white border-r border-gray-300">
                <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                    <h1 className="text-2xl font-semibold">Chat Web</h1>
                    <div className="relative">
                        <button id="menuButton" className="focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                            </svg>
                        </button>
                        {/* <!-- Menu Dropdown --> */}
                        <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
                            <ul className="py-2 px-3">
                                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                                {/* <!-- Add more menu options here --> */}
                            </ul>
                        </div>
                    </div>
                </header>
        
                {/* <!-- Contact List --> */}
                <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          
            
                    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img src="https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Fiona</h2>
                            <p className="text-gray-600">I heard theres a new exhibit at the art museum. Interested?</p>
                        </div>
                    </div>
            
                    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img src="https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">George</h2>
                            <p className="text-gray-600">I tried that new cafe downtown. The coffee was fantastic!</p>
                        </div>
                    </div>
            
                    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img src="https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Hannah</h2>
                            <p className="text-gray-600">Im planning a hiking trip next month. Want to join?</p>
                        </div>
                    </div>
            
                    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img src="https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Ian</h2>
                            <p className="text-gray-600">Lets catch up soon. Its been too long!</p>
                        </div>
                    </div>
            
                    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img src="https://placehold.co/200x/30916c/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Jack</h2>
                            <p className="text-gray-600">Remember that hilarious joke you told me? I cat stop laughing!</p>
                        </div>
                    </div>
            
            
                </div>
            </div>
        
            {/* <!-- Main Chat Area --> */}
            <div className="flex-1">
                {/* <!-- Chat Header --> */}
                <header className="bg-white p-4 text-gray-700">
                    <h1 className="text-2xl font-semibold">Alice</h1>
                </header>
            
                {/* <!-- Chat Messages --> */}
                <div className="h-screen overflow-y-auto p-4 pb-36">
                    {/* <!-- Incoming Message --> */}
                    <div className="flex mb-4 cursor-pointer">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p className="text-gray-700">Hey Bob, hows it going?</p>
                        </div>
                    </div>
               
                    {/* <!-- Outgoing Message --> */}
                    <div className="flex justify-end mb-4 cursor-pointer">
                        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                            <p>Hi Alice! Im good, just finished a great book. How about you?</p>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                            <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                        </div>
                    </div>
               
               
                    {/* <!-- Chat Input --> */}
                    <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                        <div className="flex items-center">
                            <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
                            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}
    {/* <script>
      // JavaScript for showing/hiding the menu
      const menuButton = document.getElementById('menuButton');
      const menuDropdown = document.getElementById('menuDropdown');
      
      menuButton.addEventListener('click', () => {
        if (menuDropdown.classNameList.contains('hidden')) {
          menuDropdown.classNameList.remove('hidden');
        } else {
          menuDropdown.classNameList.add('hidden');
        }
      });
      
      // Close the menu if you click outside of it
      document.addEventListener('click', (e) => {
        if (!menuDropdown.contains(e.target) && !menuButton.contains(e.target)) {
          menuDropdown.classNameList.add('hidden');
        }
      });
    </script> */}
  


export default Chat