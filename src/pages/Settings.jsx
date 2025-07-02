import React, { useState } from 'react';
import { ArrowLeft, Bell, Shield, Moon, Sun, Wifi, Volume2, VolumeX, User, Lock, HelpCircle, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const Settings = ({ onBack }) => {
  const { isDarkMode, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', action: 'edit-profile' },
        { icon: Lock, label: 'Privacy & Security', action: 'privacy' },
        { icon: Shield, label: 'Two-Factor Authentication', action: '2fa' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', action: 'notifications', toggle: notifications, onToggle: setNotifications },
        { icon: isDarkMode ? Moon : Sun, label: 'Dark Mode', action: 'dark-mode', toggle: isDarkMode, onToggle: (value) => setTheme(value) },
        { icon: soundEnabled ? Volume2 : VolumeX, label: 'Sound', action: 'sound', toggle: soundEnabled, onToggle: setSoundEnabled },
        { icon: Wifi, label: 'Auto-play Videos', action: 'autoplay', toggle: autoPlay, onToggle: setAutoPlay },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', action: 'help' },
        { icon: User, label: 'About VOAT', action: 'about' },
        { icon: LogOut, label: 'Log Out', action: 'logout', danger: true },
      ]
    }
  ];

  const handleAction = (action) => {
    switch (action) {
      case 'edit-profile':
        console.log('Edit Profile clicked');
        break;
      case 'privacy':
        console.log('Privacy & Security clicked');
        break;
      case '2fa':
        console.log('Two-Factor Authentication clicked');
        break;
      case 'help':
        console.log('Help & Support clicked');
        break;
      case 'about':
        console.log('About VOAT clicked');
        break;
      case 'logout':
        if (confirm('Are you sure you want to log out?')) {
          console.log('Logging out...');
        }
        break;
      default:
        console.log('Action:', action);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <div className={`flex items-center p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <ArrowLeft 
          className={`cursor-pointer hover:text-gray-300 transition-colors mr-4 ${isDarkMode ? 'text-white' : 'text-black'}`}
          onClick={onBack} 
        />
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Settings Content */}
      <div className="p-4 space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <h2 className={`text-lg font-semibold px-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{section.title}</h2>
            <div className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex items-center justify-between p-4 border-b last:border-b-0 hover:transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'border-gray-700 hover:bg-gray-700' 
                      : 'border-gray-200 hover:bg-gray-200'
                  } ${
                    item.danger ? (isDarkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50') : ''
                  }`}
                  onClick={() => handleAction(item.action)}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon 
                      size={20} 
                      className={item.danger 
                        ? 'text-red-400' 
                        : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      } 
                    />
                    <span className={item.danger 
                      ? 'text-red-400' 
                      : isDarkMode ? 'text-white' : 'text-black'
                    }>
                      {item.label}
                    </span>
                  </div>
                  
                  {item.toggle !== undefined ? (
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          item.onToggle(!item.toggle);
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.toggle 
                            ? 'bg-blue-600' 
                            : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            item.toggle ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ) : (
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* App Version */}
        <div className="text-center pt-8">
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>VOAT Network v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings; 