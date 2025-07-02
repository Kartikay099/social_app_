import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-react';
import { BsCheck2All } from 'react-icons/bs';
import { FaRegEye, FaThumbtack } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const IndividualChat = ({ chat, onBack }) => {
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();
  const [showAttachPermission, setShowAttachPermission] = useState(false);
  const [attachPermission, setAttachPermission] = useState(null); // null, 'allowed', 'denied'
  const fileInputRef = useRef();

  const mockMessages = [
    { id: 1, text: "Hey! How are you doing?", sender: 'them', time: '10:30 AM', status: 'read' },
    { id: 2, text: "I'm good, thanks! How about you?", sender: 'me', time: '10:32 AM', status: 'read' },
    { id: 3, text: "Pretty good! Did you see the new post about the coffee shop?", sender: 'them', time: '10:35 AM', status: 'read' },
    { id: 4, text: "Yes! It looks amazing. We should check it out sometime.", sender: 'me', time: '10:37 AM', status: 'delivered' },
    { id: 5, text: "Definitely! Maybe this weekend?", sender: 'them', time: '10:40 AM', status: 'read' },
  ];

  useEffect(() => {
    setMessages(mockMessages);
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sending'
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      setTimeout(() => {
        setMessages(prev => prev.map(msg =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);

      setTimeout(() => {
        setMessages(prev => prev.map(msg =>
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        ));
      }, 2000);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply = {
          id: messages.length + 2,
          text: "Thanks for the message! I'll get back to you soon.",
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        };
        setMessages(prev => [...prev, reply]);
      }, 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Modern status icons
  const getStatusIcon = (status) => {
    switch (status) {
      case 'sending':
        return <span className="text-gray-400 animate-pulse">⏳</span>;
      case 'delivered':
        return <span className="text-green-500 flex items-center"><BsCheck2All size={18} /></span>;
      case 'read':
        return <span className="text-blue-500 flex items-center"><BsCheck2All size={18} /></span>;
      default:
        return null;
    }
  };

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className={`p-2 rounded-full ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <ArrowLeft size={20} />
          </button>
          <div className="relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${chat?.id % 2 === 0 ? 'bg-blue-500' : 'bg-pink-500'}`}>
              {chat?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            {chat?.online && (
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 ${isDarkMode ? 'border-gray-800' : 'border-white'}`} />
            )}
          </div>
          <div>
            <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{chat?.name || 'Chat'}</h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{chat?.online ? 'Online' : 'Last seen recently'}</p>
          </div>
        </div>
        <div className="flex items-center relative">
          <button
            ref={buttonRef}
            className={`p-2 rounded-full ${isDarkMode ? 'text-white' : 'text-black'}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open chat menu"
          >
            <MoreVertical size={20} />
          </button>
          <div
            ref={menuRef}
            className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 transition-all duration-200 ease-out
              ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
              ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'}`}
            style={{top: '100%', minWidth: '12rem'}}
          >
            <button
              className={`block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
              onClick={() => { setMenuOpen(false); alert('View Profile clicked'); }}
            >
              View Profile
            </button>
            <button
              className={`block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
              onClick={() => { setMenuOpen(false); alert('Mute Notifications clicked'); }}
            >
              Mute Notifications
            </button>
            <button
              className={`block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
              onClick={() => { setMenuOpen(false); alert('Clear Chat clicked'); }}
            >
              Clear Chat
            </button>
            <button
              className={`block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition-colors ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
              onClick={() => { setMenuOpen(false); alert('Delete Chat clicked'); }}
            >
              Delete Chat
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative group ${
              msg.sender === 'me'
                ? 'bg-blue-600 text-white rounded-br-md'
                : isDarkMode
                ? 'bg-gray-900 text-white rounded-bl-md'
                : 'bg-white text-black border border-gray-200 rounded-bl-md'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <div className={`flex items-center justify-end space-x-2 mt-1 ${msg.sender === 'me' ? 'text-blue-200' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="text-xs">{msg.time}</span>
                {msg.sender === 'me' && getStatusIcon(msg.status)}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className={`px-4 py-2 rounded-2xl shadow-sm ${isDarkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
              <div className="flex space-x-1">
                {[0, 0.1, 0.2].map((delay, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full animate-bounce ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}`}
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-3">
          <button
            className={`p-2 rounded-full ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            onClick={() => {
              if (attachPermission === 'allowed') {
                fileInputRef.current.click();
              } else if (attachPermission === 'denied') {
                alert('Permission denied. Please allow file access to attach files.');
              } else {
                setShowAttachPermission(true);
              }
            }}
            aria-label="Attach file"
          >
            <Paperclip size={20} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*,application/pdf"
            style={{ display: 'none' }}
            onChange={e => {
              if (e.target.files && e.target.files.length > 0) {
                alert('File selected: ' + e.target.files[0].name);
              }
            }}
          />
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className={`w-full px-4 py-3 pr-12 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                  : 'bg-gray-100 text-black border-gray-300 placeholder-gray-500'
              }`}
            />
            <button className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Smile size={18} />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-3 rounded-full ${
              message.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : isDarkMode
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Attach Permission Modal */}
      {showAttachPermission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className={`rounded-2xl p-6 w-80 max-w-full shadow-lg ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}> 
            <h2 className="text-xl font-bold mb-4">Allow file access?</h2>
            <p className="mb-4 text-sm">This app needs permission to access your photos, videos, and PDFs to attach them in chat.</p>
            <div className="flex gap-4 mt-2">
              <button
                className="flex-1 py-2 rounded bg-blue-600 text-white font-semibold"
                onClick={() => {
                  setAttachPermission('allowed');
                  setShowAttachPermission(false);
                  setTimeout(() => fileInputRef.current.click(), 200);
                }}
              >Allow</button>
              <button
                className={`flex-1 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}
                onClick={() => {
                  setAttachPermission('denied');
                  setShowAttachPermission(false);
                  setTimeout(() => alert('Permission denied. Please allow file access to attach files.'), 200);
                }}
              >Deny</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualChat;
