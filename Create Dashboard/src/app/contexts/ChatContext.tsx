import { createContext, useContext, useState, ReactNode } from "react";

export interface ChatMessage {
  id: string;
  type: "user" | "ai";
  message: string | ReactNode;
  timestamp: Date;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  }>;
}

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  chatContext: Record<string, any>;
  updateContext: (key: string, value: any) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "ai",
      message: "Hello! I'm your AI assistant for rule creation. I'll guide you through the entire process from code generation to deployment and testing. What rule would you like to create today?",
      timestamp: new Date(),
    },
  ]);
  const [currentStep, setCurrentStep] = useState("initial");
  const [chatContext, setChatContext] = useState<Record<string, any>>({});

  const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const updateContext = (key: string, value: any) => {
    setChatContext((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        currentStep,
        setCurrentStep,
        chatContext,
        updateContext,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
