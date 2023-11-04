import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="header-container sticky top-0 z-30 w-full p-5 bg-white sm:px-7 shadow-lg">
      <div className="flex items-center justify-between max-w-full">
        <Link href="/">
          <Image src="/logo.png" width={128} height={32} alt="Logo" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-2xl font-medium">Employee Leave Management System</h1>
        </div>
        <div className="flex items-center space-x-1">
          <ul className="hidden space-x-2 md:inline-flex">
            <li>
              <div class="relative mr-4">
                <Image className="mt-3" src="/notify.svg" width={24} height={24} alt="Logo" />
                <span class="-top-2 absolute bg-red-600 text-white text-xs  mr-2 px-1 py-0.5 rounded-full dark:bg-red-900">101</span>
              </div>
            </li>
            <li>
              <div class="relative">
                <Image className="rounded-full" src="/avatar.svg" width={48} height={48} alt="Logo" />
                <span class="-bottom-1 left-8 absolute w-3.5 h-3.5 bg-green-400  dark:border-gray-800 rounded-full"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
