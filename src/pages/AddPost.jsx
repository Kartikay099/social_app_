import React, { useState, useRef } from 'react';
import { Plus, MapPin, Briefcase, Camera, ImagePlus, X, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const AddPost = () => {
  const { isDarkMode } = useTheme();
  const [selectedType, setSelectedType] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [location, setLocation] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [media, setMedia] = useState(null); // { url, file }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef();

  const postTypes = [
    {
      id: 'missing-place',
      title: 'Add A Missing Place',
      description: 'Help others discover new locations.',
      icon: MapPin,
      color: 'amber',
      bgColor: 'amber-700'
    },
    {
      id: 'work-support',
      title: 'Post a Work / Get Support',
      description: 'Share jobs or ask for help from your network.',
      icon: Briefcase,
      color: 'orange',
      bgColor: 'orange-600'
    },
    {
      id: 'custom',
      title: 'Create Custom Post',
      description: 'Share anything else with your community',
      icon: Plus,
      color: 'gray',
      bgColor: 'gray-600'
    }
  ];

  // Quick Actions handlers
  const handleQuickTakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.click();
    }
  };
  // Quick Action submit handlers
  const handleQuickAddStory = () => {
    setSelectedType(postTypes.find(t => t.id === 'custom'));
    setShowForm(true);
    setPostContent('Sharing a new story!');
    setTimeout(() => {
      document.getElementById('quick-send-btn')?.focus();
    }, 100);
  };
  const handleQuickAddJob = () => {
    setSelectedType(postTypes.find(t => t.id === 'work-support'));
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('quick-send-btn')?.focus();
    }, 100);
  };
  const handleQuickLocation = () => {
    setSelectedType(postTypes.find(t => t.id === 'missing-place'));
    setShowForm(true);
    setLocation('Current Location');
    setTimeout(() => {
      document.getElementById('quick-send-btn')?.focus();
    }, 100);
  };

  const quickActions = [
    { label: 'Take Photo', icon: Camera, color: 'green', action: handleQuickTakePhoto },
    { label: 'Add Story', icon: ImagePlus, color: 'purple', action: handleQuickAddStory },
    { label: 'Add Job', icon: Briefcase, color: 'blue', action: handleQuickAddJob },
    { label: 'Location', icon: MapPin, color: 'amber', action: handleQuickLocation }
  ];

  const handlePostTypeSelect = (type) => {
    setSelectedType(type);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!postContent.trim()) {
      setError('Post content is required.');
      return;
    }
    setLoading(true);
    // Simulate backend call
    try {
      // Replace this with your API call
      await new Promise((res) => setTimeout(res, 1200));
      // Example payload
      const payload = {
        type: selectedType?.id,
        content: postContent,
        location,
        media: media ? media.file : null,
      };
      // console.log('Submitting post:', payload);
      setSuccess('Post created successfully!');
      setPostContent('');
      setLocation('');
      setMedia(null);
      setShowForm(false);
      setSelectedType(null);
      // Optionally, show a toast or redirect
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Media upload handlers
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia({ url, file });
    }
  };
  const handleRemoveMedia = () => {
    setMedia(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleBack = () => {
    setShowForm(false);
    setSelectedType(null);
    setPostContent('');
    setLocation('');
  };

  if (showForm) {
    return (
      <div className={`min-h-screen p-4 transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleBack}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
            }`}
          >
            <X size={24} className={isDarkMode ? 'text-white' : 'text-black'} />
          </button>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Create Post</h1>
          <button
            id="quick-send-btn"
            type="submit"
            disabled={!postContent.trim() || loading}
            className={`p-2 rounded-full transition-colors ${
              postContent.trim() && !loading
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : isDarkMode 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label="Send Post"
          >
            <Send size={20} />
          </button>
        </div>

        {/* Post Type Indicator */}
        <div className={`rounded-xl p-4 mb-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-${selectedType?.bgColor} rounded-full flex items-center justify-center`}>
              {selectedType && <selectedType.icon size={20} className="text-white" />}
            </div>
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{selectedType?.title}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedType?.description}</p>
            </div>
          </div>
        </div>

        {/* Post Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          {success && <div className="text-green-500 text-sm mb-2">{success}</div>}
          <div>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className={`w-full p-4 rounded-xl border focus:outline-none focus:border-blue-500 resize-none ${
                isDarkMode 
                  ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-400'
                  : 'bg-gray-100 text-black border-gray-300 placeholder-gray-500'
              }`}
              rows={6}
            />
          </div>

          {selectedType?.id === 'missing-place' && (
            <div>
              <label className={`block font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location name"
                className={`w-full p-3 rounded-xl border focus:outline-none focus:border-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-400'
                    : 'bg-gray-100 text-black border-gray-300 placeholder-gray-500'
                }`}
              />
            </div>
          )}

          {/* Media Upload Preview */}
          <div className={`rounded-xl p-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <div className="flex items-center justify-center space-x-4">
              <button
                type="button"
                className={`p-3 rounded-full transition-colors ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => {
                  fileInputRef.current.accept = 'image/*,video/*';
                  fileInputRef.current.click();
                }}
                title="Upload Image/Video"
              >
                <Camera size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
              </button>
              <input
                type="file"
                accept="image/*,video/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleMediaChange}
              />
              <button type="button" className={`p-3 rounded-full transition-colors ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`} title="Add Story" onClick={handleQuickAddStory}>
                <ImagePlus size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
              </button>
              <button type="button" className={`p-3 rounded-full transition-colors ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`} title="Add Location" onClick={() => setLocation('Current Location')}>
                <MapPin size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
              </button>
            </div>
            {media && (
              <div className="mt-4 flex flex-col items-center">
                {media.url.match(/video/) ? (
                  <video src={media.url} controls className="max-h-48 rounded-xl mb-2" />
                ) : (
                  <img src={media.url} alt="preview" className="max-h-48 rounded-xl mb-2" />
                )}
                <button type="button" onClick={handleRemoveMedia} className="text-xs text-red-500 underline">Remove</button>
              </div>
            )}
            {loading && <div className="text-blue-500 text-xs mt-2">Posting...</div>}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 space-y-6 transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      {/* Header */}
      <div className="pt-4">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Create a Post</h1>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>What would you like to share today?</p>
      </div>

      {/* Action Cards */}
      <div className="space-y-4">
        {postTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handlePostTypeSelect(type)}
            className={`p-5 rounded-2xl transition-all duration-200 cursor-pointer border ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
                : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-${type.bgColor} rounded-full flex items-center justify-center shadow`}>
                <type.icon size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{type.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{type.description}</p>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}>
                <Plus size={16} className={isDarkMode ? 'text-white' : 'text-black'} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`p-4 rounded-2xl transition-colors border ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 bg-${action.color}-500 rounded-full flex items-center justify-center`}>
                  <action.icon size={24} className="text-white" />
                </div>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>{action.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
