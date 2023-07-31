"use client";

import Products from "@/components/newSystem/products/Products";
import SideBar from "@/components/newSystem/sidebar/Sidebar";
import { useState } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const NewPC = () => {
  const [queryString, setQueryString] = useState("cpu");
  const [hide, setHide] = useState(true);

  console.log("New system page render.");

  return (
    <div className=" flex">
      <div>
        {/* SideBar */}
        <div className={`h-screen fixed lg:relative left-0  z-10  `}>
          <SideBar
            queryString={queryString}
            setQueryString={(str: string) => setQueryString(str)}
            hide={hide}
            setHide={(bool: boolean) => setHide(bool)}
          />
          <div
            className={`absolute ${
              hide ? "left-0" : "right-0"
            } top-[40%] lg:hidden`}
          >
            {/* Arrow for show sideBar */}
            {hide && (
              <ArrowRightCircleIcon
                onClick={() => setHide(false)}
                className="w-6 h-6 cursor-pointer z-50"
              />
            )}
          </div>
        </div>

        {/* Shadow */}
        <div
          onClick={() => setHide(true)}
          className={`${
            !hide &&
            "w-screen lg:w-auto h-screen lg:h-auto absolute top-0 bottom-0 left-0 right-0 z-[1]   bg-[#00000059]"
          }`}
        ></div>
      </div>

      {/* Product List */}
      <div
        className={`h-full lg:h-[93vh] overflow-y-auto overflow-x-hidden flex-1 lg:border-l custom_border px-2`}
      >
        <Products category={queryString} />
      </div>
    </div>
  );
};

export default NewPC;
