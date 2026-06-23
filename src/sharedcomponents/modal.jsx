import {Modal} from "@mui/material"
import Chatinput from "./chatinput";
import Chatmessagecontainer from "./chatmessage";
import { useState } from "react";
import axios from "axios";
import { useEffect, useRef  } from "react";
import { useKeycloak } from "@react-keycloak/web";
export default function ModalWidget ({open , onClose , className , data , module }){
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null); 
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const { keycloak} = useKeycloak();
    
      const firstName = keycloak.tokenParsed?.given_name;
      const lastName = keycloak.tokenParsed?.family_name;
    (firstName)
  
  async function getGroqResponse(userMessage){
    setIsLoading(true);
    try {
      const response = await axios.post('/express/api/chat', {
        firstName: firstName,
        lastName: lastName,
        message: userMessage.content,
        data: data,
        module: module
      });
      
      const chatbotMessage = {
        role: 'chatbot',
        content: response.data
      };

      
      setMessages(prev => [...prev, chatbotMessage]);
      return response.data;
      
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, {
        role: 'chatbot',
        content: 'Sorry, there was an error processing your request. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSendMessage = (userMessage) => {
    if (!userMessage || !userMessage.content.trim()) return;
    
    setMessages(prev => [...prev, userMessage]);
    
    getGroqResponse(userMessage);
  };
  
  useEffect(() => {
    if (!open) {
      setMessages([]); 
      setIsLoading(false);
    }
  }, [open]);
  switch(module){
    case 'sale':
      return (
    <div>
      <Modal open={open} onClose={onClose} className={className}>
        <div className="bg-white rounded-lg w-[1000px] shadow-xl flex flex-col h-[600px]">
          <div className="p-4 border-b border-red-400">
            <h2 className="text-2xl font-bold text-red-400">Sales Chatbot</h2>
          </div>
          
          <div className="overflow-y-auto flex-1 min-h-[200px]">
            <Chatmessagecontainer messages={messages} />
            <div ref={messagesEndRef} /> 
          </div>
          
          <div className="bg-white p-4 border-t border-gray-200">
            <Chatinput onsend={handleSendMessage} isLoading={isLoading}  />
          </div>
        </div>
      </Modal>
    </div>
  );
  case 'product':
  return (
    <div>
      <Modal open={open} onClose={onClose} className={className}>
        <div className="bg-white rounded-lg w-[1000px] shadow-xl flex flex-col h-[600px]">
          <div className="p-4 border-b border-red-400">
            <h2 className="text-2xl font-bold text-red-400">Product Chatbot</h2>
          </div>
          
          <div className="overflow-y-auto flex-1 min-h-[200px]">
            <Chatmessagecontainer messages={messages} />
            <div ref={messagesEndRef} /> 
          </div>
          
          <div className="bg-white p-4 border-t border-gray-200">
            <Chatinput onsend={handleSendMessage} isLoading={isLoading}  />
          </div>
        </div>
      </Modal>
    </div>
  );
  case 'crm' :
  return (
    <div>
      <Modal open={open} onClose={onClose} className={className}>
        <div className="bg-white rounded-lg w-[1000px] shadow-xl flex flex-col h-[600px]">
          <div className="p-4 border-b border-red-400">
            <h2 className="text-2xl font-bold text-red-400">CRM Chatbot</h2>
          </div>
          
          <div className="overflow-y-auto flex-1 min-h-[200px]">
            <Chatmessagecontainer messages={messages} />
            <div ref={messagesEndRef} /> 
          </div>
          
          <div className="bg-white p-4 border-t border-gray-200">
            <Chatinput onsend={handleSendMessage} isLoading={isLoading}  />
          </div>
        </div>
      </Modal>
    </div>
  );
  case 'account':
  return (
    <div>
      <Modal open={open} onClose={onClose} className={className}>
        <div className="bg-white rounded-lg w-[1000px] shadow-xl flex flex-col h-[600px]">
          <div className="p-4 border-b border-red-400">
            <h2 className="text-2xl font-bold text-red-400">Accounting Chatbot</h2>
          </div>
  <div className="overflow-y-auto flex-1 min-h-[200px]">
            <Chatmessagecontainer messages={messages} />
            <div ref={messagesEndRef} /> 
          </div>
          
          <div className="bg-white p-4 border-t border-gray-200">
            <Chatinput onsend={handleSendMessage} isLoading={isLoading}  />
          </div>
        </div>
      </Modal>
    </div>
   );
}}