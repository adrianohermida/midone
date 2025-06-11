import React from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <ThemeSwitcher />
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "green", marginBottom: "20px" }}>
          🎯 Layout Funcionando!
        </h2>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
