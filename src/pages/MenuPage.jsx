import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Compass,
  Shield,
  Settings,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const MenuPage = ({ onBack, onShowSettings, onShowExplore, onShowDairies, onShowAdminBoard }) => {
  const { isDarkMode } = useTheme();

  const themeClasses = {
    bg: isDarkMode ? "bg-black" : "bg-white",
    text: isDarkMode ? "text-white" : "text-gray-800",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    icon: isDarkMode ? "text-gray-400" : "text-gray-500",
  };

  const menuItems = [
    { icon: BookOpen, label: "Dairies", onClick: onShowDairies },
    { icon: Compass, label: "Explore list", onClick: onShowExplore },
    { icon: Shield, label: "AdminBoard", onClick: onShowAdminBoard },
    { icon: Settings, label: "Settings", onClick: onShowSettings },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col px-6 pt-4 transition-colors duration-300 ${themeClasses.bg}`}
    >
      <header className="flex justify-between items-center mb-12">
        <button onClick={onBack}>
          <ArrowLeft size={28} className={themeClasses.text} />
        </button>
        <img src="/menupic.png" alt="Logo" className="w-7 h-7" />
      </header>

      <nav className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            className={`flex items-center gap-5 p-4 rounded-lg transition-all duration-300 ${
              item.onClick
                ? "cursor-pointer hover:bg-gray-500/10"
                : "opacity-50 cursor-not-allowed"
            } border-b ${themeClasses.border}`}
          >
            <item.icon size={26} className={themeClasses.icon} />
            <span className={`font-bold text-xl ${themeClasses.text}`}>
              {item.label}
            </span>
        </div>
        ))}
      </nav>
    </div>
  );
};

export default MenuPage;
