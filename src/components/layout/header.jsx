import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="header-container sticky top-0 z-30 w-full p-5 bg-white sm:px-7 shadow-md">
      <div className="flex items-center justify-between max-w-7xl">
        <Link href="/">
          <Image src="/logo.png" width={128} height={32} alt="Logo" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
