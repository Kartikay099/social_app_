import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import AutoScroller from '../components/AutoScroller';
import { ArrowRight } from 'lucide-react';

const Timeline = () => {
  const { isDarkMode } = useTheme();
  const [modalImage, setModalImage] = useState(null);

  const themeClasses = {
    bg: isDarkMode ? 'bg-black' : 'bg-gray-50',
    cardBg: isDarkMode ? 'bg-gray-900' : 'bg-white',
    text: isDarkMode ? 'text-gray-200' : 'text-gray-800',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    border: isDarkMode ? 'border-gray-800' : 'border-gray-200',
  };

  const posts = [
    {
      date: '20th June, 2025',
      location: 'Hyderabad',
      images: [
        '/profilepic.png',
        '/vite.svg',
        '/5.svg',
        '/profilepic.png',
        '/vite.svg',
        '/5.svg',
      ],
    },
    {
      date: '19th June, 2025',
      location: 'Hyderabad',
      images: [
        '/vite.svg',
        '/profilepic.png',
        '/5.svg',
        '/vite.svg',
        '/profilepic.png',
      ],
    },
  ];

  const categories = [
    { image: '/profilepic.png', label: 'Friends' },
    { image: '/vite.svg', label: 'Work' },
    { image: '/5.svg', label: 'Travel' },
    { image: '/profilepic.png', label: 'Family' },
    { image: '/vite.svg', label: 'Hobbies' },
  ];

  return (
    <div className={`py-4 ${themeClasses.bg} ${themeClasses.text}`}>
      {/* Category Strip */}
      <AutoScroller className="gap-4 px-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-green-400 to-blue-500">
              <img
                src={cat.image}
                alt={cat.label}
                className={`w-full h-full object-cover rounded-full border-2 ${
                  isDarkMode ? 'border-black' : 'border-white'
                }`}
              />
            </div>
            <p className="text-xs font-semibold">{cat.label}</p>
          </div>
        ))}
      </AutoScroller>

      {/* Timeline Posts */}
      <div className="px-4 mt-6 space-y-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl shadow-sm ${themeClasses.cardBg}`}
          >
            <p className={`text-sm font-bold mb-3`}>
              {post.date} •{" "}
              <span className={themeClasses.textMuted}>{post.location}</span>
            </p>

            <AutoScroller className="gap-3">
              {post.images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group"
                  onClick={() => setModalImage(img)}
                >
                  <img
                    src={img}
                    alt="timeline"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
              <div className="flex-shrink-0 w-24 h-32 flex items-center justify-center">
                <button
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  <ArrowRight size={24} className={themeClasses.textMuted} />
              </button>
            </div>
            </AutoScroller>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
              onClick={() => setModalImage(null)}
            >
            <img
              src={modalImage}
              alt="modal-img"
            className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
        </div>
      )}
    </div>
  );
};

export default Timeline;
