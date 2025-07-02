import React, { useState, useRef } from 'react';
import {
  Bell,
  MessageCircle,
  Plus,
  MapPin,
  MoreVertical,
  Pin,
  PlusCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const Home = ({ onNotificationClick, onChatClick }) => {
  const { isDarkMode } = useTheme();

  // Mock stories/categories
  const categories = [
    'Travel Videos',
    'Informative videos',
    'Third Category',
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Mock stories data
  const [stories, setStories] = useState([
    { id: 1, img: 'https://randomuser.me/api/portraits/men/1.jpg', name: 'Alex' },
    { id: 2, img: 'https://randomuser.me/api/portraits/women/2.jpg', name: 'Sam' },
    { id: 3, img: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'Chris' },
  ]);

  // State for story upload modal
  const [pendingStory, setPendingStory] = useState(null); // {url, isVideo, file}
  const [pendingStoryName, setPendingStoryName] = useState('');
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [storyZoom, setStoryZoom] = useState(1);

  // Add story handler (pick image/video)
  const fileInputRef = useRef();
  const handleAddStory = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const isVideo = file.type.startsWith('video/');
      setPendingStory({ url, isVideo, file });
      setPendingStoryName('');
      setShowStoryModal(true);
      setStoryZoom(1);
    }
  };

  const handleUploadStory = () => {
    if (pendingStory) {
      // For images, create a canvas to apply zoom/crop
      if (!pendingStory.isVideo) {
        const img = new window.Image();
        img.onload = () => {
          const size = 200; // thumbnail size
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          const zoom = storyZoom;
          const sw = img.width / zoom;
          const sh = img.height / zoom;
          const sx = (img.width - sw) / 2;
          const sy = (img.height - sh) / 2;
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
          const croppedUrl = canvas.toDataURL();
          setStories([
            ...stories,
            {
              id: stories.length + 1,
              img: croppedUrl,
              name: pendingStoryName || 'Photo Status',
              isVideo: false,
            },
          ]);
          setPendingStory(null);
          setPendingStoryName('');
          setShowStoryModal(false);
        };
        img.src = pendingStory.url;
      } else {
        // For video, just use the video as is (zoom not applied)
        setStories([
          ...stories,
          {
            id: stories.length + 1,
            img: pendingStory.url,
            name: pendingStoryName || 'Video Status',
            isVideo: true,
          },
        ]);
        setPendingStory(null);
        setPendingStoryName('');
        setShowStoryModal(false);
      }
    }
  };

  const handleCancelStory = () => {
    setPendingStory(null);
    setPendingStoryName('');
    setShowStoryModal(false);
  };

  // Posts (mocked, backend-friendly)
  const [posts, setPosts] = useState([
    {
      id: 1,
      location: 'Goa Beach',
      category: 'Travel Videos',
      image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageName: 'Goa Vibes',
      voatId: 'VOAT-001 / GOA',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      pinned: false,
      inList: false,
      linkedUp: false,
    },
    {
      id: 2,
      location: 'Paris',
      category: 'Informative videos',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageName: 'Paris Info',
      voatId: 'VOAT-002 / PARIS',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      pinned: false,
      inList: false,
      linkedUp: false,
    },
    {
      id: 3,
      location: 'Tokyo',
      category: 'Third Category',
      image: 'https://images.pexels.com/photos/2087013/pexels-photo-2087013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      pageName: 'Tokyo Explore',
      voatId: 'VOAT-003 / TOKYO',
      avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
      pinned: false,
      inList: false,
      linkedUp: false,
    },
  ]);

  // More menu state (dropdown per post)
  const [openMenuId, setOpenMenuId] = useState(null);

  // Handlers for post actions (backend-friendly)
  const handlePin = (id) => {
    setPosts(posts => posts.map(post => post.id === id ? { ...post, pinned: !post.pinned } : post));
  };
  const handleAddToList = (id) => {
    setPosts(posts => posts.map(post => post.id === id ? { ...post, inList: !post.inList } : post));
  };
  const handleLinkUp = (id) => {
    setPosts(posts => posts.map(post => post.id === id ? { ...post, linkedUp: !post.linkedUp } : post));
  };
  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  // Menu actions (placeholders for backend integration)
  const handleEdit = (id) => { alert('Edit post ' + id); setOpenMenuId(null); };
  const handleDelete = (id) => { alert('Delete post ' + id); setOpenMenuId(null); };
  const handleReport = (id) => { alert('Report post ' + id); setOpenMenuId(null); };
  const handleShare = (id) => { alert('Share post ' + id); setOpenMenuId(null); };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">SOCIAL APP</h1>
        <div className="flex items-center space-x-4">
          <button onClick={onNotificationClick} className="relative">
            <Bell size={24} className={isDarkMode ? 'text-white' : 'text-black'} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {/* Chat Button */}
          <button onClick={onChatClick}>
            <MessageCircle size={24} className={isDarkMode ? 'text-white' : 'text-black'} />
          </button>
        </div>
      </header>

      {/* Stories */}
      <section className="p-4">
        <div className="flex space-x-3 overflow-x-auto no-scrollbar mb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`border rounded-full px-4 py-1 text-sm whitespace-nowrap transition-colors ${
                isDarkMode
                  ? selectedCategory === cat
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                  : selectedCategory === cat
                    ? 'bg-orange-200 border-orange-400 text-black'
                    : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar">
          {/* Add Story */}
          <div className="flex-shrink-0 cursor-pointer" onClick={handleAddStory} title="Add Story">
            <div
              className={`w-24 h-24 flex items-center justify-center rounded-xl border-2 transition-all duration-200 shadow-lg
                ${isDarkMode
                  ? 'bg-black/60 border-blue-500'
                  : 'bg-white/70 border-blue-500'}
                hover:scale-105 active:scale-95 backdrop-blur-md
              `}
              style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 16px rgba(0,0,0,0.10)' }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Empty center for visual balance */}
                <Plus size={28} className="text-blue-500 absolute bottom-2 right-2 bg-white/80 rounded-full shadow p-1" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          {/* Render stories */}
          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0">
              <div className={`w-24 h-24 rounded-lg border-2 border-blue-500 flex flex-col items-center justify-center ${
                isDarkMode ? 'bg-gray-900' : 'bg-gray-300'
              }`}>
                <img src={story.img} alt={story.name} className="w-16 h-16 rounded-full object-cover mb-1" />
                <span className="text-xs text-center">{story.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Cards (Posts) */}
      <main className="p-4 space-y-8">
        {posts.map(post => (
          <div key={post.id} className={`rounded-2xl overflow-hidden transition-colors ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            {/* Card Header */}
            <div className="p-4 flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <MapPin size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
                <div>
                  <p className="font-bold">{post.location}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex flex-col items-center">
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      post.pinned
                        ? 'bg-green-500 hover:bg-green-600'
                        : isDarkMode
                          ? 'bg-gray-800 hover:bg-gray-700'
                          : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => handlePin(post.id)}
                    title={post.pinned ? 'Unpin from Map' : 'Pin to Map'}
                  >
                    <Pin size={20} className={isDarkMode || post.pinned ? 'text-white' : 'text-black'} />
                  </button>
                  <span className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.pinned ? 'Pinned' : 'Pin to Map'}</span>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      post.inList
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : isDarkMode
                          ? 'bg-gray-800 hover:bg-gray-700'
                          : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => handleAddToList(post.id)}
                    title={post.inList ? 'Remove from List' : 'Add to List'}
                  >
                    <PlusCircle size={20} className={isDarkMode || post.inList ? 'text-white' : 'text-black'} />
                  </button>
                  <span className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.inList ? 'Added' : 'Add To list'}</span>
                </div>
              </div>
            </div>

            {/* Card Image */}
            <div className="relative">
              <img
                src={post.image}
                alt={post.location}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2
                  className="text-5xl font-extrabold text-yellow-400 opacity-80"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                >
                  VOAT Network
                </h2>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 flex justify-between items-center relative">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-lg text-black overflow-hidden">
                  {post.avatar ? <img src={post.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" /> : 'P'}
                </div>
                <div>
                  <p className="font-bold">{post.pageName}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.voatId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 relative">
                <button
                  className={`border rounded-full px-6 py-2 text-sm font-semibold transition-colors focus:outline-none ${
                    post.linkedUp
                      ? 'bg-green-500 border-green-600 text-white hover:bg-green-600'
                      : isDarkMode
                        ? 'border-gray-600 hover:bg-gray-800'
                        : 'border-gray-400 hover:bg-gray-200'
                  }`}
                  onClick={() => handleLinkUp(post.id)}
                >
                  {post.linkedUp ? 'Linked' : 'Link Up'}
                </button>
                {/* More menu */}
                <div className="relative">
                  <button
                    onClick={() => handleMenuToggle(post.id)}
                    className="focus:outline-none"
                  >
                    <MoreVertical size={24} className={isDarkMode ? 'text-white' : 'text-black'} />
                  </button>
                  {openMenuId === post.id && (
                    <div
                      className={`absolute right-0 top-full mt-2 w-36 rounded-md shadow-lg z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      style={{ minWidth: '9rem' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <button onClick={() => handleEdit(post.id)} className={`block w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>Edit</button>
                      <button onClick={() => handleDelete(post.id)} className={`block w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>Delete</button>
                      <button onClick={() => handleReport(post.id)} className={`block w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>Report</button>
                      <button onClick={() => handleShare(post.id)} className={`block w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>Share</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Story Settings Modal */}
      {showStoryModal && pendingStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className={`rounded-2xl p-6 w-80 max-w-full shadow-lg ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}> 
            <h2 className="text-xl font-bold mb-4">New Status</h2>
            <div className="mb-4 flex flex-col items-center">
              {pendingStory.isVideo ? (
                <video src={pendingStory.url} controls className="w-40 h-40 rounded-lg object-cover mb-2" />
              ) : (
                <div className="relative w-40 h-40 mb-2 overflow-hidden rounded-lg bg-black flex items-center justify-center">
                  <img
                    src={pendingStory.url}
                    alt="preview"
                    className="object-cover"
                    style={{ width: `${160 * storyZoom}px`, height: `${160 * storyZoom}px`, maxWidth: 'none', maxHeight: 'none', transform: `translate(-50%,-50%) scale(${storyZoom})`, position: 'absolute', left: '50%', top: '50%' }}
                  />
                </div>
              )}
              {!pendingStory.isVideo && (
                <div className="w-full flex items-center gap-2 mt-2">
                  <span className="text-xs">Zoom</span>
                  <input
                    type="range"
                    min="1"
                    max="2.5"
                    step="0.01"
                    value={storyZoom}
                    onChange={e => setStoryZoom(Number(e.target.value))}
                    className="flex-1 accent-blue-500"
                  />
                  <span className="text-xs">{storyZoom.toFixed(2)}x</span>
                </div>
              )}
              <input
                type="text"
                className={`w-full mt-2 p-2 rounded border focus:outline-none ${isDarkMode ? 'bg-black text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
                placeholder="Status name (optional)"
                value={pendingStoryName}
                onChange={e => setPendingStoryName(e.target.value)}
              />
            </div>
            <div className="flex gap-4 mt-2">
              <button
                className="flex-1 py-2 rounded bg-blue-600 text-white font-semibold"
                onClick={handleUploadStory}
              >Upload</button>
              <button
                className={`flex-1 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}
                onClick={handleCancelStory}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;