
import React, { useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { cn } from '@/lib/utils';
import { useChat } from '@/context/ChatContext';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'bot';
  const { storeMessageContent } = useChat();
  
  // Store message content for reference in the cycle function
  useEffect(() => {
    if (message.content && message.role === 'user') {
      storeMessageContent(message.id, message.content);
    }
  }, [message.id, message.content, message.role, storeMessageContent]);
  
  return (
    <div 
      className={cn(
        "py-3 px-4 max-w-[85%] rounded-lg mb-2 animate-slide-in",
        isBot 
          ? "bg-gray-100 text-gray-800 self-start rounded-bl-none" 
          : "bg-blue-600 text-white self-end rounded-br-none"
      )}
    >
      <p className="whitespace-pre-line">{message.content}</p>
    </div>
  );
};

export default ChatMessage;
