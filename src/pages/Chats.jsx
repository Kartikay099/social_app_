import React, { useState, useEffect } from 'react';
import IndividualChat from './IndividualChat';
import {
  ArrowLeft,
  Search,
  UserPlus,
  MessageSquare,
  Plus,
  Archive,
  SlidersHorizontal,
} from 'lucide-react';
import { BsCheck2All } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext.jsx';

const ChatPage = ({ onBack, onGroups, onCommunities }) => {
  const [openChat, setOpenChat] = useState(null);
  const { isDarkMode } = useTheme();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const [filteredChats, setFilteredChats] = useState([]);

  const filters = ['Unread', 'Active Friends', 'Favourites'];

  // Mock data for chats
  const mockChats = [
    { id: 1, name: 'Alex Johnson', message: 'Hey! How are you doing?', time: '2m ago', unread: 2, online: true, avatar: '/5.svg' },
    { id: 2, name: 'Sarah Wilson', message: 'Did you see the new post?', time: '15m ago', unread: 0, online: false, avatar: '/5.svg' },
    { id: 3, name: 'Mike Chen', message: 'Thanks for the help!', time: '1h ago', unread: 1, online: true, avatar: '/5.svg' },
    { id: 4, name: 'Emma Davis', message: 'See you tomorrow!', time: '2h ago', unread: 0, online: false, avatar: '/5.svg' },
  ];

  const mockGroups = [
    { id: 1, name: 'Coffee Lovers', message: 'New coffee shop opened!', time: '5m ago', unread: 3, members: 24, avatar: '/5.svg' },
    { id: 2, name: 'Tech Enthusiasts', message: 'Anyone up for a meetup?', time: '1h ago', unread: 0, members: 156, avatar: '/5.svg' },
    { id: 3, name: 'Travel Buddies', message: 'Planning next trip...', time: '3h ago', unread: 1, members: 89, avatar: '/5.svg' },
  ];

  const mockCommunities = [
    { id: 1, name: 'Local Foodies', message: 'Best restaurants in town', time: '10m ago', unread: 5, members: 1200, avatar: '/5.svg' },
    { id: 2, name: 'Fitness Community', message: 'Workout motivation needed!', time: '2h ago', unread: 0, members: 890, avatar: '/5.svg' },
    { id: 3, name: 'Art & Culture', message: 'New exhibition this weekend', time: '1d ago', unread: 2, members: 567, avatar: '/5.svg' },
  ];

  // Filter chats based on search query
  useEffect(() => {
    let data = [];
    switch (activeTab) {
      case 'chats':
        data = mockChats;
        break;
      case 'groups':
        data = mockGroups;
        break;
      case 'communities':
        data = mockCommunities;
        break;
      default:
        data = mockChats;
    }

    if (query.trim()) {
      const filtered = data.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.message.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(data);
    }
  }, [query, activeTab]);

  const handleChatClick = (chat) => {
    setOpenChat(chat);
  };

  const handleCloseChat = () => {
    setOpenChat(null);
  };

  const sharedCard = (label, data) => (
    <div className="space-y-3">
      {data.map((item) => (
        <div
          key={item.id}
          className={`flex items-start justify-between p-3 rounded-lg shadow-sm hover:transition-colors cursor-pointer ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => handleChatClick(item)}
        >
          <div className="flex items-start space-x-3">
            <div className="relative">
              <img
                src={item.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              {item.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.name}</p>
                {item.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {item.unread}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>{item.message}</p>
                {/* Double check icon on the right */}
                <span title="Delivered" className="text-green-500 flex items-center ml-2"><BsCheck2All size={18} /></span>
              </div>
              {activeTab === 'groups' || activeTab === 'communities' ? (
                <div className="mt-1 text-xs">
                  <span className={isDarkMode ? 'text-gray-200' : 'text-gray-600'}>{item.members} members</span>
                </div>
              ) : null}
            </div>
          </div>
          <div className={`text-xs text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{item.time}</div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'chats':
        return sharedCard('Friend Name', filteredChats);
      case 'groups':
        return sharedCard('Group Name', filteredChats);
      case 'communities':
        return sharedCard('Community Name', filteredChats);
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 relative ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <ArrowLeft 
            className={`cursor-pointer hover:text-gray-300 transition-colors ${
              isDarkMode ? 'text-white' : 'text-black'
            }`} 
            onClick={onBack} 
          />
          <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Chats</div>
        </div>
        <div className="flex space-x-4">
          <UserPlus className={`cursor-pointer hover:text-gray-300 transition-colors ${
            isDarkMode ? 'text-white' : 'text-black'
          }`} />
        </div>
      </div>

      {/* Profile Icons Row */}
      <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar scroll-smooth mb-8 relative">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg"></div>
          <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
            <Plus size={14} />
          </button>
        </div>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`w-16 h-16 rounded-full flex-shrink-0 shadow-lg ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-600 to-gray-700' 
                : 'bg-gradient-to-br from-gray-300 to-gray-400'
            }`}
          ></div>
        ))}
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={() => setActiveTab('chats')}
          className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === 'chats'
              ? isDarkMode 
                ? 'bg-white text-black shadow-lg transform scale-105'
                : 'bg-black text-white shadow-lg transform scale-105'
              : isDarkMode
                ? 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700'
                : 'bg-gray-200 text-black border border-gray-300 hover:bg-gray-300'
          }`}
        >
          Chats
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === 'groups'
              ? isDarkMode 
                ? 'bg-white text-black shadow-lg transform scale-105'
                : 'bg-black text-white shadow-lg transform scale-105'
              : isDarkMode
                ? 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700'
                : 'bg-gray-200 text-black border border-gray-300 hover:bg-gray-300'
          }`}
        >
          Groups
        </button>
        <button
          onClick={() => setActiveTab('communities')}
          className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === 'communities'
              ? isDarkMode 
                ? 'bg-white text-black shadow-lg transform scale-105'
                : 'bg-black text-white shadow-lg transform scale-105'
              : isDarkMode
                ? 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700'
                : 'bg-gray-200 text-black border border-gray-300 hover:bg-gray-300'
          }`}
        >
          Communities
        </button>
      </div>

      {/* Search and Buttons */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className={`w-full pl-12 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
              isDarkMode 
                ? 'bg-gray-800 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 placeholder-gray-400'
                : 'bg-gray-100 text-black border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 placeholder-gray-500'
            }`}
          />
          <Search className={`absolute left-4 top-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
        </div>
        <button
          className={`p-3 rounded-xl border transition-colors ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-800 hover:bg-gray-700' 
              : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => alert('Archive clicked')}
        >
          <Archive size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
        </button>
        <button
          className={`p-3 rounded-xl border transition-colors ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-800 hover:bg-gray-700' 
              : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => alert('Filter/Sort clicked')}
        >
          <SlidersHorizontal size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            className={`w-full px-4 py-3 text-sm rounded-xl border text-center hover:transition-colors font-medium ${
              isDarkMode 
                ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' 
                : 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderContent()}


      {/* Individual Chat Modal */}
      {/* Chat Modal with Slide-in Effect */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-all duration-500 ${openChat ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        style={{
          transitionProperty: 'opacity',
        }}
      >
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-gray-900 rounded-l-xl shadow-2xl overflow-hidden flex flex-col transform transition-transform duration-500 ${openChat ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {openChat && <IndividualChat chat={openChat} onBack={handleCloseChat} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
