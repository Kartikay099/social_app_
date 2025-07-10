import React, { useState } from 'react';
import {
  ArrowLeft, Bell, Shield, Moon, Sun, Wifi,
  Volume2, VolumeX, User, Lock, HelpCircle, LogOut
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const Settings = ({ onBack }) => {
  const { isDarkMode, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const user = {
    name: 'Jane Doe',
    avatar: '/profilepic.png',
    tagline: 'Loving the social vibes!',
  };

  const CustomToggle = ({ enabled, onChange }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
        enabled ? 'bg-pink-500' : 'bg-gray-400'
      }`}
    >
      <span
        className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
          enabled ? 'translate-x-5' : ''
        }`}
      />
    </button>
  );

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', action: 'edit-profile' },
        { icon: Lock, label: 'Privacy', action: 'privacy' },
        { icon: Shield, label: 'Two-Factor Auth', action: '2fa' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', toggle: notifications, onToggle: () => setNotifications(!notifications) },
        { icon: isDarkMode ? Moon : Sun, label: 'Dark Mode', toggle: isDarkMode, onToggle: () => setTheme(!isDarkMode) },
        { icon: soundEnabled ? Volume2 : VolumeX, label: 'Sound', toggle: soundEnabled, onToggle: () => setSoundEnabled(!soundEnabled) },
        { icon: Wifi, label: 'Auto-play Videos', toggle: autoPlay, onToggle: () => setAutoPlay(!autoPlay) },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', action: 'help' },
        { icon: User, label: 'About VOAT', action: 'about' },
        { icon: LogOut, label: 'Log Out', action: 'logout', danger: true },
      ],
    },
  ];

  const handleAction = (action) => {
    switch (action) {
      case 'edit-profile':
      case 'privacy':
      case '2fa':
      case 'help':
      case 'about':
        alert(`${action} clicked`);
        break;
      case 'logout':
        if (confirm('Are you sure you want to log out?')) alert('Logging out...');
        break;
    }
  };

  return (
    <div className={`min-h-screen pb-8 px-4 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#f9f9f9] text-black'}`}>
      {/* Header */}
      <div className="flex flex-col items-center text-center py-8 bg-[#1e1e1e] text-white rounded-b-2xl relative">
        <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 mb-3" />
        <h2 className="font-semibold text-lg">{user.name}</h2>
        <p className="text-xs text-gray-300">{user.tagline}</p>
        <button onClick={onBack} className="absolute top-4 left-4 p-2">
          <ArrowLeft className="text-white" />
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-10 mt-10">
        {settingsSections.map((section, i) => (
          <div key={i}>
            <h3 className="font-medium text-xs text-gray-500 uppercase tracking-wide mb-2">
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.items.map((item, j) => (
                <div
                  key={j}
                  className={`flex items-center justify-between px-4 py-3 rounded-md ${
                    isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'
                  } border ${item.danger ? 'border-red-400 text-red-500' : 'border-gray-200'} cursor-pointer`}
                  onClick={() => item.action && handleAction(item.action)}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={18} className={item.danger ? 'text-red-500' : 'text-gray-600'} />
                    <span className="text-sm font-normal">{item.label}</span>
                  </div>
                  {item.toggle !== undefined ? (
                    <CustomToggle enabled={item.toggle} onChange={item.onToggle} />
                  ) : (
                    <span className="text-gray-400 text-sm">›</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-12">
        <div className="flex justify-center items-center gap-2 mb-1">
          <img src="/vite.svg" alt="Logo" className="w-5 h-5" />
          <span className="font-medium text-pink-500">VOAT Network</span>
        </div>
        <p>v1.0.0 © 2024</p>
        <p>Built for the community</p>
      </div>
    </div>
  );
};

export default Settings;
