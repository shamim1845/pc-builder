"use client";

import { setSideBar } from "@/redux/features/sidebar/sideBarSlice";
// Hero Icons
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SideBar = ({
  queryString,
  setQueryString,
  hide,
  setHide,
}: {
  queryString: string;
  setQueryString: (str: string) => void;
  hide: boolean;
  setHide: (bool: boolean) => void;
}) => {
  const { data: sideBar } = useSelector((state: RootState) => state.sideBar);
  const { data: newPC } = useSelector((state: RootState) => state.newPC);

  const dispatch = useDispatch();

  // => Update sideBar(selected status) When new component added or removed
  useEffect(() => {
    dispatch(setSideBar());
  }, [newPC]);

  console.log(`sidebar render newPC: ${newPC} sideBar: ${sideBar}`);

  return (
    <div
      className={` h-full  bg-gray-100 dark:bg-gray-700 px-5 lg:pl-0  fixed lg:relative  transition-all delay-75 ${
        hide ? "-left-[15rem] lg:left-0" : "left-0"
      }`}
    >
      {/* Core Components */}
      <div>
        <div className=" py-2">
          <h4 className="bg-teal-500  text-white px-2">Core Components</h4>
        </div>
        {sideBar
          ?.filter((comp) => comp.coreComponents)
          ?.map((component) => (
            <Component
              key={component.id}
              queryString={queryString}
              setQueryString={(str: string) => setQueryString(str)}
              setHide={(bool: boolean) => setHide(bool)}
              component={component}
            />
          ))}
      </div>

      {/* Peripherals & Others */}
      <div className="pt-2">
        <div className=" py-2">
          <h4 className="bg-teal-500  text-white px-2">Peripherals & Others</h4>
        </div>
        {sideBar
          ?.filter((comp) => !comp.coreComponents)
          ?.map((component) => (
            <Component
              key={component.id}
              queryString={queryString}
              setQueryString={(str: string) => setQueryString(str)}
              setHide={(bool: boolean) => setHide(bool)}
              component={component}
            />
          ))}
      </div>
    </div>
  );
};

const Component = ({
  queryString,
  setQueryString,
  setHide,
  component,
}: {
  queryString: string;
  setQueryString: (str: string) => void;
  setHide: (bool: boolean) => void;
  component: SideBar;
}) => {
  const category = component.name.toLocaleLowerCase().split(" ").join("-");

  const handleClick = () => {
    setQueryString(category);
    setHide(true);
  };

  console.log("Sidebar component render");

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-2 mb-2 cursor-pointer hover:text-gray-900 dark:hover:text-white  ${
        queryString === category && "text-gray-900 dark:text-white font-[500]"
      }`}
    >
      <span>
        {component.selected ? (
          <CheckCircleIcon className={`stroke-teal-500 w-5 h-5`} />
        ) : (
          <PlusCircleIcon
            className={`${
              queryString === category && "stroke-teal-500"
            } w-5 h-5`}
          />
        )}
      </span>
      <span>{component.name}</span>
      {component.required && <span className="text-red-600">*</span>}
    </div>
  );
};

export default SideBar;
