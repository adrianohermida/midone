import { Fragment } from "react";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import fakerData from "@/utils/faker";

function Main() {
  return (
    <Menu>
      <Menu.Button className="block w-8 h-8 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x">
        <img
          alt="Midone Tailwind HTML Admin Template"
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
        <Menu.Item>
          <Lucide icon="User" className="w-4 h-4 mr-2" />
          Profile
        </Menu.Item>
        <Menu.Item>
          <Lucide icon="FilePenLine" className="w-4 h-4 mr-2" />
          Add Account
        </Menu.Item>
        <Menu.Item>
          <Lucide icon="Lock" className="w-4 h-4 mr-2" />
          Reset Password
        </Menu.Item>
        <Menu.Item>
          <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" />
          Help
        </Menu.Item>
        <Menu.Divider className="bg-white/[0.08]" />
        <Menu.Item>
          <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" />
          Logout
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default Main;
