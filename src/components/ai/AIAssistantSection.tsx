'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistantSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Olá! Sou a Concierge Stardust da STAR INK. Como posso te ajudar hoje? Posso tirar dúvidas sobre caimento dos tamanhos (P ao EGG), tecido 100% Algodão Penteado 220g, frete da fábrica ou o conceito da Estética da Subtração.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // API call to Next.js route or AI logic
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      // Smart Fallback Response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'Nossas camisetas usam Algodão Penteado 220g com modelagem streetwear autoral. As estampas são impressas em DTG puro diretamente no tecido com resolução de galeria de arte. Se quiser prosseguir com um pedido direto, posso te conectar ao nosso WhatsApp Concierge!',
          },
        ]);
      }, 700);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] mb-2 block">
              SUPORTE & ATENDIMENTO 24/7
            </span>
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3 tracking-tight">
              <Sparkles className="text-white w-6 h-6" />
              Stardust Concierge IA
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto">
              Inteligência artificial dedicada para tirar todas as suas dúvidas sobre a marca, modelos e compras.
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-black border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Messages Scroll Area */}
            <div className="h-[460px] overflow-y-auto p-6 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-zinc-800">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl flex gap-3 ${
                        m.role === 'user'
                          ? 'bg-white text-black rounded-tr-none'
                          : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none'
                      }`}
                    >
                      {m.role === 'assistant' && (
                        <Bot className="w-5 h-5 shrink-0 text-zinc-400 mt-0.5" />
                      )}
                      <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {m.content}
                      </p>
                      {m.role === 'user' && (
                        <User className="w-5 h-5 shrink-0 text-zinc-600 mt-0.5" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl rounded-tl-none flex gap-2">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-zinc-900/50 border-t border-zinc-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ex: Qual o tamanho ideal para 1.80m e 80kg?"
                  className="flex-grow bg-zinc-950 border border-zinc-800 text-white rounded-full px-6 py-3 text-xs focus:outline-none focus:border-zinc-500 transition-colors font-sans placeholder:text-zinc-600"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-white hover:bg-zinc-200 text-black disabled:opacity-50 p-3 rounded-full transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
