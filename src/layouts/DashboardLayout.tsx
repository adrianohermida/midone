import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../utils/helpers";
import AdminHeader from "../components/AdminHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("enigma"); // enigma, icewall, rubick, tinker

  const menuItems = [
    {
      title: "Dashboard",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
        </svg>
      ),
      path: "/dashboard",
      isActive: location.pathname === "/dashboard",
    },
    {
      title: "Overview 1",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      path: "/overview-1",
      isActive: location.pathname === "/overview-1",
    },
    {
      title: "Overview 2",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      path: "/overview-2",
      isActive: location.pathname === "/overview-2",
    },
    {
      title: "Overview 3",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
        </svg>
      ),
      path: "/overview-3",
      isActive: location.pathname === "/overview-3",
    },
    {
      title: "Overview 4",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      ),
      path: "/overview-4",
      isActive: location.pathname === "/overview-4",
    },
    {
      title: "E-Commerce",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      path: "/e-commerce",
      isActive: location.pathname === "/e-commerce",
    },
    {
      title: "Inbox",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      ),
      path: "/inbox",
      isActive: location.pathname === "/inbox",
    },
    {
      title: "File Manager",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
        </svg>
      ),
      path: "/file-manager",
      isActive: location.pathname === "/file-manager",
    },
    {
      title: "Point of Sale",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      path: "/point-of-sale",
      isActive: location.pathname === "/point-of-sale",
    },
    {
      title: "Chat",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      path: "/chat",
      isActive: location.pathname === "/chat",
    },
    {
      title: "Post",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
      path: "/post",
      isActive: location.pathname === "/post",
    },
    {
      title: "Calendar",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      path: "/calendar",
      isActive: location.pathname === "/calendar",
    },
    {
      title: "Crud",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      path: "/crud",
      isActive: location.pathname === "/crud",
    },
    {
      title: "Users",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      path: "/users",
      isActive: location.pathname === "/users",
    },
    {
      title: "Profile",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      path: "/profile",
      isActive: location.pathname === "/profile",
    },
  ];

  return (
    <div
      className={`theme-${theme} ${theme === "enigma" ? "text-slate-600" : ""} min-h-screen bg-slate-100 before:content-[''] before:w-full before:h-screen before:fixed before:inset-0 before:bg-gradient-to-r before:from-theme-1 before:to-theme-2 before:z-[-1]`}
    >
      {/* Sidebar */}
      <nav className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-theme-1 to-theme-2 overflow-y-auto transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center py-6 px-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white/20 rounded-lg mr-3 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-white text-lg font-medium">Enigma</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-3 pb-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={classNames(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-full transition-all duration-200",
                      item.isActive
                        ? "bg-white/10 text-white before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-2 before:border-white/20"
                        : "text-white/70 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <span className="mr-3 opacity-70">{item.icon}</span>
                    {item.title}
                    {item.isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="ml-64">
        {/* Admin Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Template Configurator Panel */}
      <div
        className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl transform translate-x-full transition-transform duration-300 z-50"
        id="template-configurator"
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Templates</h3>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => {
                const panel = document.getElementById("template-configurator");
                panel?.classList.toggle("translate-x-full");
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">Choose your templates</p>
        </div>

        {/* Theme Options */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {["rubick", "icewall", "tinker", "enigma"].map((themeName) => (
              <button
                key={themeName}
                onClick={() => setTheme(themeName)}
                className={classNames(
                  "relative overflow-hidden rounded-lg border-2 transition-all",
                  theme === themeName ? "border-blue-500" : "border-gray-200",
                )}
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                  <div className="h-full bg-white/20 rounded"></div>
                </div>
                <div className="p-2 text-center">
                  <span className="text-xs font-medium capitalize">
                    {themeName}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Layouts */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Layouts</h4>
            <p className="text-sm text-gray-500 mb-3">Choose your layout</p>
            <div className="grid grid-cols-3 gap-3">
              {["Side Menu", "Simple Menu", "Top Menu"].map((layout) => (
                <button
                  key={layout}
                  className="p-3 border border-gray-200 rounded-lg text-center hover:border-blue-500 transition-colors"
                >
                  <div className="w-full h-8 bg-gray-100 rounded mb-2"></div>
                  <span className="text-xs">{layout}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Schemes */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Color Schemes</h4>
            <p className="text-sm text-gray-500 mb-3">
              Choose your color schemes
            </p>
            <div className="flex space-x-3">
              {[
                ["bg-blue-500", "bg-blue-600"],
                ["bg-green-500", "bg-green-600"],
                ["bg-purple-500", "bg-purple-600"],
                ["bg-cyan-500", "bg-cyan-600"],
                ["bg-gray-700", "bg-gray-800"],
              ].map((colors, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-full flex overflow-hidden border-2 border-gray-200 hover:border-gray-300"
                >
                  <div className={`w-1/2 ${colors[0]}`}></div>
                  <div className={`w-1/2 ${colors[1]}`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Appearance</h4>
            <p className="text-sm text-gray-500 mb-3">Choose your appearance</p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="appearance"
                  className="text-blue-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm">Light</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="appearance"
                  className="text-blue-500"
                />
                <span className="ml-2 text-sm">Dark</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Toggle Button */}
      <button
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-l-lg shadow-lg hover:bg-blue-600 transition-colors z-40"
        onClick={() => {
          const panel = document.getElementById("template-configurator");
          panel?.classList.toggle("translate-x-full");
        }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default DashboardLayout;
