"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  home,
  homeBlue,
  navSession,
  navBookmark,
  navProfile,
  HomeWhite,
  logo,
} from "../../app/assets/index";
import { selectIsAuthenticated } from "../../store/authSlice";

const FooterNav = () => {
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const getActiveStyles = (path) => {
    return {
      isActive: pathname === path,
      textColor: pathname === path ? "text-[#5BF5FF]" : "text-white",
    };
  };

  const handleLogoClick = (event) => {
    event.stopPropagation(); // Prevents the click from affecting the parent div
    window.location.href = "https://eventhex.ai/";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#000000CC] border-gray-800">
      {/* Main Navigation */}
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center px-2 py-3 sm:py-4">
          <Link href="/">
            <button className="flex flex-col items-center min-w-[64px] sm:min-w-[80px]">
              <div
                className={`rounded-full p-2 ${
                  getActiveStyles("/").background
                }`}
              >
                <Image
                  src={HomeWhite}
                  className="w-[15px] h-[15px] sm:w-6 sm:h-6"
                  alt="Sessions"
                  width={24}
                  height={24}
                />
              </div>
              <span
                className={`${
                  getActiveStyles("/").textColor
                } text-[10px] sm:text-sm mt-1 font-inter font-medium`}
              >
                Home
              </span>
            </button>
          </Link>

          {/* Sessions */}
          <Link href="/session">
            <button className="flex flex-col items-center min-w-[64px] sm:min-w-[80px]">
              <div
                className={`rounded-full p-2 ${
                  getActiveStyles("/session").background
                }`}
              >
                <Image
                  src={navSession}
                  className="w-[15px] h-[15px] sm:w-6 sm:h-6"
                  alt="Sessions"
                  width={24}
                  height={24}
                />
              </div>
              <span
                className={`${
                  getActiveStyles("/session").textColor
                } text-[10px] sm:text-sm mt-1 font-inter font-medium`}
              >
                Sessions
              </span>
            </button>
          </Link>

          {/* Book Mark - Only show when authenticated */}
          {isAuthenticated && (
            <Link href="/bookmark">
              <button className="flex flex-col items-center min-w-[64px] sm:min-w-[80px]">
                <div
                  className={`rounded-full p-2 ${
                    getActiveStyles("/bookmark").background
                  }`}
                >
                  <Image
                    src={navBookmark}
                    className="w-[15px] h-[15px] sm:w-6 sm:h-6"
                    alt="Bookmark"
                    width={24}
                    height={24}
                  />
                </div>
                <span
                  className={`${
                    getActiveStyles("/bookmark").textColor
                  } text-[10px] sm:text-sm mt-1 font-inter font-medium`}
                >
                  Book Mark
                </span>
              </button>
            </Link>
          )}

          {/* Profile - Only show when authenticated */}
          {isAuthenticated && (
            <Link href="/profile">
              <button className="flex flex-col items-center min-w-[64px] sm:min-w-[80px]">
                <div
                  className={`rounded-full p-2 ${
                    getActiveStyles("/profile").background
                  }`}
                >
                  <Image
                    src={navProfile}
                    className="w-[15px] h-[15px] sm:w-6 sm:h-6"
                    alt="Profile"
                    width={24}
                    height={24}
                  />
                </div>
                <span
                  className={`${
                    getActiveStyles("/profile").textColor
                  } text-[10px] sm:text-sm mt-1 font-inter font-medium`}
                >
                  Profile
                </span>
              </button>
            </Link>
          )}
        </div>

        {/* Powered By Section */}
        <div className="flex justify-center items-center py-2 sm:py-3 border-t border-gray-800">
          <span
            className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] text-[#CDD0D5] font-inter cursor-pointer"
            onClick={handleLogoClick}
          >
            Powered By
          </span>
          <div
            className="flex items-center ml-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="w-[79.44px] h-[16.4px] sm:w-7 sm:h-7 rounded-md flex items-center justify-center">
              <Image 
                src={logo} 
                alt="Logo" 
                className="w-full"
                width={79.44}
                height={16.4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
