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

  return (
    <div className="flex p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-inner sticky bottom-0 z-10">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        aria-label="Message input"
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        aria-label="Send message"
        className="ml-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition shadow"
      >
        🚀
      </button>
    </div>
  );
};

export default MessageInput;
