// ChatMessage.jsx
import { CheckCheck, Check, Clock, AlertCircle } from "lucide-react";
import { useState, useMemo } from "react";

const ChatMessage = ({
  message,
  sender,
  timestamp,
  status = "sent",
  darkMode,
}) => {
  const [imageError, setImageError] = useState(false);
  const isUser = sender === "user";

  // Enhanced emoji map with more emojis
  const emojiMap = useMemo(
    () => ({
      // Faces
      smile: "😊",
      grin: "😁",
      joy: "😂",
      wink: "😉",
      blush: "😊",
      kiss: "😘",
      love: "😍",
      heart_eyes: "😍",
      thinking: "🤔",
      // Gestures
      thumbs_up: "👍",
      thumbs_down: "👎",
      ok_hand: "👌",
      victory: "✌️",
      wave: "👋",
      clap: "👏",
      pray: "🙏",
      muscle: "💪",
      // Hearts
      heart: "❤️",
      blue_heart: "💙",
      green_heart: "💚",
      yellow_heart: "💛",
      purple_heart: "💜",
      black_heart: "🖤",
      broken_heart: "💔",
      // Objects
      fire: "🔥",
      rocket: "🚀",
      star: "⭐",
      sparkles: "✨",
      tada: "🎉",
      party: "🎊",
      balloon: "🎈",
      gift: "🎁",
      // Tech
      computer: "💻",
      phone: "📱",
      camera: "📷",
      bulb: "💡",
      gear: "⚙️",
      robot: "🤖",
      laptop: "💻",
      email: "📧",
    }),
    []
  );

  const renderMessage = (text) => {
    if (!text) return "";

    // Convert :emoji: to actual emojis
    return text.replace(/:([a-zA-Z0-9_+-]+):/g, (match, name) => {
      return emojiMap[name] || match;
    });
  };

  const renderStatus = () => {
    if (!isUser) return null;

    const iconClass = "w-4 h-4";

    switch (status) {
      case "sending":
        return <Clock className={`${iconClass} text-gray-400 animate-pulse`} />;
      case "sent":
        return <Check className={`${iconClass} text-gray-400`} />;
      case "delivered":
        return <CheckCheck className={`${iconClass} text-gray-400`} />;
      case "read":
        return <CheckCheck className={`${iconClass} text-blue-500`} />;
      case "failed":
        return <AlertCircle className={`${iconClass} text-red-500`} />;
      default:
        return <Check className={`${iconClass} text-gray-400`} />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "sending":
        return "Sending...";
      case "sent":
        return "Sent";
      case "delivered":
        return "Delivered";
      case "read":
        return "Read";
      case "failed":
        return "Failed to send";
      default:
        return "Sent";
    }
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isUser ? "order-2" : "order-1"}`}>
        {/* Avatar for non-user messages */}
        {!isUser && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold mb-1">
            B
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md ${
            isUser
              ? "bg-blue-500 text-white rounded-br-md"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed break-words">
            {renderMessage(message.text)}
          </p>
        </div>

        {/* Message Info */}
        <div
          className={`flex items-center mt-1 space-x-1 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {timestamp}
          </span>

          {/* Status Icon */}
          <div title={getStatusText()}>{renderStatus()}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
