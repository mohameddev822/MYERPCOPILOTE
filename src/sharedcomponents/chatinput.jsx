import { useState } from "react"
import Chatbotpoint from "./chatbotpoint"

export default function Chatinput({onsend, isLoading = false}){
  const [message, setMessage] = useState("");
  
  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onsend({role: "user", content: message});
      setMessage(""); 
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isLoading ? "Bot is typing..." : "Type your message here..."}
          disabled={isLoading}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />
        <Chatbotpoint 
          onClick={handleSend} 
          size="small" 
          color="primary" 
          ariaLabel="send" 
          type="send" 
          className="ml-6"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}