'use client'

import Image from "next/image";
import Icon1 from "@/assets/icons/icon1.svg"
import Icon2 from "@/assets/icons/icon2.svg"
import Icon3 from "@/assets/icons/icon3.svg"
import Icon4 from "@/assets/icons/icon4.svg"
import Icon5 from "@/assets/icons/icon5.svg"

const Sidebar = () => {
    const role = 'admin'
  return  (
  <div>
      <aside
        id="default-sidebar"
        class="fixed w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 z-20 shadow-xl"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div class="flex flex-col items-center py-4">
            <Image class="" src="/userImg.png" width={128} height={32}></Image>
            <span class="font-bold ">Vo Cong Thanh</span>
            <span class="">1234567890</span>
          </div>
          <ul class="space-y-2 font-medium">
            {role === 'admin' && <><li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                <Image
                    src={Icon1}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span class="ml-3">Personal Information</span>
              </a>
            </li>
            <div class="flex items-center p-2 rounded-lg font-bold">
              Admin
            </div>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                 <Image
                    src={Icon2}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span class="flex-1 ml-3 whitespace-nowrap">
                  Employee Management
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                <Image
                    src={Icon3}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span class="flex-1 ml-3 whitespace-nowrap">
                  Leave Management
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                <Image
                    src={Icon4}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span class="flex-1 ml-3 whitespace-nowrap">
                  Statistics
                </span>
              </a>
            </li></>}
            {role === "staff" && <><li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                <Image
                    src={Icon1}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span class="ml-3">Personal Information</span>
              </a>
            </li>
            <div class="flex items-center p-2 rounded-lg font-bold">
              Employee
            </div>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group"
              >
                 <Image
                    src={Icon5}
                    alt="My SVG"
                    width={16}
                    height={16}
                />
                <span class="flex-1 ml-3 whitespace-nowrap">
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
