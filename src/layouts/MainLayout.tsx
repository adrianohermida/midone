import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../base-components/Button";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/src/assets/images/logo.svg"
                  alt="Midone"
                  className="w-8 h-8 mr-3"
                />
                <h1 className="text-xl font-bold text-primary">Midone React</h1>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">
                    Olá,{" "}
                    <span className="font-medium text-primary">
                      {userEmail}
                    </span>
                  </span>
                  <Link to="/dashboard">
                    <Button variant="secondary" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="primary" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="secondary" size="sm">
                      Home
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default MainLayout;
