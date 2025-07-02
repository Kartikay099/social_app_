import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const HustleSwitcher = () => {
  const [activeTab, setActiveTab] = useState('hustle');
  const { isDarkMode } = useTheme();

  const hustlePosts = [1, 2, 3];

  return (
    <div className={`min-h-screen max-w-md mx-auto flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}` }>
      {/* Tabs */}
      <div className={`flex ${isDarkMode ? 'bg-gray-900 border-b-2 border-gray-700' : 'bg-white border-b-2 border-gray-200'}`} style={{marginTop: '1.5em', marginBottom: 0, padding: '0 0.5em'}}>
        <button className={`flex-1 text-center py-1 font-bold font-serif text-2xl rounded-t-lg transition-colors duration-200 outline-none ${activeTab === 'hustle' ? (isDarkMode ? 'bg-black text-white' : 'bg-white text-black') : (isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700')}`} onClick={() => setActiveTab('hustle')}>
          Hustle
        </button>
        <button className={`flex-1 text-center py-1 font-bold font-serif text-2xl rounded-t-lg transition-colors duration-200 outline-none ${activeTab === 'content' ? (isDarkMode ? 'bg-black text-white' : 'bg-white text-black') : (isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700')}`} onClick={() => setActiveTab('content')}>
          Content
        </button>
      </div>
      {/* Gap below toggle buttons */}
      <div style={{ height: '1.2em' }} />

      {/* Hustle View */}
      {activeTab === 'hustle' && (
        <div className="flex flex-col gap-4 px-2 pb-4">
          {hustlePosts.map((_, index) => (
            <div
              key={index}
              className={`rounded-xl min-h-[120px] mb-5 p-2 font-serif font-bold text-2xl border-2 transition-colors duration-200 cursor-pointer ${isDarkMode ? (index % 2 === 0 ? 'bg-gray-900 border-gray-700' : 'bg-black border-gray-800') : (index % 2 === 0 ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-200')}`}
              style={{color: 'transparent'}}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.13)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Empty card, as in screenshot */}
            </div>
          ))}
        </div>
      )}

      {/* Content View (masonry grid) */}
      {activeTab === 'content' && (
        <div className={`grid grid-cols-3 gap-0 ${isDarkMode ? 'bg-black' : 'bg-white'} p-0 border-0 min-h-[calc(100vh-80px)]`}>
          {/* Masonry-style cards, heights and positions based on screenshot */}
          <div className={`rounded-lg ${isDarkMode ? 'bg-gray-900 border-2 border-gray-700' : 'bg-gray-100 border-2 border-gray-200'} min-h-[180px]`} style={{gridRow: 'span 2'}}></div>
          <div className={`rounded-lg ${isDarkMode ? 'bg-gray-900 border-2 border-gray-700' : 'bg-gray-100 border-2 border-gray-200'} min-h-[90px]`}></div>
          <div className={`rounded-lg ${isDarkMode ? 'bg-gray-900 border-2 border-gray-700' : 'bg-gray-100 border-2 border-gray-200'} min-h-[180px]`}></div>
          <div className={`rounded-lg ${isDarkMode ? 'bg-black border-2 border-gray-800' : 'bg-white border-2 border-gray-200'} min-h-[90px]`}></div>
          <div className={`rounded-lg ${isDarkMode ? 'bg-black border-2 border-gray-800' : 'bg-white border-2 border-gray-200'} min-h-[180px]`} style={{gridRow: 'span 2'}}></div>
          <div className={`rounded-lg ${isDarkMode ? 'bg-black border-2 border-gray-800' : 'bg-white border-2 border-gray-200'} min-h-[90px]`}></div>
          <div className={`rounded-lg ${isDarkMode ? 'bg-black border-2 border-gray-800' : 'bg-white border-2 border-gray-200'} min-h-[90px]`}></div>
          <div className={`rounded-lg ${isDarkMode ? 'bg-black border-2 border-gray-800' : 'bg-white border-2 border-gray-200'} min-h-[180px]`}></div>
          <div className={`rounded-lg ${isDarkMode ? 'bg-black border-2 border-gray-800' : 'bg-white border-2 border-gray-200'} min-h-[90px]`}></div>
        </div>
      )}
    </div>
  );
};

export default HustleSwitcher;
