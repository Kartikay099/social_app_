import React from 'react';
import { ArrowLeft, MessageCircle, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const ProfileIcon = () => (
    <div className="w-12 h-12 rounded-full bg-rose-100 flex flex-col items-center justify-end overflow-hidden pt-2 shrink-0">
      <div className="w-4 h-4 rounded-full bg-pink-300 -mb-1 z-10"></div>
      <div className="w-8 h-6 rounded-t-full bg-blue-400"></div>
    </div>
);

const NotificationItem = ({ name, message, time, isDarkMode }) => (
    <div className="flex items-center space-x-4 py-2">
        <ProfileIcon />
        <div className="flex-grow">
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
                <span className="font-bold">{name}</span> {message}
            </p>
        </div>
        <div className={`text-xs shrink-0 transition-colors ${
          isDarkMode ? 'text-gray-500' : 'text-gray-600'
        }`}>{time}</div>
    </div>
);

const Notifications = ({ onBack }) => {
    const { isDarkMode } = useTheme();
    
    const notifications = {
        today: [
            { name: 'Profile Name,', message: 'the message will be displated in continution to the text', time: '13h' },
            { name: 'Profile Name,', message: 'the message will be displated in continution to the text', time: '17h' },
        ],
        yesterday: [
            { name: 'Profile Name,', message: 'the message will be displated in continution to the text', time: '1d' },
            { name: 'Profile Name,', message: 'the message will be displated in continution to the text', time: '1d' },
            { name: 'Profile Name,', message: 'the message will be displated in continution to the text', time: '1d' },
        ],
        lastWeek: [
            { name: 'Profile Name,', message: 'the message will be displated in continution to the text', time: '4d' },
            { name: 'Profile Name,', message: 'the message will be displated in continution to the text', time: '...' },
        ],
    };

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${
          isDarkMode ? 'bg-black text-gray-300' : 'bg-white text-gray-700'
        }`}>
            {/* Header */}
            <header className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-4">
                    <button onClick={onBack} className={isDarkMode ? 'text-white' : 'text-black'}>
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className={`text-xl font-bold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>Notifications</h1>
                </div>
                <MessageCircle size={28} className={isDarkMode ? 'text-white' : 'text-black'}/>
            </header>

            {/* Network Requests */}
            <section className="px-4 py-2">
                <div className="flex items-center space-x-4">
                    <div className="relative flex-shrink-0 w-12 h-12">
                        <div className={`w-12 h-12 rounded-full absolute -top-1 -left-1 transition-colors ${
                          isDarkMode ? 'bg-gray-400' : 'bg-gray-300'
                        }`}></div>
                        <div className={`w-12 h-12 rounded-full absolute top-1 left-1 transition-colors ${
                          isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                        }`}></div>
                         <div className="absolute top-0 left-0"><ProfileIcon/></div>
                    </div>
                    <div className="flex-grow">
                        <p className={`font-bold transition-colors ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}>Network Requests</p>
                        <p className={`text-sm transition-colors ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>profile names will be displayed</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <ChevronRight size={24} className={isDarkMode ? 'text-white' : 'text-black'}/>
                    </div>
                </div>
            </section>
            
            {/* Notifications List */}
            <main className="px-4 space-y-4 mt-4">
                <div>
                    <h2 className={`text-xl font-bold mb-2 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>Today</h2>
                    <div className="space-y-1">
                        {notifications.today.map((n, i) => <NotificationItem key={`today-${i}`} {...n} isDarkMode={isDarkMode} />)}
                    </div>
                </div>
                <div>
                    <h2 className={`text-xl font-bold mb-2 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>Yesterday</h2>
                    <div className="space-y-1">
                        {notifications.yesterday.map((n, i) => <NotificationItem key={`yesterday-${i}`} {...n} isDarkMode={isDarkMode} />)}
                    </div>
                </div>
                <div>
                    <h2 className={`text-xl font-bold mb-2 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>Last Week</h2>
                    <div className="space-y-1">
                        {notifications.lastWeek.map((n, i) => <NotificationItem key={`lastweek-${i}`} {...n} isDarkMode={isDarkMode} />)}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Notifications; 