import React from "react";
import { Outlet } from "react-router-dom";
import EnigmaSideMenu from "@/themes/Enigma/SideMenu";
import AdminHeader from "@/components/AdminHeader";

interface EnigmaLayoutProps {
  children?: React.ReactNode;
}

const EnigmaLayout: React.FC<EnigmaLayoutProps> = ({ children }) => {
  return (
    <div className="theme-enigma min-h-screen bg-slate-100">
      {/* Side Navigation */}
      <EnigmaSideMenu />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="p-6">{children || <Outlet />}</main>
      </div>
    </div>
  );
};

export default EnigmaLayout;
