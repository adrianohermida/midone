import { Menu } from "@/components/Base/Headless";
import { useNavigate } from "react-router-dom";
import Lucide from "@/components/Base/Lucide";
import fakerData from "@/utils/faker";
import authService from "@/services/auth";

interface UserProfileMenuProps {
  className?: string;
}

function UserProfileMenu({ className }: UserProfileMenuProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Use auth service to handle logout
    authService.logout();

    // Navigate to login page
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile-overview-1");
  };

  const handleAddAccount = () => {
    navigate("/register");
  };

  const handleResetPassword = () => {
    navigate("/change-password");
  };

  const handleHelp = () => {
    navigate("/faq-layout-1");
  };

  return (
    <Menu className={className}>
      <Menu.Button className="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x">
        <img alt="Lawdesk User Profile" src={fakerData[9].photos[0]} />
      </Menu.Button>
      <Menu.Items className="w-56 mt-px relative bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
        <Menu.Header className="font-normal">
          <div className="font-medium">{fakerData[0].users[0].name}</div>
          <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
            {fakerData[0].jobs[0]}
          </div>
        </Menu.Header>
        <Menu.Divider className="bg-white/[0.08]" />
        <Menu.Item
          className="hover:bg-white/5 cursor-pointer"
          onClick={handleProfile}
        >
          <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
        </Menu.Item>
        <Menu.Item
          className="hover:bg-white/5 cursor-pointer"
          onClick={handleAddAccount}
        >
          <Lucide icon="UserPlus" className="w-4 h-4 mr-2" /> Add Account
        </Menu.Item>
        <Menu.Item
          className="hover:bg-white/5 cursor-pointer"
          onClick={handleResetPassword}
        >
          <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Reset Password
        </Menu.Item>
        <Menu.Item
          className="hover:bg-white/5 cursor-pointer"
          onClick={handleHelp}
        >
          <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Help
        </Menu.Item>
        <Menu.Divider className="bg-white/[0.08]" />
        <Menu.Item
          className="hover:bg-white/5 cursor-pointer"
          onClick={handleLogout}
        >
          <Lucide icon="LogOut" className="w-4 h-4 mr-2" /> Logout
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default UserProfileMenu;
