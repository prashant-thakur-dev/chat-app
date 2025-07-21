import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatMessage from "./ChatMessage";

const ChatWindow = ({ messages, isTyping, title = "Chat" }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-800 h-[calc(100vh-8rem)] md:h-full"
    >
      <h2 className="text-center text-gray-600 dark:text-gray-300 text-lg font-semibold mb-4 sticky top-0 bg-white dark:bg-gray-800 py-2 z-10 border-b border-gray-200 dark:border-gray-700">
        {title} 💬
      </h2>

      {messages.length === 0 && (
        <p className="text-center text-gray-400 mt-8">Start chatting...</p>
      )}

      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg.text} sender={msg.sender} />
      ))}

      {isTyping && (
        <div className="flex items-center space-x-1 ml-2 mb-2">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-[0ms]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-[150ms]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-[300ms]" />
        </div>
      )}

      <div ref={endRef} />
    </motion.div>
  );
};

export default ChatWindow;
