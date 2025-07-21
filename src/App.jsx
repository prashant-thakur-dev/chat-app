import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

const initialChats = {
  "hackathon-bot": {
    name: "Hackathon Bot",
    messages: [{ text: "Welcome to HackChat!", sender: "bot" }],
  },
  "john-doe": {
    name: "John Doe",
    messages: [{ text: "Hey! How can I help you?", sender: "bot" }],
  },
};

function App() {
  const [chats, setChats] = useState(initialChats);
  const [currentChatId, setCurrentChatId] = useState("hackathon-bot");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentMessages = chats[currentChatId].messages;

  const handleSend = (msg) => {
    const userMessage = { text: msg, sender: "user" };
    const updatedMessages = [...currentMessages, userMessage];

    setChats((prev) => ({
      ...prev,
      [currentChatId]: {
        ...prev[currentChatId],
        messages: updatedMessages,
      },
    }));
    

    setIsTyping(true);

    setTimeout(() => {
      const botReplies = [
        "Sure thing! ✅",
        "Can you clarify?",
        "Working on it!",
        "Sounds good!",
      ];
      const botMessage = {
        text: botReplies[Math.floor(Math.random() * botReplies.length)],
        sender: "bot",
      };

      setChats((prev) => ({
        ...prev,
        [currentChatId]: {
          ...prev[currentChatId],
          messages: [...prev[currentChatId].messages, botMessage],
        },
      }));

      setIsTyping(false);
    }, 1000);
  };

  const handleChatSwitch = (chatId) => {
    setCurrentChatId(chatId);
    setSidebarOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden relative bg-gray-100 dark:bg-gray-900 transition-colors">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Toggle button */}
      <div className="md:hidden p-4 z-30">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          ☰ Menu
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-30 h-full w-64 bg-gray-800 text-white transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex-shrink-0 shadow-lg`}
      >
        <Sidebar currentChatId={currentChatId} onSelectChat={handleChatSwitch} />
      </aside>

      {/* Main Chat Area */}
      <main className="flex flex-col flex-1 z-10">
        <ChatWindow
          messages={chats[currentChatId].messages}
          isTyping={isTyping}
          title={chats[currentChatId].name}
        />
        <MessageInput onSend={handleSend} />
      </main>
    </div>
  );
}

export default App;
