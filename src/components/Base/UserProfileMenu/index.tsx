import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import fakerData from "@/utils/faker";

function Main() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-data");

    // Navigate to login page
    navigate("/login");

    // Optional: Show logout confirmation
    console.log("User logged out successfully");
  };

  return (
    <Menu>
      <Menu.Button className="block w-8 h-8 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x">
        <img
          alt="Lawdesk Legal Management System"
          src={fakerData[9].photos[0]}
        />
      </Menu.Button>
      <Menu.Items className="w-56 mt-px text-white bg-primary">
        <Menu.Header className="font-normal">
          <div className="font-medium">{fakerData[0].users[0].name}</div>
          <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
            {fakerData[0].jobs[0]}
          </div>
        </Menu.Header>
        <Menu.Divider className="bg-white/[0.08]" />
        <Menu.Item
          as="button"
          onClick={() => handleNavigation("/profile-overview-3")}
          className="w-full"
        >
          <Lucide icon="User" className="w-4 h-4 mr-2" />
          Profile
        </Menu.Item>
        <Menu.Item
          as="button"
          onClick={() => handleNavigation("/users-layout-3")}
          className="w-full"
        >
          <Lucide icon="Building2" className="w-4 h-4 mr-2" />
          Departamentos
        </Menu.Item>
        <Menu.Item
          as="button"
          onClick={() => handleNavigation("/change-password")}
          className="w-full"
        >
          <Lucide icon="Lock" className="w-4 h-4 mr-2" />
          Reset Password
        </Menu.Item>
        <Menu.Item
          as="button"
          onClick={() => handleNavigation("/faq-layout-1")}
          className="w-full"
        >
          <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" />
          Help
        </Menu.Item>
        <Menu.Divider className="bg-white/[0.08]" />
        <Menu.Item as="button" onClick={handleLogout} className="w-full">
          <Lucide icon="LogOut" className="w-4 h-4 mr-2" />
          Logout
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default Main;
