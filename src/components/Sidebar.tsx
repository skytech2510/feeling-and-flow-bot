
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus, X, MessageSquare } from 'lucide-react';
import { useChat } from '@/context/ChatContext';

interface SidebarProps {
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile = false }) => {
  const { 
    sessions, 
    currentSessionId, 
    createNewSession, 
    switchSession,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = useChat();

  const handleCloseSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-full bg-slate-100 border-r",
        isMobile ? (
          isMobileSidebarOpen 
            ? "fixed inset-y-0 left-0 z-50 w-64 animate-slide-in" 
            : "hidden"
        ) : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b bg-slate-200">
        <h2 className="text-lg font-medium text-slate-800">Chats</h2>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={handleCloseSidebar}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
        {sessions.map(session => (
          <Button
            key={session.id}
            variant={currentSessionId === session.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start mb-1 text-left",
              currentSessionId === session.id ? "bg-slate-200 text-slate-900" : "text-slate-700"
            )}
            onClick={() => switchSession(session.id)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span className="truncate">{session.title}</span>
          </Button>
        ))}
      </div>
      
      <div className="p-4 border-t bg-slate-50">
        <Button 
          onClick={createNewSession} 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
