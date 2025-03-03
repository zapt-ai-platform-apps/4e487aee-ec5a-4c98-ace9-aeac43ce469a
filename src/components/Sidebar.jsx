import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiX, FiHome, FiSettings } from 'react-icons/fi';

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 w-64 bg-indigo-700 transform transition duration-200 ease-in-out z-30 md:translate-x-0 md:static md:inset-0`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-indigo-800">
            <div className="flex items-center">
              <img
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=32&height=32"
                alt="Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="font-semibold text-white">Funnel Analytics</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-white hover:text-indigo-200 focus:outline-none"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-white' : 'text-indigo-300 group-hover:text-white'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-indigo-800 text-xs text-indigo-200">
            <div className="mb-1">Marketing Funnel Analytics</div>
            <div>© {new Date().getFullYear()} ZAPT</div>
          </div>
        </div>
      </div>
    </>
  );
}