import React, { useState } from 'react';
import { ArrowLeft, Shield, User, UserX, UserCheck, TrendingUp, Trash2, CheckCircle, Users, Globe, Settings as Cog, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const mockUsers = [
  { id: 1, name: 'Jane Doe', role: 'user', banned: false },
  { id: 2, name: 'Alex Johnson', role: 'admin', banned: false },
  { id: 3, name: 'Sarah Wilson', role: 'user', banned: true },
];
const mockReports = [
  { id: 1, user: 'Jane Doe', content: 'Inappropriate post', status: 'pending' },
  { id: 2, user: 'Alex Johnson', content: 'Spam', status: 'pending' },
];
const mockGroups = [
  { id: 1, name: 'Coffee Lovers', featured: false },
  { id: 2, name: 'Tech Enthusiasts', featured: true },
];
const mockAnalytics = {
  users: 1200,
  posts: 3400,
  groups: 12,
  activeToday: 87,
};

const AdminBoard = ({ onBack }) => {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState(mockUsers);
  const [reports, setReports] = useState(mockReports);
  const [groups, setGroups] = useState(mockGroups);
  const [siteSettings, setSiteSettings] = useState({ maintenance: false, registration: true });

  // User actions
  const banUser = (id) => setUsers(users.map(u => u.id === id ? { ...u, banned: !u.banned } : u));
  const promoteUser = (id) => setUsers(users.map(u => u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u));

  // Post actions
  const approveReport = (id) => setReports(reports.filter(r => r.id !== id));
  const deleteReport = (id) => setReports(reports.filter(r => r.id !== id));

  // Group actions
  const featureGroup = (id) => setGroups(groups.map(g => g.id === id ? { ...g, featured: !g.featured } : g));
  const removeGroup = (id) => setGroups(groups.filter(g => g.id !== id));

  // Site settings
  const toggleSetting = (key) => setSiteSettings(s => ({ ...s, [key]: !s[key] }));

  // Card style helpers
  const cardBg = isDarkMode ? 'bg-[#23272f]' : 'bg-white';
  const cardShadow = 'shadow-lg';
  const cardBorder = isDarkMode ? 'border border-gray-800' : 'border border-gray-200';
  const sectionTitle = 'font-bold text-lg mb-4 tracking-wide';

  return (
    <div className={`min-h-screen flex flex-col items-center px-4 py-8 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <div className="flex items-center w-full max-w-xl mb-8">
        <button onClick={onBack} className="mr-4 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <ArrowLeft className={isDarkMode ? 'text-white' : 'text-black'} />
        </button>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield size={28} /> Admin Board
        </h1>
      </div>
      <div className="w-full max-w-2xl space-y-10">
        {/* Analytics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4 flex flex-col items-center shadow-md">
            <User size={28} className="text-blue-500" />
            <div className="font-bold text-lg">{mockAnalytics.users}</div>
            <div className="text-xs text-gray-500">Users</div>
          </div>
          <div className="bg-green-100 dark:bg-green-900 rounded-xl p-4 flex flex-col items-center shadow-md">
            <TrendingUp size={28} className="text-green-500" />
            <div className="font-bold text-lg">{mockAnalytics.posts}</div>
            <div className="text-xs text-gray-500">Posts</div>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 rounded-xl p-4 flex flex-col items-center shadow-md">
            <Users size={28} className="text-purple-500" />
            <div className="font-bold text-lg">{mockAnalytics.groups}</div>
            <div className="text-xs text-gray-500">Groups</div>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 rounded-xl p-4 flex flex-col items-center shadow-md">
            <Globe size={28} className="text-yellow-500" />
            <div className="font-bold text-lg">{mockAnalytics.activeToday}</div>
            <div className="text-xs text-gray-500">Active Today</div>
          </div>
        </div>
        {/* User Management */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-xl p-6 transition-all`}> 
          <div className="flex items-center gap-2 mb-4">
            <User size={22} className="text-blue-500" />
            <span className={sectionTitle}>User Management</span>
          </div>
          <div className="space-y-4">
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between border-b last:border-b-0 py-3">
                <div className="flex items-center gap-3">
                  <User size={20} />
                  <span className="font-medium text-base">{u.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ml-2 ${u.role === 'admin' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>{u.role}</span>
                  {u.banned && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full ml-2">Banned</span>}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => banUser(u.id)} className={`p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition`} title={u.banned ? 'Unban' : 'Ban'}>
                    {u.banned ? <UserCheck className="text-green-500" size={20} /> : <UserX className="text-red-500" size={20} />}
                  </button>
                  <button onClick={() => promoteUser(u.id)} className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition" title={u.role === 'admin' ? 'Demote' : 'Promote to Admin'}>
                    <Shield className={u.role === 'admin' ? 'text-gray-400' : 'text-blue-500'} size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Post Moderation */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-xl p-6 transition-all`}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={22} className="text-yellow-500" />
            <span className={sectionTitle}>Reported Posts</span>
          </div>
          <div className="space-y-4">
            {reports.length === 0 && <div className="text-gray-400 text-sm">No reports pending.</div>}
            {reports.map(r => (
              <div key={r.id} className="flex items-center justify-between border-b last:border-b-0 py-3">
                <div>
                  <span className="font-medium text-base">{r.user}</span>: <span className="text-gray-500">{r.content}</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => approveReport(r.id)} className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition" title="Approve">
                    <CheckCircle className="text-green-500" size={20} />
                  </button>
                  <button onClick={() => deleteReport(r.id)} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition" title="Delete">
                    <Trash2 className="text-red-500" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Group/Community Management */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-xl p-6 transition-all`}>
          <div className="flex items-center gap-2 mb-4">
            <Globe size={22} className="text-purple-500" />
            <span className={sectionTitle}>Groups & Communities</span>
          </div>
          <div className="space-y-4">
            {groups.map(g => (
              <div key={g.id} className="flex items-center justify-between border-b last:border-b-0 py-3">
                <div className="flex items-center gap-3">
                  <Users size={20} />
                  <span className="font-medium text-base">{g.name}</span>
                  {g.featured && <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full ml-2">Featured</span>}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => featureGroup(g.id)} className="p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900 transition" title={g.featured ? 'Unfeature' : 'Feature'}>
                    <TrendingUp className={g.featured ? 'text-gray-400' : 'text-yellow-500'} size={20} />
                  </button>
                  <button onClick={() => removeGroup(g.id)} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition" title="Remove">
                    <Trash2 className="text-red-500" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Site Settings */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-xl p-6 transition-all`}>
          <div className="flex items-center gap-2 mb-4">
            <Cog size={22} className="text-gray-500" />
            <span className={sectionTitle}>Site Settings</span>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-base">Maintenance Mode</span>
              <button onClick={() => toggleSetting('maintenance')} className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${siteSettings.maintenance ? 'bg-pink-500' : 'bg-gray-400'}`}>
                <span className={`w-6 h-6 bg-white rounded-full transform transition-transform ${siteSettings.maintenance ? 'translate-x-7' : ''}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base">Registration Open</span>
              <button onClick={() => toggleSetting('registration')} className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${siteSettings.registration ? 'bg-green-500' : 'bg-gray-400'}`}>
                <span className={`w-6 h-6 bg-white rounded-full transform transition-transform ${siteSettings.registration ? 'translate-x-7' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBoard; 