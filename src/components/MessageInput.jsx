import { useState, useEffect, useRef } from "react";

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex p-4 bg-white border-t shadow-md sticky bottom-0 z-10">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message"
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />
      <button
        onClick={handleSend}
        className="ml-2 px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow hover:scale-105 active:scale-95 transition"
      >
        🚀
      </button>
    </div>
  );
};

export default MessageInput;
