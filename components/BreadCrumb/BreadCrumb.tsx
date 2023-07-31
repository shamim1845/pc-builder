"use client";

import { usePathname } from "next/navigation";
// Hero Icons
import { HomeIcon } from "@heroicons/react/24/solid";
import React from "react";

const BreadCrumb = () => {
  const pathname = usePathname();
  console.log("BreadCrumb render");

  return (
    <div className="w-full h-full lg:py-5 lg:border-b custom_border flex items-center">
      <div className="w-full !h-full flex items-center gap-2 text-gray-500 ">
        <span>
          <HomeIcon className="w-4 h-4 fill-gray-600 dark:fill-gray-300" />
        </span>
        <span className={`${pathname === "/" && "invisible"}`}>/</span>
        <span className=" text-gray-900 dark:text-white">
          {pathname.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default BreadCrumb;

export const MemoizedBreadCrumb = React.memo(BreadCrumb);
