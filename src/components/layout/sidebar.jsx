'use client'

import Image from "next/image";
import Icon1 from "@/assets/icons/icon1.svg"
import Icon2 from "@/assets/icons/icon2.svg"
import Icon3 from "@/assets/icons/icon3.svg"
import Icon4 from "@/assets/icons/icon4.svg"
import Icon5 from "@/assets/icons/icon5.svg"
import UserImage from "@/assets/images/image_user.png"

const Sidebar = () => {
    const role = 'admin'
  return  (
  <div>
      <aside
        id="default-sidebar"
        className="fixed w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 z-20 shadow-xl"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col items-center py-4">
            <Image className="rounded-full" src={UserImage} width={128} height={32} alt="avatar"></Image>
            <span className="font-bold ">Vo Cong Thanh</span>
            <span className="">1234567890</span>
          </div>
          <ul className="space-y-2 font-medium">
            {role === 'admin' && <><li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                <Image
                    src={Icon1}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span className="ml-3">Personal Information</span>
              </a>
            </li>
            <div className="flex items-center p-2 rounded-lg font-bold">
              Admin
            </div>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                 <Image
                    src={Icon2}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Employee Management
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                <Image
                    src={Icon3}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Leave Management
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                <Image
                    src={Icon4}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Statistics
                </span>
              </a>
            </li></>}
            {role === "staff" && <><li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                <Image
                    src={Icon1}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span className="ml-3">Personal Information</span>
              </a>
            </li>
            <div className="flex items-center p-2 rounded-lg font-bold">
              Employee
            </div>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                 <Image
                    src={Icon5}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Leave Registration
                </span>
              </a>
            </li></>}
          </ul>
        </div>
      </aside>
    </div>
    )
}

export default Sidebar;
