import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatMessage from "./ChatMessage";

const ChatWindow = ({ messages, isTyping }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex-1 p-4 overflow-y-auto bg-white h-[calc(100vh-8rem)] md:h-full"
    >
      <h2 className="text-lg font-semibold text-gray-600 mb-4 text-center sticky top-0 bg-white z-10 py-2 border-b">
        Hackathon Bot 💬
      </h2>

      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg.text} sender={msg.sender} />
      ))}

      {isTyping && (
        <div className="flex items-center space-x-1 ml-2 mb-2">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        </div>
      )}

      <div ref={endRef} />
    </motion.div>
  );
};

export default ChatWindow;
