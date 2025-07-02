import React, { useRef } from 'react';
import { Plus } from 'lucide-react';

const ProfileScroller = () => {
  const scrollRef = useRef(null);

  const handleMouseDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    el.style.cursor = 'grabbing';
    const startX = e.pageX;
    const scrollLeft = el.scrollLeft;

    const onMouseMove = (e) => {
      const walk = e.pageX - startX;
      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      el.style.cursor = 'grab';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      className="flex items-center space-x-3 overflow-x-auto mb-6 relative select-none cursor-grab"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>

      {/* + Button First */}
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 rounded-full bg-[#d9cbb1]"></div>
        <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shadow-md">
          <Plus size={16} />
        </button>
      </div>

      {/* Other Profiles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-14 h-14 rounded-full bg-[#d9cbb1] flex-shrink-0"></div>
      ))}
    </div>
  );
};

export default ProfileScroller;
