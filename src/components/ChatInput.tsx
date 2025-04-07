
import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [userHasClickedOutside, setUserHasClickedOutside] = useState(false);

  // Focus the textarea whenever the component mounts or updates
  useEffect(() => {
    if (textareaRef.current && !disabled && !userHasClickedOutside) {
      textareaRef.current.focus();
    }
  }, [disabled, userHasClickedOutside]);

  // Re-focus when disabled state changes
  useEffect(() => {
    if (!disabled && textareaRef.current && !userHasClickedOutside) {
      textareaRef.current.focus();
    }
  }, [disabled, userHasClickedOutside]);

  // Add event listeners for click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textareaRef.current && 
        !textareaRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button')
      ) {
        setUserHasClickedOutside(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
      setUserHasClickedOutside(false);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      
      // Restore focus to the textarea after sending
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleFocus = () => {
    setUserHasClickedOutside(false);
  };

  return (
    <div className="border rounded-lg flex items-end bg-white shadow-sm">
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        onFocus={handleFocus}
        placeholder="Type your message..."
        className="min-h-[50px] max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-3 px-4"
        disabled={disabled}
      />
      <Button 
        onClick={handleSend} 
        size="icon" 
        className="m-1"
        disabled={!message.trim() || disabled}
      >
        <SendHorizonal className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatInput;
