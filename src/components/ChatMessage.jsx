import { motion } from "framer-motion";

const ChatMessage = ({ message, sender }) => {
  const isUser = sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      {!isUser && (
        <img
          src="/bot-avatar.png"
          alt="Bot avatar"
          className="w-8 h-8 rounded-full mr-2 shadow"
        />
      )}
      <div
        className={`p-3 max-w-[80%] text-sm rounded-2xl shadow leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
        }`}
      >
        {message}
      </div>
      {isUser && (
        <img
          src="/user-avatar.png"
          alt="User avatar"
          className="w-8 h-8 rounded-full ml-2 shadow"
        />
      )}
    </motion.div>
  );
};

export default ChatMessage;
