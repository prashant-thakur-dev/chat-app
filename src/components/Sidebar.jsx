const Sidebar = ({ currentChatId, onSelectChat }) => {
  const chatList = [
    { id: "hackathon-bot", name: "Hackathon Bot" },
    { id: "john-doe", name: "John Doe" },
  ];

  return (
    <div className="h-full w-full p-4 bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-6">💬 Chats</h2>
      <ul>
        {chatList.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`mb-2 p-3 rounded cursor-pointer transition-all hover:bg-gray-700 ${
              chat.id === currentChatId ? "bg-gray-700" : ""
            }`}
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
