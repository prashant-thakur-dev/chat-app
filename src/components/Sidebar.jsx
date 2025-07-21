const Sidebar = ({ onSelectChat }) => {
  return (
    <div className="h-full w-full p-4 text-white bg-gray-800/80 backdrop-blur-md">
      <h2 className="text-xl font-bold mb-6">💬 Chats</h2>
      <ul>
        <li
          onClick={onSelectChat}
          className="mb-2 cursor-pointer hover:bg-gray-700 p-3 rounded transition-all"
        >
          Hackathon Bot
        </li>
        <li
          onClick={onSelectChat}
          className="mb-2 cursor-pointer hover:bg-gray-700 p-3 rounded transition-all"
        >
          John Doe
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
