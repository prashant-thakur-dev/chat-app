import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  const [messages, setMessages] = useState([
    { text: "Welcome to HackChat!", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, { text: msg, sender: "user" }]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponses = [
        "Hello there! 👋",
        "I'm here to help!",
        "Need anything?",
      ];
      const reply =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSidebarClose = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden relative">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={handleSidebarClose}
          style={{ touchAction: "none" }}
        />
      )}

      {/* Toggle button */}
      <div className="md:hidden p-2 z-30">
        <button
          className="bg-gray-300 px-3 py-2 rounded shadow"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰ Menu
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-30 h-full w-64 bg-gray-800/80 backdrop-blur-md transition-transform transform shadow-lg ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex-shrink-0`}
      >
        <Sidebar onSelectChat={handleSidebarClose} />
      </div>

      {/* Main Area */}
      <div className="flex flex-col flex-1 z-10">
        <ChatWindow messages={messages} isTyping={isTyping} />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default App;
