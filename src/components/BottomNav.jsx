import React from 'react';
import { useTheme } from '../context/ThemeContext';

const tabs = [
  { id: 'home', icon: '/1.svg' },
  { id: 'hustle', icon: '/7.svg' },  
  { id: 'add', icon: '/3.svg' },
  { id: 'map', icon: '/4.svg' },
  { id: 'profile', icon: '/6.svg' },
];

const BottomNav = ({ activeTab, setActiveTab }) => {
  const { isDarkMode } = useTheme();

  const barBg = isDarkMode ? 'bg-[#23272B]' : 'bg-[#F4F8FB]';
  const underlineColor = isDarkMode ? 'bg-white' : 'bg-[#1A4AC9]';

  const handleTabClick = (tabId) => {
    setActiveTab(tabId); // 🔥 just switch tab — no overlay call
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className={`max-w-md mx-auto h-[74px] flex items-end justify-between ${barBg}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="flex-1 h-full relative flex flex-col items-center justify-center transition-all duration-200"
              style={{
                background: isActive ? (isDarkMode ? '#23272B' : '#fff') : 'transparent',
                border: 'none',
                outline: 'none',
                height: '74px',
              }}
            >
              {isActive && (
                <div
                  className={`absolute top-0 left-0 right-0 h-2 rounded-b-lg ${underlineColor}`}
                  style={{ zIndex: 2 }}
                />
              )}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'transparent',
                }}
              >
                <img
                  src={tab.icon}
                  alt={tab.id}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: 'contain',
                    boxShadow: isActive
                      ? '0 0 16px 4px rgba(37,99,235,0.45)'
                      : 'none',
                    borderRadius: '50%',
                    background: 'white',
                    padding: 2,
                    display: 'block',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
