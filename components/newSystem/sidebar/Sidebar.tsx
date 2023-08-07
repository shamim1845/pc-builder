"use client";

import { setCurrentCategory } from "@/redux/features/extra/extraSlice";
// Hero Icons
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";

const SideBar = ({
  hide,
  setHide,
}: {
  hide: boolean;
  setHide: (bool: boolean) => void;
}) => {
  const { data: sideBar } = useSelector((state: RootState) => state.sideBar);
  const { currentCategory } = useSelector((state: RootState) => state.extra);

  console.log("sideBar render");

  return (
    <div
      className={`bg-white dark:bg-gray-700 lg:bg-transparent dark:lg:bg-transparent  h-full px-5 py-5 lg:pl-0  fixed lg:relative  transition-all delay-75 ${
        hide ? "-left-[15rem] lg:left-0" : "left-0"
      } `}
    >
      {/* Core Components */}
      <div className="mb-5">
        <div className="mb-2">
          <h4 className="bg-teal-500  text-white px-2">Core Components</h4>
        </div>
        {sideBar
          ?.filter((comp) => comp.coreComponents)
          ?.map((component) => (
            <Component
              key={component.id}
              currentCategory={currentCategory}
              setHide={(bool: boolean) => setHide(bool)}
              component={component}
            />
          ))}
      </div>

      {/* Peripherals & Others */}
      <div className="mb-5">
        <div className=" mb-2">
          <h4 className="bg-teal-500  text-white px-2">Peripherals & Others</h4>
        </div>
        {sideBar
          ?.filter((comp) => !comp.coreComponents)
          ?.map((component) => (
            <Component
              key={component.id}
              currentCategory={currentCategory}
              setHide={(bool: boolean) => setHide(bool)}
              component={component}
            />
          ))}
      </div>
    </div>
  );
};

const Component = ({
  currentCategory,
  setHide,
  component,
}: {
  currentCategory: string;
  setHide: (bool: boolean) => void;
  component: SideBar;
}) => {
  const category = component.name.toLocaleLowerCase().split(" ").join("-");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentCategory(category));
    setHide(true);
  };

  console.log("Sidebar component render");

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-2 mb-2 cursor-pointer hover:text-gray-900 dark:hover:text-white  ${
        currentCategory === category &&
        "text-gray-900 dark:text-white font-[500]"
      }`}
    >
      <span>
        {component.selected ? (
          <CheckCircleIcon className={`stroke-teal-500 w-5 h-5`} />
        ) : (
          <PlusCircleIcon
            className={`${
              currentCategory === category && "stroke-teal-500"
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
