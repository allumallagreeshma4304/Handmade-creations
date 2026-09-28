import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, ArrowRight, CornerDownLeft, RotateCcw } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendationToOrder?: (text: string) => void;
  initialQuery?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplyRecommendationToOrder,
  initialQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your Handcrafted Studio Assistant. 🌸\n\nI can suggest beautiful bouquets for your exact budget (e.g. "I have ₹500. What bouquet can I get?"), look up single stem prices, or help you plan gifts for Haldi, weddings, and birthdays.\n\nHow can I help you today?`,
      timestamp: 'Now',
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle external incoming initial query (e.g. from hero or price section)
  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          conversationHistory: messages.slice(-5),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I would be delighted to help! You can check our flower price list or fill out the custom order form.',
        timestamp: 'Now',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('Chat request fallback:', err);
      // Client-side fallback if server fetch is unavailable
      const fallbackReply =
        `For ₹500, here are lovely bouquet options:\n` +
        `• 1 Sunflower (₹100) + 2 Tulips (₹200) + 1 Daisy (₹60) + 1 Lavender bunch (₹120) = ₹480\n` +
        `• Or our Wrapped 4 Flowers Bouquet (₹200–₹250) + 2 extra Roses (₹240) = ₹460–₹490\n\n` +
        `All pipe-cleaner flowers are everlasting! You can order this combo right now using our Custom Order Form below.`;

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-fallback-${Date.now()}`,
          sender: 'assistant',
          text: fallbackReply,
          timestamp: 'Now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'I have ₹500. What bouquet can I get?',
    'What flowers are best for Haldi?',
    'How much is a sunflower and tulip?',
    'How do I place an order via WhatsApp?',
    'Can I customize flower colors?',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-xl rounded-3xl shadow-2xl border border-[#E8DFD5] flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#EDE2D5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F2E8DC] border border-[#E3D1C0] flex items-center justify-center text-[#9E644E]">
              <Sparkles className="w-5 h-5 text-[#9E644E]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2420] flex items-center gap-2">
                <span>Studio Shopping Assistant</span>
              </h3>
              <p className="text-[11px] text-[#7A6C62]">
                Ask about prices, custom bouquets, and budget ideas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#6E5E54] hover:bg-[#F3EDE5] hover:text-[#2D2420] transition-colors cursor-pointer"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#EADCCF] flex items-center justify-center text-[#7F4E3D] shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-[#9E644E] text-white rounded-br-xs'
                      : 'bg-white text-[#382D26] border border-[#EAE0D5] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* If assistant suggested items, offer to copy to Order Form */}
                  {!isUser && msg.id !== 'welcome' && onApplyRecommendationToOrder && (
                    <button
                      onClick={() => {
                        onApplyRecommendationToOrder(msg.text);
                        onClose();
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8C523E] hover:text-[#6E3C2C] bg-[#FAF5EE] hover:bg-[#F3E8DC] px-2.5 py-1.5 rounded-lg border border-[#E5DACD] transition-colors"
                    >
                      <span>Use this recommendation in Order Form</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#9E644E]/20 flex items-center justify-center text-[#9E644E] shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-[#EADCCF] flex items-center justify-center text-[#7F4E3D] shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#EAE0D5] rounded-2xl rounded-bl-xs p-4 text-xs text-[#7A6C62] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#9E644E] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#9E644E] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#9E644E] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">Consulting studio price list...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-[#F6EFE6]/70 border-t border-[#EFE7DE] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-[#7D6E64] shrink-0 mr-1">
            Try:
          </span>
          {samplePrompts.map((promptText, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(promptText)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-[#FAF4ED] text-[#594B43] border border-[#E3D4C4] transition-colors shrink-0 cursor-pointer"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#EDE2D5]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. I have ₹500. What bouquet can I get?"
              className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#DFD4C7] text-xs sm:text-sm text-[#2D231E] focus:outline-hidden focus:ring-2 focus:ring-[#9E644E]/30 focus:border-[#9E644E]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2.5 rounded-full transition-all shrink-0 cursor-pointer ${
                input.trim() && !isLoading
                  ? 'bg-[#9E644E] hover:bg-[#86513D] text-white shadow-xs'
                  : 'bg-[#EBDDCF] text-[#8C7A6D] cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
