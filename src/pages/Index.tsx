
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import ChatInput from '@/components/ChatInput';
import ChatMessage from '@/components/ChatMessage';
import Sidebar from '@/components/Sidebar';
import { Menu } from 'lucide-react';
import { ChatProvider, useChat } from '@/context/ChatContext';

const ChatUI: React.FC = () => {
  const { 
    currentSession, 
    sendMessage, 
    selectPath,
    isTyping,
    setIsMobileSidebarOpen 
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.messages]);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  const handlePathSelection = (path: 'feeling' | 'goal') => {
    selectPath(path);
  };

  const handleOpenSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  // Determine if input should be disabled
  // We no longer want to disable input when waiting for restart confirmation (steps 5 and 6)
  const isInputDisabled = isTyping;

  return (
    <div className="flex h-full">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="h-16 border-b flex items-center px-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={handleOpenSidebar} className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-semibold">Feeling & Flow Bot</h1>
        </header>

        {/* Mobile Sidebar */}
        {isMobile && <Sidebar isMobile={true} />}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col scrollbar-thin">
          {currentSession?.messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {/* First question options */}
          {currentSession?.messages.length === 1 && (
            <div className="flex flex-col gap-2 mt-2 max-w-xs">
              <Button 
                variant="outline" 
                className="justify-start border-gray-300 hover:bg-gray-50"
                onClick={() => handlePathSelection('feeling')}
              >
                How you feel
              </Button>
              <Button 
                variant="outline" 
                className="justify-start border-gray-300 hover:bg-gray-50"
                onClick={() => handlePathSelection('goal')}
              >
                Start with a goal
              </Button>
            </div>
          )}
          
          {isTyping && (
            <div className="self-start bg-gray-100 text-gray-800 py-3 px-4 max-w-[85%] rounded-lg mb-2 rounded-bl-none animate-pulse">
              Typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={isInputDisabled} 
          />
        </div>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ChatProvider>
      <div className="h-screen flex flex-col">
        <ChatUI />
      </div>
    </ChatProvider>
  );
};

export default Index;
