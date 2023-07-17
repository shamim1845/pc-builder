"use client";
import { useState } from "react";
import ThemeSwitch from "./ThemeSwitch";

// Hero Icons
import {
  HomeIcon,
  ComputerDesktopIcon,
  BookmarkSquareIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Dashboard",
    icon: (
      <HomeIcon className="w-6 h-6 fill-gray-500 dark:fill-gray-300 group-hover:fill-teal-500" />
    ),
    link: "/",
  },
  {
    name: "New System",
    icon: (
      <ComputerDesktopIcon className="w-6 h-6 fill-gray-500 dark:fill-gray-300 group-hover:fill-teal-500" />
    ),
    link: "/new-system",
  },
  {
    name: "Saved Systems",
    icon: (
      <BookmarkSquareIcon className="w-6 h-6 fill-gray-500 dark:fill-gray-300 group-hover:fill-teal-500" />
    ),
    link: "/saved-systems",
  },
];

const SideNav = () => {
  const [hide, setHide] = useState(false);

  if (hide) {
    return (
      <div className="h-[100vh] pr-5 border-r custom_border">
        <div className="flex gap-2 justify-between py-6">
          <span className="text-lg font-bold  text-gray-900 dark:text-white">
            PC Craft
          </span>
          <span>
            <svg
              onClick={() => setHide(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </div>

        <NavLinks />
        <ThemeSwitch />
      </div>
    );
  }

  return (
    <div className="h-[100vh] min-w-[12rem] pr-5 border-r custom_border">
      <div className="flex justify-between  py-6">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          PC Craft
        </span>
        <span>
          <svg
            onClick={() => setHide(true)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </div>

      <NavLinks expand={true} />
      <ThemeSwitch />
    </div>
  );
};

export default SideNav;

const NavLinks = ({ expand }: { expand?: boolean }) => {
  const pathname = usePathname();

  return (
    <div className="">
      {navLinks.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={`flex gap-2 ${
            expand ? "justify-start" : "justify-center"
          } ${
            ((pathname === "/" &&
              item.name.toLocaleLowerCase() === "dashboard") ||
              pathname.slice(1) ===
                item.name.toLocaleLowerCase().split(" ").join("-")) &&
            "text-gray-900 dark:text-white"
          } items-center mb-3 hover:text-gray-900 dark:hover:text-white group`}
        >
          <span>{item.icon}</span>
          {expand && <span>{item.name}</span>}
        </Link>
      ))}
    </div>
  );
};
