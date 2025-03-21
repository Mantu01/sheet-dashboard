import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Bell, Settings, HelpCircle, Menu } from 'lucide-react';
import { logout } from '@/store/userSlice';
import axios from 'axios';

const Header = ({ setShowCreateModal }) => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`)
     .then(() => {
        dispatch(logout());
        window.location.href = '/login';
      })
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user || !user.name) return "U";
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and brand section */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-blue-500 rounded flex items-center justify-center text-white font-bold">
                  TS
                </div>
              </div>
              <div className="hidden md:block ml-3">
                <div className="text-lg font-semibold text-gray-900">TableSync</div>
                <div className="text-xs text-gray-500">Data Management Platform</div>
              </div>
            </div>

            {/* Center section - can add search or navigation here */}
            <div className="hidden md:flex items-center space-x-1">
              <nav>
                <ul className="flex space-x-1">
                  <li>
                    <a href="" className="px-3 py-2 text-sm font-medium text-indigo-600 rounded-md bg-indigo-50">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="" className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100">
                      Tables
                    </a>
                  </li>
                  <li>
                    <a href="" className="px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:bg-gray-100">
                      Analytics
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right section - user profile, notifications, etc. */}
            <div className="flex items-center space-x-3">
              {/* Create Table Button - Desktop */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="hidden md:flex bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium items-center transition-colors duration-200 shadow-sm"
              >
                <Plus size={16} className="mr-2" />
                Create Table
              </button>

              {/* Notification icon */}
              <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>
                <Bell size={20} />
              </button>

              {/* Settings icon */}
              <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Settings</span>
                <Settings size={20} />
              </button>

              {/* Help icon */}
              <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Help</span>
                <HelpCircle size={20} />
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="user-menu-button"
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                      {getInitials()}
                    </div>
                  </button>
                </div>

                {/* Profile dropdown menu */}
                {profileMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email || 'user@example.com'}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Active Account
                        </span>
                      </div>
                    </div>
                    <a
                      href="#profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Open main menu</span>
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on mobile menu state */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#dashboard"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >
                Dashboard
              </a>
              <a
                href="#tables"
                className="block pl-3 pr-4 py-2 text-base font-medium text-indigo-600 bg-indigo-50"
              >
                Tables
              </a>
              <a
                href="#analytics"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >
                Analytics
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                    {getInitials()}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email || 'user@example.com'}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <a
                  href="#profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                >
                  Your Profile
                </a>
                <a
                  href="#settings"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                >
                  Settings
                </a>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center w-full px-4 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50"
                >
                  <Plus size={16} className="mr-2" />
                  Create Table
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;