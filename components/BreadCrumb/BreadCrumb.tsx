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
      <div className="w-full !h-full flex items-center gap-2 lg:!text-gray-500  lg:dark:!text-gray-400">
        <span>
          <HomeIcon className="w-4 h-4 fill-gray-600 dark:fill-gray-300" />
        </span>
        <span className="">/</span>
        <span className="">{pathname.slice(1)}</span>
      </div>
    </div>
  );
};

export default BreadCrumb;

export const MemoizedBreadCrumb = React.memo(BreadCrumb);
