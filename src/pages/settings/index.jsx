//import hooks
import { Outlet, useLocation } from "react-router-dom";

//importing icons
import { MdOutlineManageAccounts } from "react-icons/md";
import { LiaKeySolid } from "react-icons/lia";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { PiMoneyDuotone } from "react-icons/pi";

const Settings = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="w-[95%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="mt-4">
          <div className="w-16 h-1 bg-purple-400"></div>
          <h4 className="text-xl font-medium text-gray-600">Settings</h4>
        </div>
      </div>
      <div className="flex gap-4 justify-between">
        <aside className="px-4 py-6">
          <ul className="flex flex-col gap-8 mt-8 ">
            <li className="">
              <a
                href="/settings"
                className="font-medium text-gray-700 hover:text-black flex items-center gap-2 border-l-4 px-2 border-transparent"
                style={{
                  borderColor: path === "/settings" && "#21c55d",
                }}
              >
                <MdOutlineManageAccounts />
                <div className="hidden md:block">Account settings</div>
              </a>
            </li>
            <li>
              <a
                className="font-medium text-gray-700 hover:text-black flex items-center gap-2 border-l-4 px-2 border-transparent"
                style={{
                  borderColor: path === "/settings/security" && "#21c55d",
                }}
                href="/settings/security"
              >
                <LiaKeySolid />
                <div className="hidden md:block">Security</div>
              </a>
            </li>
            <li>
              <a
                className="font-medium text-gray-700 hover:text-black flex items-center gap-2 border-l-4 px-2 border-transparent"
                style={{
                  borderColor: path === "/settings/locations" && "#21c55d",
                }}
                href="/settings/locations"
              >
                <MdOutlineLocationOn />
                <div className="hidden md:block">Business Locations</div>
              </a>
            </li>
            <li>
              <a
                className="font-medium text-gray-700 hover:text-black flex items-center gap-2 border-l-4 px-2 border-transparent"
                style={{
                  borderColor: path === "/settings/roles" && "#21c55d",
                }}
                href="/settings/roles"
              >
                <RiShieldKeyholeLine />
                <div className="hidden md:block">Roles</div>
              </a>
            </li>
            <li>
              <a
                className="font-medium text-gray-700 hover:text-black flex items-center gap-2 border-l-4 px-2 border-transparent"
                style={{
                  borderColor: path === "/settings/users" && "#21c55d",
                }}
                href="/settings/users"
              >
                <FiUsers />
                <div className="hidden md:block">Users</div>
              </a>
            </li>
            <li>
              <a
                className="font-medium text-gray-700 hover:text-black flex items-center gap-2 border-l-4 px-2 border-transparent"
                style={{
                  borderColor: path === "/settings/billing" && "#21c55d",
                }}
                href="/settings/billing"
              >
                <PiMoneyDuotone />
                <div className="hidden md:block">Billing Infomation</div>
              </a>
            </li>
          </ul>
        </aside>
        <main className="mt-8 border bg-gray-100 rounded-lg py-6 px-4 flex-1 mb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Settings;
