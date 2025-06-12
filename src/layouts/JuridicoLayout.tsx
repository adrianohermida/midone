import React, { useState } from "react";
import { useAppSelector } from "../stores/hooks";
import { useLocation, Link } from "react-router-dom";
import {
  Scale,
  Search,
  Bell,
  Settings,
  User,
  Moon,
  Sun,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import Button from "../components/Base/Button";

interface JuridicoLayoutProps {
  children: React.ReactNode;
}

const JuridicoLayout: React.FC<JuridicoLayoutProps> = ({ children }) => {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Top Navigation Bar */}
        <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left side */}
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                >
                  {sidebarOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <MenuIcon className="h-6 w-6" />
                  )}
                </button>

                {/* Logo */}
                <Link to="/" className="flex items-center px-4">
                  <Scale className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                    Lawdesk
                  </span>
                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Jurídico
                  </span>
                </Link>
              </div>

              {/* Search */}
              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white"
                      placeholder="Buscar processos..."
                      type="search"
                    />
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 rounded-md relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
                </button>

                {/* Settings */}
                <button className="p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 rounded-md">
                  <Settings className="h-6 w-6" />
                </button>

                {/* Dark mode toggle */}
                <button className="p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 rounded-md">
                  {darkMode ? (
                    <Sun className="h-6 w-6" />
                  ) : (
                    <Moon className="h-6 w-6" />
                  )}
                </button>

                {/* Profile */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User avatar"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Dr. João Silva
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Advogado
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JuridicoLayout;
