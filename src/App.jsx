import React, { useState } from 'react';
import BottomNav from './components/BottomNav.jsx';
import Home from './pages/Home.jsx';
import AddPost from './pages/AddPost.jsx';
import Explore from './pages/Explore.jsx';
import Profile from './pages/Profile.jsx';
import Notifications from './pages/Notifications.jsx';
import Chats from './pages/Chats.jsx';
import Groups from './pages/Groups.jsx';
import Communities from './pages/Communities.jsx';
import IndividualChat from './pages/IndividualChat.jsx';
import Settings from './pages/Settings.jsx';
import MenuPage from './pages/MenuPage.jsx';
import HustleSwitcher from './pages/HustleSwitcher.jsx';
import { useTheme } from './context/ThemeContext.jsx';

function App() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  // Overlay states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showCommunities, setShowCommunities] = useState(false);
  const [showIndividualChat, setShowIndividualChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);

  const hideAllScreens = () => {
    setShowNotifications(false);
    setShowChats(false);
    setShowGroups(false);
    setShowCommunities(false);
    setShowIndividualChat(false);
    setShowSettings(false);
    setShowMenu(false);
    setCurrentChat(null);
  };

  const handleShowNotifications = () => {
    hideAllScreens();
    setShowNotifications(true);
  };

  const handleShowChats = () => {
    hideAllScreens();
    setShowChats(true);
  };

  const handleShowGroups = () => {
    hideAllScreens();
    setShowGroups(true);
  };

  const handleShowCommunities = () => {
    hideAllScreens();
    setShowCommunities(true);
  };

  const handleOpenChat = (chat) => {
    hideAllScreens();
    setCurrentChat(chat);
    setShowIndividualChat(true);
  };

  const handleShowSettings = () => {
    hideAllScreens();
    setShowSettings(true);
  };

  const handleShowMenu = () => {
    hideAllScreens();
    setShowMenu(true);
  };

  const handleShowExploreFromMenu = () => {
    hideAllScreens();
    setActiveTab('explore');
  };

  const renderPage = () => {
    if (showMenu)
      return (
        <MenuPage
          onBack={hideAllScreens}
          onShowSettings={handleShowSettings}
          onShowExplore={handleShowExploreFromMenu}
        />
      );

    if (showNotifications) return <Notifications onBack={hideAllScreens} />;
    if (showChats)
      return (
        <Chats
          onBack={hideAllScreens}
          onGroups={handleShowGroups}
          onCommunities={handleShowCommunities}
          onOpenChat={handleOpenChat}
        />
      );
    if (showGroups)
      return (
        <Groups
          onBack={hideAllScreens}
          onChats={handleShowChats}
          onCommunities={handleShowCommunities}
        />
      );
    if (showCommunities)
      return (
        <Communities
          onBack={hideAllScreens}
          onChats={handleShowChats}
          onGroups={handleShowGroups}
        />
      );
    if (showIndividualChat)
      return (
        <IndividualChat chat={currentChat} onBack={() => setShowChats(true)} />
      );
    if (showSettings) return <Settings onBack={hideAllScreens} />;

    // Tab-based pages
    switch (activeTab) {
      case 'home':
        return (
          <Home
            onNotificationClick={handleShowNotifications}
            onChatClick={handleShowChats}
            onShowHustle={() => setActiveTab('hustle')}
          />
        );
      case 'hustle':
        return <HustleSwitcher />; // No back button
      case 'explore':
        return <Explore />;
      case 'add':
        return <AddPost />;
      case 'map':
        return <Explore />;
      case 'profile':
        return (
          <Profile
            onSettingsClick={handleShowSettings}
            onMenuClick={handleShowMenu}
          />
        );
      default:
        return <Home />;
    }
  };

  return (
    <div
      className={`min-h-screen max-w-md mx-auto relative transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="pb-20">{renderPage()}</div>

      {/* Bottom nav shows when no overlays are open */}
      {!showNotifications &&
        !showChats &&
        !showGroups &&
        !showCommunities &&
        !showIndividualChat &&
        !showSettings &&
        !showMenu && (
          <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
    </div>
  );
}

export default App;
