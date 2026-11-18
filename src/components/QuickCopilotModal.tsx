import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Shield, Terminal, ArrowRight } from 'lucide-react';

interface QuickCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const QuickCopilotModal: React.FC<QuickCopilotModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Greetings, Analyst. I am the CyberFortress Sentinel Copilot. I monitor our 24 edge nodes, correlate threat telemetry, and assist with real-time incident investigations. How can I assist your defense operations today?',
      time: '10:09 AM'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Explain the Threat Landscape donut chart',
    'How do I identify phishing in the Demo Module?',
    'What does "Kill Chain: None" mean?',
    'What is Neural Awareness and L7 inspection?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('donut') || q.includes('threat landscape')) {
        reply = 'The Threat Landscape donut chart aggregates 46.2k telemetry events. Operational events represent 82% of legitimate network throughput, while Warnings (2,566) and Critical Issues (752) represent flagged anomalies requiring SOC review.';
      } else if (q.includes('phishing') || q.includes('demo')) {
        reply = 'In our Phishing Awareness Simulator (Module 01), check for: 1) Sender domain typosquatting (e.g. micros0ft.net), 2) Artificial time urgency ("10 minutes left!"), 3) Deceptive URLs revealed by hovering over buttons, and 4) Mismatched SPF/DKIM headers.';
      } else if (q.includes('kill chain')) {
        reply = '"Kill Chain: NONE" indicates that across all 7 stages of the Lockheed Martin Cyber Kill Chain (Reconnaissance to Actions on Objectives), no adversary has established persistence or lateral movement in your environment.';
      } else if (q.includes('neural') || q.includes('l7')) {
        reply = 'Neural Awareness performs dynamic Layer-7 (Application Layer) packet inspection across 24 edge nodes. It inspects HTTP/TLS payloads in real-time, maintaining a 99.2% system entropy stability.';
      } else {
        reply = `Query received: "${query}". All 24 edge inspection nodes report normal telemetry. The active Phishing Awareness Simulator is currently accessible from your left sidebar for interactive staff evaluation.`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#081121] border border-[#19c7f3]/50 rounded-2xl shadow-[0_0_50px_rgba(25,199,243,0.25)] flex flex-col h-[600px] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-[#0a162b] border-b border-[#152748] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#19c7f3] to-[#7c5cfc] p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-[#081121] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#19c7f3]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-mono-tech font-bold text-white tracking-wider">
                  SENTINEL AI COPILOT
                </h3>
                <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-[#20d6a1]/15 text-[#20d6a1] border border-[#20d6a1]/30">
                  ONLINE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono-tech">
                Autonomous Cybersecurity SOC Intelligence Agent
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#132341] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#050a14]/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#0e213d] border border-[#1b3b6b] flex items-center justify-center text-[#19c7f3] shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#19c7f3] text-black font-medium shadow-md'
                    : 'bg-[#0d1a33] text-slate-200 border border-[#182f59] shadow'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className={`block text-[9px] mt-1.5 ${msg.sender === 'user' ? 'text-black/60' : 'text-slate-500'} font-mono-tech text-right`}>
                  {msg.time}
                </span>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#1a2d52] border border-[#2b4b85] flex items-center justify-center text-slate-200 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#19c7f3]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Sentinel Copilot is analyzing telemetry...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-2.5 bg-[#091326] border-t border-[#13223f] flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono-tech">
          <span className="text-slate-500 uppercase shrink-0 px-1">QUICK:</span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-2 py-1 rounded bg-[#0e1b36] hover:bg-[#162c57] text-slate-300 hover:text-[#19c7f3] border border-[#1b315b] whitespace-nowrap transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat input box */}
        <div className="p-3 bg-[#0a162b] border-t border-[#152748]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask Copilot about any security alert, phishing indicator, or PRD requirement..."
              className="flex-1 px-3.5 py-2.5 bg-[#050a14] border border-[#172d54] rounded-xl text-xs font-mono-tech text-white placeholder-slate-500 focus:outline-none focus:border-[#19c7f3]"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim()}
              className="p-2.5 rounded-xl bg-[#19c7f3] hover:bg-[#32d3fc] disabled:opacity-40 text-black font-bold transition-all shadow-[0_0_10px_#19c7f3]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
