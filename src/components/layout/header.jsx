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
          <h1 className="text-2xl font-medium">Hệ thống quản lý nghỉ phép</h1>
        </div>
        <div className="flex items-center space-x-1">
          <ul className="hidden space-x-2 md:inline-flex">
            <li>
              <Link href="/" className="px-4 py-2 font-semibold text-gray-600 rounded">
                Noti
              </Link>
            </li>
            <li>
              <Link href="/about" className="px-4 py-2 font-semibold text-gray-600 rounded">
                Avatar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
