import React, { useState } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { chatWithAI } from '../api';

export default function Chatbot({ result }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Do you have any questions about your loan assessment? I can help explain the decision.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatWithAI(userMessage, {
      decision: result?.decision || "Unknown",
      key_factors: result?.key_factors || []
  });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error while trying to process your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass rounded-xl p-6 w-full max-w-2xl mx-auto border border-white/10 shadow-2xl mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">AI Assistant</h2>
          <p className="text-xs text-muted-foreground">Ask questions about your assessment</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 h-64 overflow-y-auto mb-4 p-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-primary" />
              </div>
            )}
            <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-secondary/50 border border-white/5 rounded-tl-sm'}`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-primary-foreground">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
             <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-primary" />
             </div>
             <div className="px-4 py-2 rounded-2xl bg-secondary/50 border border-white/5 rounded-tl-sm flex items-center">
                <Loader2 size={16} className="animate-spin text-primary" />
             </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="relative flex items-center">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask why your loan was rejected..." 
          className="w-full bg-background/50 border border-input rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
