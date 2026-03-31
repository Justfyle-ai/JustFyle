'use client'

import { useState } from 'react'
import { Send, Paperclip, Mic } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your JustFyle AI tax assistant. Upload your tax documents (W2s, 1099s, etc.) and I'll help you file your return. What would you like to start with?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // TODO: Connect to /api/chat endpoint for real AI responses
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Thanks for your message! The AI chat engine is being connected. Soon I'll be able to read your tax documents, answer questions, and help you file your return in under 10 minutes.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-surface-300 px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">Tax Chat</h1>
        <p className="text-sm text-gray-500">Ask anything about your taxes</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-brand-500 text-white rounded-br-md'
                  : 'bg-white border border-surface-300 text-gray-800 rounded-bl-md'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-brand-600">JustFyle AI</span>
                  <span className="text-[10px] bg-brand-50 text-brand-600 px-1.5 py-0.5 rounded-full font-medium">
                    CPA Verified
                  </span>
                </div>
              )}
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-surface-300 px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-surface-300 p-4">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-brand-500 transition-colors"
            title="Attach document"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your taxes..."
            className="flex-1 px-4 py-3 rounded-xl border border-surface-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm"
          />
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-brand-500 transition-colors"
            title="Voice input"
          >
            <Mic size={20} />
          </button>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
