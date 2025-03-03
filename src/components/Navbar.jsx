import React from 'react';
import { FiMenu, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../modules/auth/AuthProvider';
import { Link } from 'react-router-dom';

export default function Navbar({ toggleSidebar }) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 h-16 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none md:hidden"
        >
          <FiMenu className="h-6 w-6" />
        </button>
        <div className="hidden md:flex ml-2 md:ml-0 items-center">
          <img
            src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=32&height=32"
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="font-semibold text-xl text-gray-900">Marketing Funnel Analytics</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/settings"
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
        >
          <FiSettings className="h-5 w-5" />
        </Link>
        
        <div className="flex items-center">
          <div className="hidden md:block mr-3">
            <div className="text-sm font-medium text-gray-900">{user?.email}</div>
          </div>
          <button
            onClick={handleSignOut}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          >
            <FiLogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}