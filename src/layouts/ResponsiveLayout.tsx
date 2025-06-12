import React, { useState, useEffect } from "react";
import { useAppSelector } from "../stores/hooks";
import {
  Menu,
  X,
  Bell,
  Search,
  Settings,
  User,
  ChevronDown,
  Home,
  Users,
  Scale,
  DollarSign,
  MoreHorizontal,
  Smartphone,
  Tablet,
  Monitor,
  Laptop,
} from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import Button from "../components/Base/Button";
import { FormInput } from "../components/Base/Form";
import Tippy from "../components/Base/Tippy";

interface ResponsiveLayoutProps {
  children?: React.ReactNode;
}

type DeviceType = "mobile" | "tablet" | "desktop" | "ultrawide";

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const location = useLocation();

  // Estados responsivos
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Detectar tipo de dispositivo
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
        setIsSidebarOpen(false); // Fechar sidebar automaticamente em mobile
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else if (width < 1920) {
        setDeviceType("desktop");
      } else {
        setDeviceType("ultrawide");
      }
    };

    detectDevice();
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  // Menu items responsivos
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/",
      color: "text-blue-600",
    },
    {
      title: "CRM",
      icon: Users,
      path: "/crm",
      color: "text-green-600",
    },
    {
      title: "Jurídico",
      icon: Scale,
      path: "/juridico",
      color: "text-purple-600",
    },
    {
      title: "Financeiro",
      icon: DollarSign,
      path: "/financeiro",
      color: "text-yellow-600",
    },
  ];

  // Configurações responsivas
  const getResponsiveConfig = () => {
    switch (deviceType) {
      case "mobile":
        return {
          sidebarWidth: "w-full",
          contentPadding: "p-4",
          headerHeight: "h-14",
          showFullText: false,
          compactMode: true,
          gridCols: "grid-cols-1",
          spacing: "space-y-3",
        };
      case "tablet":
        return {
          sidebarWidth: "w-64",
          contentPadding: "p-6",
          headerHeight: "h-16",
          showFullText: true,
          compactMode: false,
          gridCols: "grid-cols-2",
          spacing: "space-y-4",
        };
      case "desktop":
        return {
          sidebarWidth: "w-64",
          contentPadding: "p-6 lg:p-8",
          headerHeight: "h-16",
          showFullText: true,
          compactMode: false,
          gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          spacing: "space-y-6",
        };
      case "ultrawide":
        return {
          sidebarWidth: "w-80",
          contentPadding: "p-8",
          headerHeight: "h-18",
          showFullText: true,
          compactMode: false,
          gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          spacing: "space-y-8",
        };
      default:
        return {
          sidebarWidth: "w-64",
          contentPadding: "p-6",
          headerHeight: "h-16",
          showFullText: true,
          compactMode: false,
          gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          spacing: "space-y-6",
        };
    }
  };

  const config = getResponsiveConfig();

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-darkmode-800">
        {/* Header Responsivo */}
        <header
          className={`${config.headerHeight} bg-white dark:bg-darkmode-600 border-b border-slate-200 dark:border-darkmode-400 sticky top-0 z-50`}
        >
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Menu Toggle - Mobile/Tablet */}
              {(deviceType === "mobile" || deviceType === "tablet") && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}

              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                {config.showFullText && (
                  <span className="text-xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block">
                    LawDesk
                  </span>
                )}
              </Link>

              {/* Device Type Indicator - Desktop/Ultrawide */}
              {(deviceType === "desktop" || deviceType === "ultrawide") && (
                <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-slate-100 dark:bg-darkmode-700 rounded-lg">
                  {deviceType === "mobile" && (
                    <Smartphone className="w-4 h-4 text-slate-500" />
                  )}
                  {deviceType === "tablet" && (
                    <Tablet className="w-4 h-4 text-slate-500" />
                  )}
                  {deviceType === "desktop" && (
                    <Laptop className="w-4 h-4 text-slate-500" />
                  )}
                  {deviceType === "ultrawide" && (
                    <Monitor className="w-4 h-4 text-slate-500" />
                  )}
                  <span className="text-xs text-slate-500 capitalize">
                    {deviceType}
                  </span>
                </div>
              )}
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <FormInput
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-darkmode-700 dark:border-darkmode-400 dark:placeholder-slate-500 dark:text-slate-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-slate-400 hover:text-slate-500" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {/* Search Toggle - Mobile */}
              {deviceType === "mobile" && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2"
                >
                  <Search className="w-4 h-4" />
                </Button>
              )}

              {/* Notifications */}
              <Button
                variant="outline-secondary"
                size="sm"
                className="relative p-2"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  3
                </span>
              </Button>

              {/* Settings */}
              <Button variant="outline-secondary" size="sm" className="p-2">
                <Settings className="w-4 h-4" />
              </Button>

              {/* User Menu */}
              <Button
                variant="outline-secondary"
                size="sm"
                className="flex items-center space-x-2 px-3 py-2"
              >
                <User className="w-4 h-4" />
                {config.showFullText && (
                  <>
                    <span className="hidden sm:block text-sm">Admin</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {deviceType === "mobile" && isSearchOpen && (
            <div className="border-t border-slate-200 dark:border-darkmode-400 p-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <FormInput
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>
          )}
        </header>

        <div className="flex h-screen">
          {/* Sidebar */}
          <aside
            className={`
            ${config.sidebarWidth} 
            ${isSidebarOpen || deviceType === "desktop" || deviceType === "ultrawide" ? "translate-x-0" : "-translate-x-full"}
            ${deviceType === "mobile" ? "fixed inset-y-0 left-0 z-40" : "relative"}
            bg-white dark:bg-darkmode-600 border-r border-slate-200 dark:border-darkmode-400
            transition-transform duration-300 ease-in-out
            flex flex-col
          `}
          >
            {/* Sidebar Header - Mobile */}
            {deviceType === "mobile" && (
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-darkmode-400">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    LawDesk
                  </span>
                </div>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.path ||
                  location.pathname.startsWith(item.path + "/");

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() =>
                      deviceType === "mobile" && setIsSidebarOpen(false)
                    }
                    className={`
                      flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? "bg-primary text-white shadow-lg"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkmode-700 hover:text-slate-900 dark:hover:text-slate-100"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-white" : item.color}`}
                    />
                    <span className="font-medium">{item.title}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-darkmode-400">
              <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                v1.0.0 • {deviceType}
              </div>
            </div>
          </aside>

          {/* Mobile Overlay */}
          {deviceType === "mobile" && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className={`min-h-full ${config.contentPadding}`}>
              {children || <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveLayout;
