
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus, X, MessageSquare, CheckCircle2, XCircle } from 'lucide-react';
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
    setIsMobileSidebarOpen,
    startCycleCheck,
    isCycleActive,
    handleCycleResponse,
    currentSession,
    cycleStep
  } = useChat();

  // Determine if the check button should be visible
  const shouldShowCheckButton = (): boolean => {
    if (!currentSession) return false;
    
    // Only visible after the user has responded to what their feeling feels like
    if (currentSession.path === 'feeling' && currentSession.currentStep >= 2) return true;
    
    // For goal path, visible after they've described what achieving the goal would feel like
    if (currentSession.path === 'goal' && currentSession.currentStep >= 3) return true;
    
    return false;
  };
  
  const isCheckButtonActive = shouldShowCheckButton() && !isCycleActive;

  const handleCloseSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Get the last question for display in the check section
  const getLastBotQuestion = (): string | null => {
    if (!currentSession || !isCycleActive) return null;
    
    const botMessages = currentSession.messages.filter(msg => msg.role === 'bot');
    if (botMessages.length === 0) return null;
    
    return botMessages[botMessages.length - 1].content;
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
      
      {/* Cycle Check Section */}
      {shouldShowCheckButton() && (
        <div className="p-4 border-t bg-slate-50">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-800 mb-1">Feeling check</h3>
            {isCycleActive ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">{getLastBotQuestion()}</p>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleCycleResponse(true)}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                    size="sm"
                  >
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Yes
                  </Button>
                  <Button 
                    onClick={() => handleCycleResponse(false)}
                    className="flex-1 bg-slate-500 hover:bg-slate-600 text-white"
                    size="sm"
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    No
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={startCycleCheck}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                size="sm"
                disabled={!isCheckButtonActive}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Check feelings
              </Button>
            )}
          </div>
        </div>
      )}
      
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
