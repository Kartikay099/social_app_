import React, { useState, useEffect } from "react";
import {
  MapPin,
  Globe,
  Share2,
  Link,
  Edit2,
  Verified,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import Timeline from "./Timeline";
import { useTheme } from '../context/ThemeContext';

const Profile = ({ onMenuClick }) => {
  const [activeTab, setActiveTab] = useState("posts");
  const { isDarkMode } = useTheme();
  // Backend-friendly: user data, posts, timeline, collection
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [collection, setCollection] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState({});

  useEffect(() => {
    // Simulate backend fetch
    setTimeout(() => {
      setProfile({
        name: 'Jane Doe',
        verified: true,
        headline: 'Travel Blogger',
        description: 'Exploring the world, one place at a time.',
        location: 'Hyderabad',
        streak: 12,
        links: {
          instagram: 'https://instagram.com',
          youtube: 'https://youtube.com',
          linkedin: 'https://linkedin.com',
          website: 'https://yourwebsite.com',
        },
        avatar: '/profilepic.png',
        chainLinks: 843000,
        followed: 1199,
      });
      setPosts(Array.from({ length: 9 }, (_, i) => ({ id: i + 1, img: `/public/${(i % 7) + 1}.svg` })));
      setCollection([]);
    }, 500);
  }, []);

  const colors = {
    background: isDarkMode ? '#181818' : '#fff',
    card: isDarkMode ? '#232323' : '#f7f7f7',
    text: isDarkMode ? '#f7f7f7' : '#181818',
    subtext: isDarkMode ? '#bbb' : '#555',
    border: isDarkMode ? '#444' : '#e5e5e5',
    tabActive: isDarkMode ? '#fff' : '#181818',
    tabInactive: isDarkMode ? '#bbb' : '#888',
    icon: isDarkMode ? '#bbb' : '#6b7280',
    socialBg: isDarkMode ? '#232323' : '#fff',
    socialIcon: isDarkMode ? '#fff' : '#000',
    cardGrid: isDarkMode ? '#232323' : '#e5e5e5',
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Edit Profile Modal */}
      {editMode && profile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className={`rounded-2xl p-6 w-80 max-w-full shadow-lg ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}> 
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              placeholder="Name"
              className={`w-full mb-2 p-2 rounded border ${isDarkMode ? 'bg-black text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
              value={editProfile.name || profile.name}
              onChange={e => setEditProfile({ ...editProfile, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Headline"
              className={`w-full mb-2 p-2 rounded border ${isDarkMode ? 'bg-black text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
              value={editProfile.headline || profile.headline}
              onChange={e => setEditProfile({ ...editProfile, headline: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className={`w-full mb-2 p-2 rounded border ${isDarkMode ? 'bg-black text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
              value={editProfile.description || profile.description}
              onChange={e => setEditProfile({ ...editProfile, description: e.target.value })}
            />
            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 py-2 rounded bg-blue-600 text-white font-semibold"
                onClick={() => {
                  setProfile({ ...profile, ...editProfile });
                  setEditMode(false);
                  setEditProfile({});
                }}
              >Save</button>
              <button className={`flex-1 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`} onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className={`pt-3 pb-2 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}` }>
        <div className="flex justify-end items-center px-4">
          <div className="flex items-center gap-4">
            <Share2 size={24} className={isDarkMode ? 'text-gray-400' : 'text-gray-700'} />
            <img
              src="/menupic.png"
              alt="Menu"
              className="w-7 h-7 cursor-pointer"
              onClick={onMenuClick}
            />
          </div>
        </div>
        <div className="flex justify-around mt-4">
          <button className={`w-1/2 pb-2 font-bold text-lg ${isDarkMode ? 'text-white border-b-2 border-white' : 'text-black border-b-2 border-black'}`}>
            My Space
          </button>
          <button className={`w-1/2 pb-2 font-semibold text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            My Network
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className={`p-5 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="flex items-start gap-5">
          <div>
            <img
              src={profile?.avatar || '/profilepic.png'}
              alt="Profile"
              className="w-[180px] h-[180px] object-cover border-4 rounded-md"
              style={{ borderColor: isDarkMode ? '#444' : '#e5e5e5' }}
            />
            <div className="flex gap-8 mt-3 justify-center">
              <div className="text-center">
                <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{profile?.chainLinks ? (profile.chainLinks/1000).toFixed(0) + 'K' : '0'}</p>
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Chain Links</p>
              </div>
              <div className="text-center">
                <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{profile?.followed || 0}</p>
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Followed</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className={`text-3xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {profile?.name || 'Name'} {profile?.verified && <Verified className="text-blue-500 text-2xl" />}
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <span className={`font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>login streak: {profile?.streak || 0}</span>
                <Edit2 size={16} className={`cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`} onClick={() => setEditMode(true)} />
              </div>
            </div>
            <p className={`text-lg font-medium mt-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>{profile?.headline || 'Headline / Title'}</p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{profile?.description || 'The description part comes here and a short description can be shared.'}</p>
            <Link size={20} className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`} />
            <div className="flex items-center gap-2 mt-4">
              <MapPin size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-700'} />
              <span className={`font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{profile?.location || 'Hyderabad'}</span>
            </div>

            {/* Social Media Icons (Lucide) */}
            <div className="flex gap-3 mt-3">
              <a href={profile?.links?.instagram || '#'} target="_blank" rel="noreferrer">
                <div className={`rounded-full p-2 shadow-md cursor-pointer ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  <Instagram size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
                </div>
              </a>
              <a href={profile?.links?.youtube || '#'} target="_blank" rel="noreferrer">
                <div className={`rounded-full p-2 shadow-md cursor-pointer ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  <Youtube size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
                </div>
              </a>
              <a href={profile?.links?.linkedin || '#'} target="_blank" rel="noreferrer">
                <div className={`rounded-full p-2 shadow-md cursor-pointer ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  <Linkedin size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
                </div>
              </a>
              <a href={profile?.links?.website || '#'} target="_blank" rel="noreferrer">
                <div className={`rounded-full p-2 shadow-md cursor-pointer ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  <Globe size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex justify-around font-semibold border-t ${isDarkMode ? 'border-gray-700 bg-black' : 'border-gray-200 bg-white'}`}>
        <button
          className={`py-3 w-full transition-colors duration-300 ${
            activeTab === "posts"
            ? (isDarkMode ? 'text-white border-b-2 border-white' : 'text-black border-b-2 border-black')
            : (isDarkMode ? 'text-gray-400' : 'text-gray-700')
          }`}
          onClick={() => setActiveTab("posts")}
        >
          My Space
        </button>
        <button
          className={`py-3 w-full transition-colors duration-300 ${
            activeTab === "timeline"
            ? (isDarkMode ? 'text-white border-b-2 border-white' : 'text-black border-b-2 border-black')
            : (isDarkMode ? 'text-gray-400' : 'text-gray-700')
          }`}
          onClick={() => setActiveTab("timeline")}
        >
          Timeline
        </button>
        <button
          className={`py-3 w-full transition-colors duration-300 ${
            activeTab === "collection"
            ? (isDarkMode ? 'text-white border-b-2 border-white' : 'text-black border-b-2 border-black')
            : (isDarkMode ? 'text-gray-400' : 'text-gray-700')
          }`}
          onClick={() => setActiveTab("collection")}
        >
          My Network
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-2" style={{ background: colors.background }}>
        {activeTab === "posts" && (
          <div className="grid grid-cols-3 gap-2">
            {posts.length === 0 ? (
              <div className="col-span-3 text-center py-10" style={{ color: colors.subtext }}>No posts yet.</div>
            ) : posts.map((post) => (
              <div key={post.id} className="h-36 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: colors.cardGrid }}>
                <img src={post.img} alt="post" className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        )}
        {activeTab === "timeline" && <Timeline />}
        {activeTab === "collection" && (
          <div className="py-10 text-center" style={{ color: colors.subtext }}>
            {collection.length === 0 ? <p>Collection is empty.</p> : collection.map((item, i) => <div key={i}>{item}</div>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
