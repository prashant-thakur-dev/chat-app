import { motion } from "framer-motion";

const ChatMessage = ({ message, sender }) => {
  const isUser = sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end ${isUser ? "justify-end" : "justify-start"} mb-2`}
    >
      {!isUser && (
        <img
          src="/bot-avatar.png"
          alt="Bot"
          className="w-8 h-8 rounded-full mr-2 shadow-md"
        />
      )}
      <div
        className={`p-3 rounded-2xl text-sm max-w-[80%] leading-relaxed shadow ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        {message}
      </div>
      {isUser && (
        <img
          src="/user-avatar.png"
          alt="You"
          className="w-8 h-8 rounded-full ml-2 shadow-md"
        />
      )}
    </motion.div>
  );
};

export default ChatMessage;
