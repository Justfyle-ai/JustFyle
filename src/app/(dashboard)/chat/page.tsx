'use client'

import { useState } from 'react'
import { Send, Paperclip, Mic, Upload } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isWelcome?: boolean
}

function WelcomeMessage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">JF</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-600">JustFyle AI</p>
          <p className="text-[10px] bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium inline-block">CPA Verified</p>
        </div>
      </div>

      <p className="text-sm text-gray-800 leading-relaxed">
        Welcome! I&apos;m your AI tax assistant. Think of me as a tax professional you can text. You can ask me anything, and by the end of our conversation, your tax return will be completed, reviewed, and ready to file.
      </p>

      <p className="text-sm text-gray-800 leading-relaxed">
        Here&apos;s what makes us different: <strong>your return will be completed without you answering 50 screens of confusing questions.</strong> We just have a conversation. I&apos;ll ask the right questions, find every deduction you qualify for, and a <strong>state board-certified CPA</strong> will personally review your return before we send it to you for signature and electronically file it.
      </p>

      <p className="text-sm text-gray-800 leading-relaxed">
        We&apos;ll also figure out how to <strong>save you money for next year</strong>. Unlike tax planners that charge thousands and give you a generic report, we&apos;ll actually help you set up goals and guide you through real strategies that work for your specific situation.
      </p>

      <p className="text-sm text-gray-800 leading-relaxed">
        Before we get started, do you have any questions? If not, let&apos;s jump right in!
      </p>

      <div className="bg-brand-50 rounded-xl p-4 border border-brand-200/50">
        <p className="text-sm font-semibold text-brand-700 mb-2">Let&apos;s start by uploading your documents</p>
        <p className="text-xs text-brand-600/80 mb-3 leading-relaxed">
          Upload your <strong>last year&apos;s tax return</strong> (2024) and any <strong>tax documents you&apos;ve received for 2025</strong>. Here are common examples:
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            'W-2 (employer wages)',
            '1099-NEC (freelance income)',
            '1099-INT (bank interest)',
            '1099-DIV (dividends)',
            '1099-B (stock sales)',
            '1098 (mortgage interest)',
            '1099-R (retirement dist.)',
            '1095-A (health insurance)',
          ].map((doc) => (
            <div key={doc} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-brand-400 rounded-full flex-shrink-0" />
              <p className="text-[11px] text-brand-700">{doc}</p>
            </div>
          ))}
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all shadow-sm hover:shadow-md text-sm">
          <Upload size={18} />
          Upload Tax Documents
        </button>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: '', timestamp: new Date(), isWelcome: true },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim(), timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setTimeout(() => {
      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: "Thanks for your message! The AI chat engine is being connected. Soon I'll be able to read your tax documents, answer questions, and help you file your return in under 10 minutes.", timestamp: new Date() }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] ${message.role === 'user' ? 'bg-brand-500 text-white rounded-2xl rounded-br-md px-4 py-3' : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm'} text-sm leading-relaxed`}>
              {message.isWelcome ? (<WelcomeMessage />) : (<>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-white font-bold text-[10px]">JF</span></div>
                    <span className="text-xs font-semibold text-brand-600">JustFyle AI</span>
                    <span className="text-[10px] bg-brand-50 text-brand-600 px-1.5 py-0.5 rounded-full font-medium">CPA Verified</span>
                  </div>
                )}
                {message.content}
              </>)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 px-5 py-4 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-white font-bold text-[10px]">JF</span></div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-brand-300 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-brand-300 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <div className="w-2 h-2 bg-brand-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <button type="button" className="p-2.5 text-gray-400 hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all" title="Upload tax documents"><Upload size={20} /></button>
          <button type="button" className="p-2.5 text-gray-400 hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all" title="Attach file"><Paperclip size={20} /></button>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your taxes, or type your question here..." className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400" />
          <button type="button" className="p-2.5 text-gray-400 hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all" title="Voice input"><Mic size={20} /></button>
          <button type="submit" disabled={!input.trim() || isLoading} className="p-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"><Send size={18} /></button>
        </form>
      </div>
    </div>
  )
}
