'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Plus, 
  MessageSquare,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  Headphones
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai' | 'human'
  timestamp: Date
  type?: 'message' | 'ticket' | 'ticket-response'
}

interface Ticket {
  id: string
  subject: string
  status: 'open' | 'in-progress' | 'resolved'
  createdAt: Date
  messages: Message[]
}

const ModernAIChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you. You can chat with our AI assistant or request to speak with a human agent. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [showTicketOptions, setShowTicketOptions] = useState(false)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [assistantType, setAssistantType] = useState<'ai' | 'human'>('ai')
  const [isWaitingForHuman, setIsWaitingForHuman] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    if (assistantType === 'human' || isWaitingForHuman) {
      // Handle human assistant request
      setTimeout(() => {
        const humanResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for contacting us! A human agent will be with you shortly. Our average wait time is 2-5 minutes during business hours (8AM-6PM GMT). For urgent matters, please call +231 77 505 7227.',
          sender: 'human',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, humanResponse])
        setIsWaitingForHuman(false)
      }, 1000)
    } else {
      // AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getAIResponse(inputValue),
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      }, 800)
    }
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('human') || input.includes('agent') || input.includes('person') || input.includes('speak to someone')) {
      setIsWaitingForHuman(true)
      return 'I\'ll connect you with a human agent right away. Our team is available 8AM-6PM GMT. You can also create a support ticket for faster resolution.'
    } else if (input.includes('ticket') || input.includes('issue') || input.includes('problem')) {
      return 'I can help you create a support ticket. Click the "Create Ticket" button above, or you can describe your issue here and I\'ll create one for you.'
    } else if (input.includes('marketplace') || input.includes('buy') || input.includes('sell')) {
      return 'Our V1.0 Marketplace is now live! You can start buying and selling at marketplace.an-nita.com. It features verified traders, secure payments, and seamless trading across Africa.'
    } else if (input.includes('contact') || input.includes('support')) {
      return 'You can reach our support team at info@an-nita.com or call +231 77 505 7227. For urgent issues, I recommend creating a support ticket for faster resolution.'
    } else if (input.includes('pricing') || input.includes('cost') || input.includes('fee')) {
      return 'Our marketplace is free to join with no setup fees. Transaction fees apply only when you make successful sales. Custom solutions pricing varies based on your specific needs.'
    } else {
      return 'Thank you for your message! I can help with:\n• Marketplace questions\n• Technical support\n• Account issues\n• Creating support tickets\n• Connecting you with human agents\n• General inquiries\n\nWhat would you like to know more about?'
    }
  }

  const createTicket = (subject: string) => {
    const newTicket: Ticket = {
      id: Date.now().toString(),
      subject,
      status: 'open',
      createdAt: new Date(),
      messages: []
    }

    setTickets(prev => [...prev, newTicket])
    setShowTicketOptions(false)
    setSelectedTicket(newTicket.id)

    const ticketMessage: Message = {
      id: Date.now().toString(),
      text: `Support ticket created: ${subject}. Our team will respond within 24 hours. You can track this ticket's status here.`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'ticket-response'
    }

    setMessages(prev => [...prev, ticketMessage])
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-3 h-3 text-yellow-500" />
      case 'in-progress':
        return <MessageSquare className="w-3 h-3 text-blue-500" />
      case 'resolved':
        return <CheckCircle className="w-3 h-3 text-green-500" />
      default:
        return null
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full w-14 h-14 p-0 shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[650px]">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Annita Support</h3>
                <p className="text-xs opacity-90">24/7 Available</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTicketOptions(!showTicketOptions)}
                className="p-1.5 text-white hover:bg-white/20 rounded-lg transition-colors"
                title="Create Ticket"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Assistant Type Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setAssistantType('ai')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                assistantType === 'ai'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              <Bot className="w-3 h-3 mr-1.5 inline" />
              AI Assistant
            </button>
            <button
              onClick={() => setAssistantType('human')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                assistantType === 'human'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              <Headphones className="w-3 h-3 mr-1.5 inline" />
              Human Agent
            </button>
          </div>
        </div>

        {/* Ticket Options */}
        {showTicketOptions && (
          <div className="bg-orange-50 dark:bg-orange-900/20 border-b border-orange-200 dark:border-orange-800 p-3">
            <p className="text-xs font-medium text-orange-800 dark:text-orange-200 mb-2">Quick Support:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => createTicket('Technical Issue')}
                className="bg-white dark:bg-gray-700 border border-orange-200 dark:border-orange-800 rounded-lg px-2 py-1.5 text-xs hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
              >
                Technical Issue
              </button>
              <button
                onClick={() => createTicket('Account Problem')}
                className="bg-white dark:bg-gray-700 border border-orange-200 dark:border-orange-800 rounded-lg px-2 py-1.5 text-xs hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
              >
                Account Problem
              </button>
              <button
                onClick={() => createTicket('Payment Issue')}
                className="bg-white dark:bg-gray-700 border border-orange-200 dark:border-orange-800 rounded-lg px-2 py-1.5 text-xs hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
              >
                Payment Issue
              </button>
              <button
                onClick={() => createTicket('General Inquiry')}
                className="bg-white dark:bg-gray-700 border border-orange-200 dark:border-orange-800 rounded-lg px-2 py-1.5 text-xs hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
              >
                General Inquiry
              </button>
            </div>
          </div>
        )}

        {/* Tickets Sidebar */}
        {tickets.length > 0 && (
          <div className="w-full border-b border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Active Tickets</p>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-xs text-orange-600 hover:text-orange-700"
              >
                Chat
              </button>
            </div>
            <div className="space-y-1">
              {tickets.map(ticket => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={`w-full text-left p-2 rounded-lg border text-xs transition-colors ${
                    selectedTicket === ticket.id
                      ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">{ticket.subject}</span>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(ticket.status)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {ticket.createdAt.toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2.5 max-w-[85%] ${
                message.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-orange-500 text-white ml-2' 
                  : message.sender === 'human'
                  ? 'bg-blue-500 text-white ml-2'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {message.sender === 'user' ? <User className="w-3.5 h-3.5" /> : 
                 message.sender === 'human' ? <Headphones className="w-3.5 h-3.5" /> : 
                 <Bot className="w-3.5 h-3.5" />}
              </div>
              <div className={`px-3 py-2 rounded-xl text-xs leading-relaxed font-sans ${
                message.sender === 'user'
                  ? 'bg-orange-500 text-white rounded-br-sm'
                  : message.sender === 'human'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-800'
                  : message.type === 'ticket-response'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border border-green-200 dark:border-green-800'
                  : 'bg-white text-gray-800 rounded-bl-sm shadow-sm dark:bg-gray-800 dark:text-gray-200'
              }`}>
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => setShowTicketOptions(!showTicketOptions)}
              className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
              title="Create Ticket"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={assistantType === 'human' ? "Describe your issue for a human agent..." : "Ask anything or create a ticket..."}
              className="flex-1 px-3 py-2 text-sm font-sans border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {isWaitingForHuman && (
            <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
              Connecting you to a human agent...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModernAIChat
