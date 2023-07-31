"use client";

import SideNav from "@/components/sidebar/SideNav";
import { ReactNode, useEffect, useState } from "react";
import { MemoizedBreadCrumb } from "@/components/BreadCrumb/BreadCrumb";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { getNewPC } from "@/redux/features/pc/newPCSlice";

const PageLayout = ({ children }: { children: ReactNode }) => {
  const [hide, setHide] = useState(true);
  const dispatch = useDispatch();

  console.log("pageLayout render");

  // => Get selected component from localStorage and store it on redux store
  useEffect(() => {
    dispatch(getNewPC());
  }, []);

  return (
    <main className="flex">
      {/*Left side NavBar */}
      <div>
        <SideNav hide={hide} setHide={setHide} />
        {/* Shadow */}
        <div
          onClick={() => setHide(true)}
          className={`${
            !hide &&
            "w-screen lg:w-auto h-screen lg:h-auto absolute z-20  bg-[#00000059]"
          }`}
        ></div>
      </div>

      {/*Right side content */}
      <div className="flex-1 gap-2 lg:pl-5 ">
        {/* BreadCrumb */}
        <div className="fixed lg:relative  w-full  flex items-center gap-5 px-2 lg:px-0 py-2 lg:py-0  bg-teal-500 dark:bg-gray-900 lg:bg-transparent dark:lg:bg-transparent z-10">
          <div className={`lg:hidden `}>
            <Bars3Icon
              onClick={() => setHide(false)}
              className="w-6 h-6 fill-gray-900 dark:fill-gray-100 cursor-pointer"
            />
          </div>

          <MemoizedBreadCrumb />
        </div>
        {/* Main content */}
        <div className="pt-10 lg:p-0 h-screen">{children}</div>
      </div>
    </main>
  );
};

export default PageLayout;
