// app/components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { name: 'Automated Emergency Response', icon: '⚡️' },
    { name: 'Smart Technician Scheduling', icon: '📅' },
    { name: 'Quote & Invoice Follow-Up', icon: '💸' },
    { name: 'Google Review Booster', icon: '⭐' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Nexus AI</h2>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <div
                onClick={() => onTabChange(item.name.toLowerCase())}
                className={`flex items-center p-2 rounded cursor-pointer ${
                  activeTab === item.name.toLowerCase() ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;