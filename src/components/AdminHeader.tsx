import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { logout } from "@/stores/authSlice";
import { Menu } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import logoUrl from "@/assets/images/logo.svg";

const AdminHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-white border-b border-slate-200 dark:bg-darkmode-800 dark:border-darkmode-600">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src={logoUrl} alt="Lawdesk CRM" className="w-8 h-8 mr-3" />
          <h1 className="text-xl font-bold text-primary">Lawdesk CRM</h1>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-300">
              {user?.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user?.email}
            </p>
          </div>

          {/* User Menu Dropdown */}
          <Menu className="relative">
            <Menu.Button className="flex items-center p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-darkmode-700 rounded-lg">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-50 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg dark:bg-darkmode-800 dark:border-darkmode-600">
              <div className="p-4 border-b border-slate-200 dark:border-darkmode-600">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-300">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.email}
                </p>
                <div className="mt-1">
                  <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    {user?.role === "admin" ? "Administrador" : user?.role}
                  </span>
                </div>
              </div>
              <Menu.Item>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-darkmode-700"
                >
                  <Lucide icon="User" className="w-4 h-4 mr-3" />
                  Meu Perfil
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-darkmode-700"
                >
                  <Lucide icon="Settings" className="w-4 h-4 mr-3" />
                  Configurações
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-darkmode-700"
                >
                  <Lucide icon="HelpCircle" className="w-4 h-4 mr-3" />
                  Ajuda
                </a>
              </Menu.Item>
              <div className="border-t border-slate-200 dark:border-darkmode-600">
                <Menu.Item>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10"
                  >
                    <Lucide icon="LogOut" className="w-4 h-4 mr-3" />
                    Sair do Sistema
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
