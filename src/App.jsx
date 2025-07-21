// App.jsx
import { useState, useEffect, useCallback } from "react";
import { Menu, Sun, Moon, Settings } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  // Initialize dark mode from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved
      ? JSON.parse(saved)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Initialize chats from localStorage or use default
  const getInitialChats = () => {
    const saved = localStorage.getItem("chats");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Failed to parse saved chats:", error);
      }
    }
    return {
      "hackathon-bot": {
        name: "Hackathon Bot",
        messages: [
          {
            id: Date.now(),
            text: "Welcome to HackChat! I'm here to help you with your hackathon project. :rocket:",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "read",
          },
        ],
        online: true,
        avatar: "B",
      },
      "john-doe": {
        name: "John Doe",
        messages: [
          {
            id: Date.now() + 1,
            text: "Hey! How can I help you today? :wave:",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "read",
          },
        ],
        online: true,
        avatar: "J",
      },
      "sarah-wilson": {
        name: "Sarah Wilson",
        messages: [
          {
            id: Date.now() + 2,
            text: "Let's discuss the project timeline and milestones :star:",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "sent",
          },
        ],
        online: false,
        avatar: "S",
      },
    };
  };

  const [chats, setChats] = useState(getInitialChats);
  const [currentChatId, setCurrentChatId] = useState("hackathon-bot");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("connected");

  const formatTime = useCallback(() => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // Persist dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Persist chats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("chats", JSON.stringify(chats));
    } catch (error) {
      console.error("Failed to save chats:", error);
    }
  }, [chats]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [sidebarOpen]);

  // Enhanced bot responses
  const getBotResponse = useCallback((userMessage) => {
    const responses = {
      greeting: [
        "Hello! :wave:",
        "Hi there! :smile:",
        "Hey! How can I help? :thumbs_up:",
      ],
      question: [
        "That's interesting! Can you tell me more?",
        "Great question! :thinking:",
        "Let me help you with that :rocket:",
      ],
      project: [
        "That sounds like an amazing project! :star:",
        "I love working on projects like this :fire:",
        "Let's build something awesome! :rocket:",
      ],
      default: [
        "That sounds great! :thumbs_up:",
        "Can you tell me more about that?",
        "I'm working on it! :fire:",
        "Absolutely! Let's do it :rocket:",
        "Interesting point! :star:",
        "I'll help you with that :heart:",
      ],
    };

    const message = userMessage.toLowerCase();
    let responseArray = responses.default;

    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      responseArray = responses.greeting;
    } else if (
      message.includes("?") ||
      message.includes("how") ||
      message.includes("what") ||
      message.includes("why")
    ) {
      responseArray = responses.question;
    } else if (
      message.includes("project") ||
      message.includes("build") ||
      message.includes("develop")
    ) {
      responseArray = responses.project;
    }

    return responseArray[Math.floor(Math.random() * responseArray.length)];
  }, []);

  const handleSend = useCallback(
    (msg) => {
      if (!msg.trim()) return;

      const messageId = Date.now();
      const userMessage = {
        id: messageId,
        text: msg,
        sender: "user",
        timestamp: formatTime(),
        status: "sent",
      };

      setChats((prev) => ({
        ...prev,
        [currentChatId]: {
          ...prev[currentChatId],
          messages: [...prev[currentChatId].messages, userMessage],
        },
      }));

      setIsTyping(true);

      // Simulate bot response with realistic delay
      const responseDelay = 800 + Math.random() * 1500;

      setTimeout(() => {
        const botMessage = {
          id: Date.now(),
          text: getBotResponse(msg),
          sender: "bot",
          timestamp: formatTime(),
          status: "sent",
        };

        setChats((prev) => ({
          ...prev,
          [currentChatId]: {
            ...prev[currentChatId],
            messages: [...prev[currentChatId].messages, botMessage],
          },
        }));

        setIsTyping(false);
      }, responseDelay);
    },
    [currentChatId, formatTime, getBotResponse]
  );

  const handleChatSwitch = useCallback((chatId) => {
    setCurrentChatId(chatId);
    setSidebarOpen(false);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const currentChat = chats[currentChatId];

  if (!currentChat) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Chat not found
          </h2>
          <button
            onClick={() => setCurrentChatId(Object.keys(chats)[0])}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to first chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}
    >
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 fixed lg:relative z-50 lg:z-0 
        transition-transform duration-300 ease-in-out`}
      >
        <Sidebar
          chats={chats}
          currentChatId={currentChatId}
          onSelectChat={handleChatSwitch}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          darkMode={darkMode}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                HackChat
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              {/* Connection Status */}
              <div
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === "connected"
                    ? "bg-green-500"
                    : connectionStatus === "connecting"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                title={`Status: ${connectionStatus}`}
              />

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Chat Window */}
        <ChatWindow
          messages={currentChat.messages}
          isTyping={isTyping}
          title={currentChat.name}
          avatar={currentChat.avatar}
          onlineStatus={currentChat.online}
          darkMode={darkMode}
        />

        {/* Message Input */}
        <MessageInput
          onSend={handleSend}
          disabled={isTyping}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
