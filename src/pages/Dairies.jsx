import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Plus, CalendarDays } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Dairies = ({ onBack }) => {
  const { isDarkMode } = useTheme();
  const [entries, setEntries] = useState([]); // Keep it empty for now

  return (
    <div className={`min-h-screen px-4 py-6 ${isDarkMode ? 'bg-[#0f0f0f] text-white' : 'bg-[#fdfdfd] text-gray-900'}`}>
      
      {/* Header */}
      <div className="flex items-center w-full max-w-2xl mx-auto mb-6">
        <button onClick={onBack} className="p-2 rounded-md bg-transparent">
          <ArrowLeft size={24} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
        </button>
        <h1 className="ml-4 text-2xl font-semibold flex items-center gap-2">
          <BookOpen size={26} /> Dairies
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className={`rounded-full p-6 mb-5 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <BookOpen size={48} className="text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold mb-1">No dairies yet</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Start your first entry to capture thoughts, stories, or memories.
            </p>
            <button
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium"
              onClick={() => alert('New Diary Entry Flow')}
            >
              <Plus size={18} /> New Diary
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div
                key={index}
                className={`border rounded-md px-4 py-3 ${
                  isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-base truncate">{entry.title}</h3>
                  <span className="flex items-center text-xs text-gray-500 gap-1">
                    <CalendarDays size={14} /> {entry.date}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 mt-20 mb-4">
        <p>Private & Secure — Only you can view these diaries</p>
      </div>
    </div>
  );
};

export default Dairies;
