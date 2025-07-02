import React from 'react';

const TabSwitcher = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex bg-white rounded-lg p-1 shadow-sm border border-amber-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-amber-800 text-white shadow-sm'
              : 'text-gray-600 hover:text-amber-800 hover:bg-amber-50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;