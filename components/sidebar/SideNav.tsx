import ThemeSwitch from "./ThemeSwitch";

// Hero Icons
import {
  HomeIcon,
  ComputerDesktopIcon,
  BookmarkSquareIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Dashboard",
    icon: <HomeIcon className="w-6 h-6" />,
    link: "/",
  },
  {
    name: "New System",
    icon: <ComputerDesktopIcon className="w-6 h-6 " />,
    link: "/new-system",
  },
  {
    name: "Saved Systems",
    icon: <BookmarkSquareIcon className="w-6 h-6 " />,
    link: "/saved-systems",
  },
];

const SideNav = ({
  hide,
  setHide,
}: {
  hide: boolean;
  setHide: (val: boolean) => void;
}) => {
  console.log("sideNav render");

  return (
    <div
      className={`h-screen min-w-[11rem]  fixed lg:relative bg-gray-100 dark:bg-gray-700 lg:bg-transparent dark:lg:bg-transparent px-5 lg:border-r custom_border z-50 transition-all delay-75 ${
        hide ? "-left-[15rem] lg:left-0" : "left-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="logo"
          priority
          className="-ml-5"
        />

        <span>
          {hide ? (
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
          ) : (
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
          )}
        </span>
      </div>

      <NavLinks expand={hide ? false : true} />
      <ThemeSwitch />
    </div>
  );
};

export default SideNav;

const NavLinks = ({ expand }: { expand?: boolean }) => {
  const pathname = usePathname();

  const active = (pathname: string, item: string): boolean => {
    if (
      (pathname === "/" && item.toLocaleLowerCase() === "dashboard") ||
      pathname.slice(1) === item.toLocaleLowerCase().split(" ").join("-")
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="mt-10">
      {navLinks.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={`flex gap-2 ${
            expand ? "justify-start" : "justify-center"
          } ${
            active(pathname, item.name) &&
            "text-gray-700 dark:text-white font-[500]"
          } items-center mb-3 hover:text-gray-700 dark:hover:text-white group`}
        >
          <span
            className={`${
              active(pathname, item.name) && "text-teal-500"
            } group-hover:text-teal-500`}
          >
            {item.icon}
          </span>
          <span className={`${!expand && "lg:hidden "}`}>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};
