'use client'

import React, { useState } from 'react'

const FlawlessAIChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! I\'m Annita\'s AI assistant. How can I help you today?', sender: 'ai' }
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    
    const userMsg = { id: Date.now().toString(), text: input, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    
    setTimeout(() => {
      const aiMsg = { 
        id: (Date.now() + 1).toString(), 
        text: 'Thank you for your message! For more information about Annita\'s services, please visit our contact page.', 
        sender: 'ai' 
      }
      setMessages(prev => [...prev, aiMsg])
    }, 1000)
  }

  if (!isOpen) {
    return React.createElement('div', { className: 'fixed bottom-6 right-6 z-50' },
      React.createElement('button', {
        onClick: () => setIsOpen(true),
        className: 'bg-orange-500 hover:bg-orange-600 text-white rounded-full w-14 h-14 shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center'
      },
        React.createElement('svg', { className: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
          React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' })
        )
      )
    )
  }

  return React.createElement('div', { className: 'fixed bottom-6 right-6 z-50 w-96 h-[500px]' },
    React.createElement('div', { className: 'bg-white rounded-2xl shadow-2xl border border-gray-200 h-full flex flex-col' },
      React.createElement('div', { className: 'bg-orange-500 text-white p-4 flex items-center justify-between' },
        React.createElement('div', { className: 'flex items-center gap-3' },
          React.createElement('div', { className: 'w-8 h-8 bg-white/20 rounded-full flex items-center justify-center' },
            React.createElement('svg', { className: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 20 20' },
              React.createElement('path', { d: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' })
            )
          ),
          React.createElement('div', null,
            React.createElement('h3', { className: 'font-semibold' }, 'Annita AI Assistant'),
            React.createElement('p', { className: 'text-xs opacity-90' }, '24/7 Support')
          )
        ),
        React.createElement('button', {
          onClick: () => setIsOpen(false),
          className: 'p-1 text-white hover:bg-white/20 rounded'
        }, React.createElement('svg', { className: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
          React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M6 18L18 6M6 6l12 12' })
        ))
      ),
      React.createElement('div', { className: 'flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50' },
        messages.map(msg => 
          React.createElement('div', {
            key: msg.id,
            className: `flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`
          },
            React.createElement('div', {
              className: `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'user' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
              }`
            }, msg.sender === 'user' ? 
              React.createElement('svg', { className: 'w-4 h-4', fill: 'currentColor', viewBox: '0 0 20 20' },
                React.createElement('path', { fillRule: 'evenodd', d: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z', clipRule: 'evenodd' })
              ) :
              React.createElement('svg', { className: 'w-4 h-4', fill: 'currentColor', viewBox: '0 0 20 20' },
                React.createElement('path', { d: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' })
              )
            ),
            React.createElement('div', {
              className: `px-4 py-2 rounded-2xl text-sm ${
                msg.sender === 'user' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'
              }`
            }, msg.text)
          )
        )
      ),
      React.createElement('div', { className: 'p-4 bg-white border-t border-gray-200' },
        React.createElement('div', { className: 'flex gap-2' },
          React.createElement('input', {
            type: 'text',
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyPress: (e) => e.key === 'Enter' && sendMessage(),
            placeholder: 'Type your message...',
            className: 'flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500'
          }),
          React.createElement('button', {
            onClick: sendMessage,
            disabled: !input.trim(),
            className: 'bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-2 rounded-full'
          }, React.createElement('svg', { className: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
            React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' })
          ))
        )
      )
    )
  )
}

export default FlawlessAIChat
