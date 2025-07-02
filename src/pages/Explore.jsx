import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, Settings, Maximize2, Minimize2, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

// Backend-friendly: fetch best places and pins (mocked fetch, ready for API)
const fetchBestPlaces = async () => [
  { img: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg', watermark: true },
  { img: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg', watermark: true },
  { img: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg', watermark: true },
];
const fetchPins = async () => [
  { img: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg', name: 'Goa Beach', desc: 'A beautiful beach in Goa.' },
  { img: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg', name: 'Paris', desc: 'The city of lights.' },
  { img: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg', name: 'Tokyo', desc: 'A vibrant city in Japan.' },
];

const Watermark = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <span className="text-4xl font-extrabold text-yellow-300 opacity-60 select-none" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>VOAT Network</span>
  </div>
);

function MapSearchPan({ position, bounds }) {
  const map = useMap();
  React.useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { animate: true, padding: [20, 20] });
    } else if (position) {
      map.setView(position, 13, { animate: true });
    }
  }, [position, bounds, map]);
  return null;
}

const Explore = () => {
  const { isDarkMode } = useTheme();
  const [search, setSearch] = useState('');
  const [mapCenter, setMapCenter] = useState([17.4375, 78.4451]);
  const [mapBounds, setMapBounds] = useState(null);
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [mapHeight, setMapHeight] = useState(400);
  const [bestPlaces, setBestPlaces] = useState([]);
  const [pins, setPins] = useState([]);
  const [showAddPlace, setShowAddPlace] = useState(false);
  const [newPlace, setNewPlace] = useState({ name: '', desc: '', img: '' });
  const [addLoading, setAddLoading] = useState(false);
  const debounceRef = useRef();
  const mapContainerRef = useRef();

  // Fetch best places and pins on mount
  useEffect(() => {
    fetchBestPlaces().then(setBestPlaces);
    fetchPins().then(setPins);
  }, []);

  // Fetch suggestions as user types
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }
    setSuggestionLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&addressdetails=1&limit=5&countrycodes=in`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        setSuggestions([]);
      }
      setSuggestionLoading(false);
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  // Handle search submit (Enter or search icon)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&countrycodes=in`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        if (data[0].boundingbox) {
          const bounds = [
            [parseFloat(data[0].boundingbox[0]), parseFloat(data[0].boundingbox[2])],
            [parseFloat(data[0].boundingbox[1]), parseFloat(data[0].boundingbox[3])],
          ];
          setMapBounds(bounds);
        } else {
          setMapCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          setMapBounds(null);
        }
        setShowSuggestions(false);
      } else {
        alert('Location not found');
      }
    } catch (err) {
      alert('Error searching location');
    }
    setSearching(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (sugg) => {
    if (sugg.boundingbox) {
      const bounds = [
        [parseFloat(sugg.boundingbox[0]), parseFloat(sugg.boundingbox[2])],
        [parseFloat(sugg.boundingbox[1]), parseFloat(sugg.boundingbox[3])],
      ];
      setMapBounds(bounds);
    } else {
      setMapCenter([parseFloat(sugg.lat), parseFloat(sugg.lon)]);
      setMapBounds(null);
    }
    setSearch(sugg.display_name);
    setShowSuggestions(false);
  };

  // Handle full screen toggle
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setMapHeight(isFullScreen ? 400 : window.innerHeight);
  };

  // Handle drag start
  const handleDragStart = (e) => {
    // Don't start drag if clicking on buttons or interactive elements
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('form')) {
      return;
    }
    setIsDragging(true);
    setDragStartY(e.touches ? e.touches[0].clientY : e.clientY);
  };

  // Handle drag move
  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - dragStartY;
    
    if (isFullScreen && deltaY > 100) {
      // Dragging down from full screen - minimize
      setIsFullScreen(false);
      setMapHeight(400);
      setIsDragging(false);
    } else if (!isFullScreen && deltaY < -100) {
      // Dragging up from normal size - maximize
      setIsFullScreen(true);
      setMapHeight(window.innerHeight);
      setIsDragging(false);
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Helper to bold state name in suggestion
  function highlightState(displayName) {
    // Try to bold the state name if present
    const states = [
      'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh'
    ];
    for (const state of states) {
      if (displayName.includes(state)) {
        return displayName.replace(state, `<b>${state}</b>`);
      }
    }
    return displayName;
  }

  return (
    <div className={`min-h-screen w-full font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      {/* Map with overlays */}
      <div 
        ref={mapContainerRef}
        className={`relative w-full overflow-hidden transition-all duration-300 ease-out ${
          isFullScreen ? 'fixed inset-0 z-50' : 'rounded-b-3xl'
        } ${isDarkMode ? 'bg-black' : 'bg-white'}`}
        style={{ height: `${mapHeight}px` }}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} zoomControl={false} className="w-full h-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapSearchPan position={mapCenter} bounds={mapBounds} />
        </MapContainer>

        {/* Top bar: Heading + Search */}
        <div className="absolute left-4 top-4 flex flex-row items-center gap-4 z-20">
          <h1 className="text-4xl font-extrabold drop-shadow-lg transition-colors text-black" style={{letterSpacing: '-2px'}}>Explore</h1>
          <form
            onSubmit={handleSearch}
            className="w-40 sm:w-56 flex flex-col"
            autoComplete="off"
          >
            <div className="flex items-center bg-white rounded-full shadow px-2 py-1 relative">
              <button
                type="submit"
                className="mr-1 text-gray-500 hover:text-black focus:outline-none cursor-pointer"
                tabIndex={-1}
              >
                <Search size={18} />
              </button>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-black text-sm flex-1"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                disabled={searching}
              />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 top-10 w-full bg-white rounded-b-xl shadow-lg z-30 max-h-48 overflow-y-auto">
                {suggestions.map((sugg, idx) => (
                  <div
                    key={sugg.place_id}
                    className="px-3 py-2 text-sm text-black hover:bg-gray-200 cursor-pointer border-b last:border-b-0"
                    onClick={() => handleSuggestionClick(sugg)}
                    dangerouslySetInnerHTML={{ __html: highlightState(sugg.display_name) }}
                  />
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Settings and Full Screen buttons over map */}
        <div className="absolute right-4 top-4 flex flex-col items-center space-y-2 z-20">
          <button className={`p-2 rounded-full flex items-center justify-center transition-colors ${
            isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
          }`}>
            <Settings size={22} className={isDarkMode ? 'text-white' : 'text-black'} />
          </button>
          <button 
            onClick={toggleFullScreen}
            className={`p-2 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
            }`}
          >
            {isFullScreen ? (
              <Minimize2 size={22} className={isDarkMode ? 'text-white' : 'text-black'} />
            ) : (
              <Maximize2 size={22} className={isDarkMode ? 'text-white' : 'text-black'} />
            )}
          </button>
        </div>

        {/* Full Screen Drag Handle */}
        {/* {isFullScreen && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 pointer-events-auto ${
              isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
            }`}>
              <ChevronUp size={20} className={`${isDarkMode ? 'text-white' : 'text-black'} rotate-180`} />
            </div>
          </div>
        )} */}
      </div>

      {/* Content below map (hidden when full screen) */}
      {!isFullScreen && (
        <>
          {/* Best Places Near You Card */}
          <div className={`mx-2 mt-4 rounded-2xl shadow-lg p-3 transition-colors ${
            isDarkMode ? 'bg-[#2d2320]/90' : 'bg-gray-100'
          }`}>
            <h2 className={`text-2xl font-bold mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>Best Places Near You</h2>
            <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
              {bestPlaces.map((place, i) => (
                <div key={i} className="relative w-36 h-36 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={place.img} alt="place" className="object-cover w-full h-full" />
                  {place.watermark && <Watermark />}
                </div>
              ))}
            </div>
          </div>

          {/* Your Pin's to Explore Card */}
          <div className={`mx-2 mt-4 rounded-2xl shadow-lg p-3 transition-colors ${
            isDarkMode ? 'bg-[#2d2320]/90' : 'bg-gray-100'
          }`}>
            <h2 className={`text-2xl font-bold mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>Your Pin's to Explore</h2>
            <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
              {pins.map((pin, i) => (
                <div key={i} className="relative w-36 h-36 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={pin.img} alt="pin" className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}


      {/* Floating Add A Missing Place Button */}
      <button
        className={`
          fixed left-1/2 -translate-x-1/2 bottom-24 z-50
          font-medium rounded-full px-5 py-1.5 text-sm
          shadow-md border transition-all duration-200 ease-in-out
          backdrop-blur-sm
          ${
            isDarkMode
              ? 'bg-white text-black border-gray-300 hover:bg-gray-100'
              : 'bg-black text-white border-gray-600 hover:bg-gray-900'
          }
        `}
        onClick={() => setShowAddPlace(true)}
      >
        Add a Missing Place
      </button>

      {/* Add Place Modal (backend-friendly) */}
      {showAddPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className={`rounded-2xl p-6 w-80 max-w-full shadow-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}> 
            <h2 className="text-xl font-bold mb-4">Add a Missing Place</h2>
            <input
              type="text"
              placeholder="Place Name"
              className="w-full mb-2 p-2 rounded border"
              value={newPlace.name}
              onChange={e => setNewPlace({ ...newPlace, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full mb-2 p-2 rounded border"
              value={newPlace.desc}
              onChange={e => setNewPlace({ ...newPlace, desc: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full mb-2 p-2 rounded border"
              value={newPlace.img}
              onChange={e => setNewPlace({ ...newPlace, img: e.target.value })}
            />
            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 py-2 rounded bg-blue-600 text-white font-semibold"
                onClick={async () => {
                  setAddLoading(true);
                  // Simulate backend call
                  await new Promise(res => setTimeout(res, 800));
                  setPins(pins => [...pins, { ...newPlace }]);
                  setShowAddPlace(false);
                  setNewPlace({ name: '', desc: '', img: '' });
                  setAddLoading(false);
                }}
                disabled={addLoading || !newPlace.name || !newPlace.img}
              >{addLoading ? 'Adding...' : 'Add'}</button>
              <button className="flex-1 py-2 rounded bg-gray-300" onClick={() => setShowAddPlace(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}


      <div className="pb-24" />
    </div>
  );
};

export default Explore;