
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatMessage, ChatSession, PathType } from '../types/chat';
import { findBestResponse } from '../data/responses';

// Define the shape of our context
interface ChatContextType {
  sessions: ChatSession[];
  currentSessionId: string | null;
  createNewSession: () => void;
  switchSession: (sessionId: string) => void;
  sendMessage: (content: string) => void;
  selectPath: (path: PathType) => void;
  currentSession: ChatSession | null;
  isTyping: boolean;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
  startCycleCheck: () => void;
  isCycleActive: boolean;
  handleCycleResponse: (isStillFeeling: boolean) => void;
  cycleStep: 'primary' | 'secondary' | null;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Create a provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCycleActive, setIsCycleActive] = useState(false);
  const [cycleStep, setCycleStep] = useState<'primary' | 'secondary' | null>(null);

  // Initialize a session on first load
  useEffect(() => {
    if (sessions.length === 0) {
      createNewSession();
    }
  }, []);

  // Get the current session
  const currentSession = currentSessionId 
    ? sessions.find(session => session.id === currentSessionId) || null 
    : null;

  // Create a new chat session
  const createNewSession = () => {
    const newSessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: newSessionId,
      title: `Chat ${sessions.length + 1}`,
      messages: [{
        id: Date.now().toString(),
        role: 'bot',
        content: 'How do you want to start today?\n\n1. How you feel\n2. Start with a goal',
        timestamp: new Date(),
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
      currentStep: 0,
    };

    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSessionId);
    setIsCycleActive(false);
    setCycleStep(null);
  };

  // Switch to a different session
  const switchSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setIsMobileSidebarOpen(false);
    setIsCycleActive(false);
    setCycleStep(null);
  };

  // Get user's first and second answers for cycle questioning
  const getUserAnswers = () => {
    if (!currentSession) return { primaryFeeling: '', secondaryDescription: '' };
    
    const userMessages = currentSession.messages.filter(msg => msg.role === 'user');
    
    let primaryFeeling = '';
    let secondaryDescription = '';
    
    // For the feeling path, the first answer is the primary feeling
    if (currentSession.path === 'feeling' && userMessages.length >= 1) {
      primaryFeeling = userMessages[0].content;
      
      // The second answer is the description of that feeling
      if (userMessages.length >= 2) {
        secondaryDescription = userMessages[1].content;
      }
    }
    
    // For the goal path, the first answer is what they want to achieve
    // and the second is what achieving it would feel like
    else if (currentSession.path === 'goal' && userMessages.length >= 2) {
      primaryFeeling = userMessages[1].content;
      
      if (userMessages.length >= 3) {
        secondaryDescription = userMessages[2].content;
      }
    }
    
    return { primaryFeeling, secondaryDescription };
  };

  // Start the cycle check process
  const startCycleCheck = () => {
    if (!currentSession) return;
    
    const { secondaryDescription } = getUserAnswers();
    
    if (!secondaryDescription) return;
    
    setIsTyping(true);
    setCycleStep('secondary');
    setIsCycleActive(true);
    
    setTimeout(() => {
      const botMessageId = Date.now().toString();
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [
              ...session.messages,
              {
                id: botMessageId,
                role: 'bot',
                content: `Do you still feel ${secondaryDescription}?`,
                timestamp: new Date(),
              }
            ],
            updatedAt: new Date(),
          };
        }
        return session;
      }));
      setIsTyping(false);
    }, 1000);
  };

  // Handle user's response to a cycle question
  const handleCycleResponse = (isStillFeeling: boolean) => {
    if (!currentSession) return;
    
    const { primaryFeeling, secondaryDescription } = getUserAnswers();
    
    setIsTyping(true);
    
    setTimeout(() => {
      const botMessageId = Date.now().toString();
      
      // If they still have the secondary feeling, ask the same question again
      if (cycleStep === 'secondary' && isStillFeeling) {
        setSessions(prev => prev.map(session => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [
                ...session.messages,
                {
                  id: botMessageId,
                  role: 'bot',
                  content: `Do you still feel ${secondaryDescription}?`,
                  timestamp: new Date(),
                }
              ],
              updatedAt: new Date(),
            };
          }
          return session;
        }));
        setIsTyping(false);
      } 
      // If they no longer have the secondary feeling, ask about primary feeling
      else if (cycleStep === 'secondary' && !isStillFeeling) {
        setCycleStep('primary');
        setSessions(prev => prev.map(session => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [
                ...session.messages,
                {
                  id: botMessageId,
                  role: 'bot',
                  content: `Do you still feel ${primaryFeeling}?`,
                  timestamp: new Date(),
                }
              ],
              updatedAt: new Date(),
            };
          }
          return session;
        }));
        setIsTyping(false);
      }
      // If they still have the primary feeling, go back to asking what it feels like
      else if (cycleStep === 'primary' && isStillFeeling) {
        setSessions(prev => prev.map(session => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [
                ...session.messages,
                {
                  id: botMessageId,
                  role: 'bot',
                  content: `Feel ${primaryFeeling} — what does ${primaryFeeling} feel like?`,
                  timestamp: new Date(),
                }
              ],
              updatedAt: new Date(),
              currentStep: 2, // Reset to the step where we ask what the feeling feels like
            };
          }
          return session;
        }));
        setCycleStep(null);
        setIsCycleActive(false);
        setIsTyping(false);
      }
      // If they no longer have the primary feeling, ask how they're feeling now
      else if (cycleStep === 'primary' && !isStillFeeling) {
        setSessions(prev => prev.map(session => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [
                ...session.messages,
                {
                  id: botMessageId,
                  role: 'bot',
                  content: "How are you feeling about this now?",
                  timestamp: new Date(),
                }
              ],
              updatedAt: new Date(),
            };
          }
          return session;
        }));
        setCycleStep(null);
        setIsCycleActive(false);
        setIsTyping(false);
      }
    }, 1000);
  };

  // Select conversation path (feeling or goal)
  const selectPath = (path: PathType) => {
    if (!currentSessionId) return;

    let nextQuestion = '';
    if (path === 'feeling') {
      nextQuestion = 'How/What are you feeling right now?';
    } else if (path === 'goal') {
      nextQuestion = 'What is your goal?';
    }

    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          path,
          currentStep: 1,
          messages: [
            ...session.messages,
            {
              id: Date.now().toString(),
              role: 'bot',
              content: nextQuestion,
              timestamp: new Date(),
            }
          ],
          updatedAt: new Date(),
        };
      }
      return session;
    }));
  };

  // Check if user wants to start a new conversation after completing the previous one
  const handleConversationRestart = (content: string) => {
    const lowerContent = content.toLowerCase().trim();
    const positiveResponses = ['yes', 'ok', 'sure', 'yeah', 'yep', 'start', 'again', 'restart', 'continue'];
    
    if (positiveResponses.some(response => lowerContent.includes(response))) {
      // User wants to start again
      const newMessageId = Date.now().toString();
      const newMessage: ChatMessage = {
        id: newMessageId,
        role: 'bot',
        content: 'How do you want to start today?\n\n1. How you feel\n2. Start with a goal',
        timestamp: new Date(),
      };

      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            currentStep: 0,
            path: null,
            messages: [...session.messages, newMessage],
            updatedAt: new Date(),
          };
        }
        return session;
      }));
      
      return true;
    } else {
      // User doesn't want to continue
      const goodbyeMessages = [
        "Thank you for chatting with me today! Take care and come back anytime.",
        "It was great talking with you. Wishing you a wonderful day ahead!",
        "Thanks for the conversation. Hope to chat with you again soon!",
        "I enjoyed our talk. Have a lovely day and see you next time!"
      ];
      
      const randomGoodbye = goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)];
      
      const newMessageId = Date.now().toString();
      const newMessage: ChatMessage = {
        id: newMessageId,
        role: 'bot',
        content: randomGoodbye,
        timestamp: new Date(),
      };

      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, newMessage],
            updatedAt: new Date(),
          };
        }
        return session;
      }));
      
      return true;
    }
  };

  // Handle sending a message
  const sendMessage = (content: string) => {
    if (!currentSessionId || !currentSession) return;

    // Check if we're waiting for a restart confirmation
    if ((currentSession.path === 'feeling' && currentSession.currentStep === 5) ||
        (currentSession.path === 'goal' && currentSession.currentStep === 6)) {
      
      // Add user message first
      const userMessageId = Date.now().toString();
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [
              ...session.messages,
              {
                id: userMessageId,
                role: 'user',
                content,
                timestamp: new Date(),
              }
            ],
            updatedAt: new Date(),
          };
        }
        return session;
      }));
      
      setIsTyping(true);
      
      // Process the restart response after a delay
      setTimeout(() => {
        const wasHandled = handleConversationRestart(content);
        setIsTyping(false);
      }, 1000);
      
      return;
    }

    // Add user message
    const userMessageId = Date.now().toString();
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [
            ...session.messages,
            {
              id: userMessageId,
              role: 'user',
              content,
              timestamp: new Date(),
            }
          ],
          updatedAt: new Date(),
        };
      }
      return session;
    }));

    // Show typing indicator
    setIsTyping(true);

    // Process response based on current step and path
    setTimeout(() => {
      const path = currentSession.path;
      const step = currentSession.currentStep || 0;
      
      let botResponse = '';
      let newStep = step;
      
      // Process the response based on initial selection
      if (step === 0) {
        if (content.toLowerCase().includes('feel') || content === '1') {
          selectPath('feeling');
          setIsTyping(false);
          return;
        } else if (content.toLowerCase().includes('goal') || content === '2') {
          selectPath('goal');
          setIsTyping(false);
          return;
        } else {
          botResponse = "I didn't understand. Please choose either 'How you feel' or 'Start with a goal'.";
        }
      } 
      // Process feelings path
      else if (path === 'feeling') {
        switch (step) {
          case 1: // After user shares what they're feeling
            botResponse = `Feel ${content} — what does ${content} feel like?`;
            newStep = 2;
            break;
          case 2: // After user describes what the feeling feels like
            botResponse = "How are you feeling about this now?";
            newStep = 3;
            break;
          case 3: // After user shares how they're feeling now
            botResponse = "What would the opposite of that feel like? How do you want to feel?";
            newStep = 4;
            break;
          case 4: // After user shares how they want to feel
            botResponse = `What would it feel like to feel ${content}?`;
            newStep = 5;
            break;
          case 5: // Final response based on their feelings
            botResponse = findBestResponse(content, 'feeling');
            // Add a prompt to start again
            botResponse += "\n\nWould you like to start another conversation? (yes/no)";
            break;
          default:
            botResponse = findBestResponse(content, 'feeling');
        }
      } 
      // Process goals path
      else if (path === 'goal') {
        switch (step) {
          case 1: // After user shares their goal
            botResponse = `What would it feel like to ${content}?`;
            newStep = 2;
            break;
          case 2: // After user describes what achieving the goal would feel like
            botResponse = `Feel ${content} — what does ${content} feel like?`;
            newStep = 3;
            break;
          case 3: // After user describes that feeling
            botResponse = "How are you feeling about this now?";
            newStep = 4;
            break;
          case 4: // After user describes how they're feeling now
            botResponse = "What would the opposite of that feel like? How do you want to feel?";
            newStep = 5;
            break;
          case 5: // After user describes how they want to feel
            botResponse = `Feel ${content} — what does ${content} feel like?`;
            newStep = 6;
            break;
          case 6: // Final response based on their goal
            botResponse = findBestResponse(content, 'goal');
            // Add a prompt to start again
            botResponse += "\n\nWould you like to start another conversation? (yes/no)";
            break;
          default:
            botResponse = findBestResponse(content, 'goal');
        }
      }

      // Add bot response after delay (simulating typing)
      const botMessageId = Date.now().toString();
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            currentStep: newStep,
            messages: [
              ...session.messages,
              {
                id: botMessageId,
                role: 'bot',
                content: botResponse,
                timestamp: new Date(),
              }
            ],
            updatedAt: new Date(),
          };
        }
        return session;
      }));
      
      setIsTyping(false);
    }, 1000); // 1 second delay to simulate typing
  };

  const value = {
    sessions,
    currentSessionId,
    currentSession,
    createNewSession,
    switchSession,
    sendMessage,
    selectPath,
    isTyping,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    startCycleCheck,
    isCycleActive,
    handleCycleResponse,
    cycleStep
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Create a custom hook to use the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
