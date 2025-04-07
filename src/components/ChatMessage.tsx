
import React from 'react';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'bot';
  
  return (
    <div 
      className={cn(
        "py-3 px-4 max-w-[85%] rounded-lg mb-2 animate-slide-in",
        isBot 
          ? "bg-purple-50 text-gray-800 self-start rounded-bl-none border border-purple-100" 
          : "bg-teal-600 text-white self-end rounded-br-none"
      )}
    >
      <p className="whitespace-pre-line">{message.content}</p>
    </div>
  );
};

export default ChatMessage;
