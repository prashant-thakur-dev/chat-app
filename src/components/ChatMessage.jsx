// ChatMessage.jsx
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import emoji from "emoji-dictionary";

const ChatMessage = ({ message, sender, timestamp }) => {
  const isUser = sender === "user";

  // Convert :emoji: text to real emojis
  const renderEmoji = (text) =>
    text.replace(
      /:([a-zA-Z0-9_+-]+):/g,
      (match, name) => emoji.getUnicode(name) || match
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end ${
        isUser ? "justify-end" : "justify-start"
      } mb-3`}
    >
      {!isUser && (
        <img
          src="/bot-avatar.png"
          alt="Bot avatar"
          className="w-8 h-8 rounded-full mr-2 shadow"
        />
      )}
      <div
        className={`p-3 ps-8 max-w-[80%] text-sm rounded-2xl shadow leading-relaxed relative ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
        }`}
      >
        <ReactMarkdown>{renderEmoji(message)}</ReactMarkdown>
        <span className="text-[0.65rem] text-gray-400 absolute bottom-1 right-2">
          {timestamp}
        </span>
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
