import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const ChatItem = ({ name, lastMessage, timestamp, avatar, status = 'sent', unread = false }) => {
  const { isDarkMode } = useTheme();
  
  const getStatusIcon = () => {
    switch (status) {
      case 'sent':
        return <Check size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-400'} />;
      case 'delivered':
        return <CheckCheck size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-400'} />;
      case 'read':
        return <CheckCheck size={14} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center p-4 transition-colors duration-150 ${
      isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-amber-50'
    }`}>
      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
        {avatar || name.charAt(0).toUpperCase()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className={`font-medium truncate ${
            unread 
              ? isDarkMode ? 'text-white' : 'text-gray-900'
              : isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {name}
          </h3>
          <span className={`text-xs ml-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>{timestamp}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className={`text-sm truncate ${
            unread 
              ? isDarkMode ? 'font-medium text-white' : 'font-medium text-gray-900'
              : isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {lastMessage}
          </p>
          <div className="flex items-center ml-2">
            {getStatusIcon()}
            {unread && (
              <div className="w-2 h-2 bg-amber-600 rounded-full ml-2"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;