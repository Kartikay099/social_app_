import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Groups = ({ onChats, onCommunities }) => {
  const { isDarkMode } = useTheme();
  const filters = ['Unread', 'Active Groups', 'Favourites'];

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Tab Switcher */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={onChats}
          className={`border py-2 rounded-lg font-semibold transition-colors ${isDarkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-400'}`}
        >
          Chats
        </button>
        <button className={`py-2 rounded-lg font-semibold transition-colors ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
          Groups
        </button>
        <button
          onClick={onCommunities}
          className={`border py-2 rounded-lg font-semibold transition-colors ${isDarkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-400'}`}
        >
          Communities
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search Groups..."
            className={`w-full pl-10 py-2 rounded-md border transition-colors ${isDarkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-500' : 'bg-white text-black border-gray-400 placeholder-gray-400'}`}
          />
        </div>
        <button className={`p-2 rounded-md border transition-colors ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-400 text-black'}`}>⇅</button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f}
            className={`w-full px-3 py-2 text-sm rounded-full border text-center transition-colors ${isDarkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-400'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Group List */}
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`flex items-start justify-between p-3 rounded-lg shadow-sm transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex items-start space-x-3">
              <img
                src="/5.svg"
                alt="Group Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">Group Name</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Group message or description</p>
                <div className="flex space-x-1 mt-1 text-xs">
                  <span className="text-green-600">✓✓</span>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>👁</span>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>📌</span>
                </div>
              </div>
            </div>
            <div className={`text-xs text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Date/Time</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
