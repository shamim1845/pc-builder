"use client";

import { usePathname } from "next/navigation";
// Hero Icons
import { HomeIcon } from "@heroicons/react/24/solid";

const BreadCrumb = () => {
  const pathname = usePathname();
  return (
    <div className="pb-5 border-b custom_border">
      <div className="flex gap-2 text-gray-500">
        <span>
          <HomeIcon className="w-6 h-6 fill-gray-500 dark:fill-gray-300" />
        </span>
        {pathname !== "/" && <span>/</span>}
        <span className="text-lg text-gray-900 dark:text-white">
          {pathname.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default BreadCrumb;
