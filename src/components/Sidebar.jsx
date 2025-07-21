// Sidebar.jsx
import { Search, User, Circle } from "lucide-react";
import { useMemo } from "react";

const Sidebar = ({
  chats,
  currentChatId,
  onSelectChat,
  searchTerm,
  onSearchChange,
  darkMode,
}) => {
  // Convert chats object to array for easier manipulation
  const chatList = useMemo(() => {
    return Object.entries(chats).map(([id, chat]) => ({
      id,
      name: chat.name,
      lastMessage:
        chat.messages[chat.messages.length - 1]?.text || "No messages",
      time: chat.messages[chat.messages.length - 1]?.timestamp || "",
      unread: chat.messages.filter(
        (msg) => msg.status === "sent" && msg.sender !== "user"
      ).length,
      online: chat.online,
      avatar: chat.avatar || chat.name[0].toUpperCase(),
    }));
  }, [chats]);

  const filteredChats = useMemo(() => {
    return chatList.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [chatList, searchTerm]);

  const truncateMessage = (message, maxLength = 40) => {
    // Remove emoji patterns for length calculation
    const cleanMessage = message.replace(/:([a-zA-Z0-9_+-]+):/g, "");
    return cleanMessage.length > maxLength
      ? cleanMessage.substring(0, maxLength) + "..."
      : cleanMessage;
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen">
      {/* Search Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400">
            <User className="w-8 h-8 mb-2" />
            <p>No chats found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                  currentChatId === chat.id
                    ? "bg-blue-50 dark:bg-gray-700 border-r-2 border-blue-500"
                    : ""
                }`}
                aria-label={`Chat with ${chat.name}`}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                      {chat.avatar}
                    </div>
                    {/* Online Status Indicator */}
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                        chat.online ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {chat.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate flex-1">
                        {truncateMessage(chat.lastMessage)}
                      </p>
                      {chat.unread > 0 && (
                        <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center font-medium">
                          {chat.unread > 99 ? "99+" : chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <Circle className="w-2 h-2 fill-current mr-2" />
          HackChat v1.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
