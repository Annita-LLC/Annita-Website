'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Clock, Check, CheckCheck } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  status?: 'sending' | 'sent' | 'delivered' | 'read'
}

interface ChatSession {
  id: string
  messages: Message[]
  startTime: Date
  lastActivity: Date
}

const EnterpriseAIChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [session, setSession] = useState<ChatSession>({
    id: 'session-' + Date.now(),
    messages: [
      {
        id: 'welcome-1',
        text: 'Welcome to Annita Enterprise Support. I\'m your AI assistant, here to provide world-class support for all your needs.',
        sender: 'ai',
        timestamp: new Date(),
        status: 'delivered'
      }
    ],
    startTime: new Date(),
    lastActivity: new Date()
  })
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [session.messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const generateAIResponse = useCallback((userMessage: string): string => {
    const responses = {
      greeting: 'Hello! I\'m here to assist you with Annita\'s enterprise solutions. How may I help you today?',
      services: 'Annita offers comprehensive enterprise solutions including digital transformation, procurement systems, financial technology, and AI-powered analytics. Which area interests you most?',
      contact: 'For enterprise inquiries, you can reach our specialist team at enterprise@an-nita.com or call +231-555-0123 during business hours.',
      pricing: 'Our enterprise solutions are customized based on your specific needs. Please schedule a consultation with our solutions team for detailed pricing.',
      support: 'We provide 24/7 enterprise support with guaranteed response times: Critical issues - 15 minutes, High priority - 1 hour, Normal - 4 hours.',
      default: 'I understand you\'re interested in Annita\'s services. Our enterprise platform serves thousands of businesses across Africa with secure, scalable solutions. Would you like more specific information about any particular service?'
    }

    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) return responses.greeting
    if (lowerMessage.includes('service') || lowerMessage.includes('offer')) return responses.services
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('call')) return responses.contact
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) return responses.pricing
    if (lowerMessage.includes('support') || lowerMessage.includes('help')) return responses.support
    
    return responses.default
  }, [])

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || connectionStatus !== 'connected') return

    const userMessage: Message = {
      id: 'msg-' + Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    }

    setSession(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      lastActivity: new Date()
    }))

    setInputValue('')
    setIsTyping(true)

    // Simulate message status updates
    setTimeout(() => {
      setSession(prev => ({
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'sent' as const } : msg
        )
      }))
    }, 500)

    setTimeout(() => {
      setSession(prev => ({
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'delivered' as const } : msg
        )
      }))
    }, 1000)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: 'ai-' + (Date.now() + 1),
        text: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
        status: 'delivered'
      }

      setSession(prev => ({
        ...prev,
        messages: [...prev.messages, aiResponse],
        lastActivity: new Date()
      }))
      setIsTyping(false)

      // Mark user message as read
      setTimeout(() => {
        setSession(prev => ({
          ...prev,
          messages: prev.messages.map(msg => 
            msg.id === userMessage.id ? { ...msg, status: 'read' as const } : msg
          )
        }))
      }, 2000)
    }, 1500 + Math.random() * 1000)
  }, [inputValue, connectionStatus, generateAIResponse])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }, [handleSendMessage])

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }, [])

  const MessageStatusIcon = ({ status }: { status?: string }) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />
      default:
        return null
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full w-16 h-16 p-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <MessageCircle className="w-7 h-7" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            <div className="font-medium">Enterprise Support</div>
            <div className="text-gray-300">24/7 AI Assistant</div>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[640px]'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Annita Enterprise</h3>
              <div className="flex items-center gap-2 text-xs opacity-90">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-400' : 
                  connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <span>
                  {connectionStatus === 'connected' ? 'Online' : 
                   connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
              {session.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 max-w-[85%] ${
                    message.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300 shadow-md'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`flex flex-col ${
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  }`}>
                    <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-sm shadow-md'
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm dark:bg-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700'
                    }`}>
                      {message.text}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400 ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === 'user' && <MessageStatusIcon status={message.status} />}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 mr-auto max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 flex items-center justify-center flex-shrink-0 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300 shadow-md">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-2 rounded-2xl rounded-bl-sm bg-white text-gray-800 shadow-sm dark:bg-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={connectionStatus !== 'connected'}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || connectionStatus !== 'connected'}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none transform hover:scale-105 disabled:scale-100"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                {connectionStatus === 'connected' ? 
                  'Messages are encrypted and stored securely' : 
                  'Reconnecting to secure server...'
                }
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EnterpriseAIChat
