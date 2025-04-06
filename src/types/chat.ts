
export type MessageRole = 'bot' | 'user';

export type PathType = 'feeling' | 'goal' | null;

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  path?: PathType;
  currentStep?: number;
}
