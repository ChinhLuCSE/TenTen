"use client";

import Image from "next/image";
import Icon1 from "@/assets/icons/icon1.svg";
import Icon2 from "@/assets/icons/icon2.svg";
import Icon3 from "@/assets/icons/icon3.svg";
import Icon4 from "@/assets/icons/icon4.svg";
import Icon5 from "@/assets/icons/icon5.svg";
import UserImage from "@/assets/images/image_user.png";

import { usePathname } from 'next/navigation'


const Sidebar = () => {
  const pathname = usePathname() // todo: implement on selected navigation option
  const user = {
    name: "Vo Cong Thanh",
    role: "admin",
    id: "1234567890"
  }
  return (
    <div className="w-64">
      <aside
        id="default-sidebar"
        className="fixed w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 z-20 shadow-xl"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col items-center py-4">
            <Image
              className="rounded-full"
              src={UserImage}
              width={128}
              height={32}
              alt="avatar"
            ></Image>
            <span className="font-bold ">{user.name}</span>
            <span className="font-semibold text-gray-500">{user.id}</span>
          </div>
          <ul className="space-y-2 font-medium">
            {user.role=== "admin" && (
              <>
                <li>
                  <a
                    href="/user"
                    className="flex items-center p-2 text-gray-500 font-semibold rounded-lg hover:text-white hover:bg-blue-900 group"
                  >
                    <Image src={Icon1} alt="My SVG" width={24} height={24} className="svg-color"/>
                    <span className="ml-3">Personal Information</span>
                  </a>
                </li>
                <div className="flex items-center p-2 rounded-lg font-bold">
                  Admin
                </div>
                <li>
                  <a
                    href="/manage/employee"
                    className="flex items-center p-2 text-gray-500 font-semibold rounded-lg hover:text-white hover:bg-blue-900 group"
                  >
                    <Image src={Icon2} alt="My SVG" width={24} height={24} />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Employee Management
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/manage/leave"
                    className="flex items-center p-2 text-gray-500 font-semibold rounded-lg hover:text-white hover:bg-blue-900 group"
                  >
                    <Image src={Icon3} alt="My SVG" width={24} height={24} />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Leave Management
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-500 font-semibold rounded-lg hover:text-white hover:bg-blue-900 group"
                  >
                    <Image src={Icon4} alt="My SVG" width={24} height={24} />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Statistics
                    </span>
                  </a>
                </li>
              </>
            )}
            {user.role === "staff" && (
              <>
                <li>
                  <a
                    href="/user"
                    className="flex items-center p-2 text-gray-500 font-semibold rounded-lg hover:text-white hover:bg-blue-900 group"
                  >
                    <Image src={Icon1} alt="My SVG" width={24} height={24} />
                    <span className="ml-3">Personal Information</span>
                  </a>
                </li>
                <div className="flex items-center p-2 rounded-lg font-bold">
                  Employee
                </div>
                <li>
                  <a
                    href="/leave-registration"
                    className="flex items-center p-2 text-gray-500 font-semibold rounded-lg hover:text-white hover:bg-blue-900 group"
                  >
                    <Image src={Icon5} alt="My SVG" width={24} height={24} />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Leave Registration
                    </span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
