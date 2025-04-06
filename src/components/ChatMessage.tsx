
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
          ? "bg-bot-light text-gray-800 self-start rounded-bl-none" 
          : "bg-user-dark text-gray-800 self-end rounded-br-none"
      )}
    >
      <p className="whitespace-pre-line">{message.content}</p>
    </div>
  );
};

export default ChatMessage;
