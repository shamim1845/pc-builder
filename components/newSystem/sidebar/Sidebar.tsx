"use client";

// Hero Icons
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

type component = {
  id: number;
  name: string;
  required: boolean;
  coreComponents: boolean;
};

const SideBar = ({
  queryString,
  setQueryString,
  components,
}: {
  queryString: string;
  setQueryString: (str: string) => void;
  components: component[];
}) => {
  return (
    <div>
      {/* Core Components */}
      <div>
        <h4 className="bg-teal-500 text-white px-2 my-2">Core Components</h4>
        {components
          .filter((comp) => comp.coreComponents)
          .map((component) => (
            <Component
              key={component.id}
              queryString={queryString}
              setQueryString={(str: string) => setQueryString(str)}
              component={component}
            />
          ))}
      </div>

      {/* Peripherals & Others */}
      <div className="pt-2">
        <h4 className="bg-teal-500 text-white px-2 my-2">
          Peripherals & Others
        </h4>
        {components
          .filter((comp) => !comp.coreComponents)
          .map((component) => (
            <Component
              key={component.id}
              queryString={queryString}
              setQueryString={(str: string) => setQueryString(str)}
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
  component,
}: {
  queryString: string;
  setQueryString: (str: string) => void;
  component: component;
}) => {
  return (
    <div
      onClick={() => setQueryString(component.name)}
      className={`flex items-center gap-2 mb-2 cursor-pointer hover:text-gray-900 dark:hover:text-white ${
        queryString.toLocaleLowerCase() ===
          component.name.toLocaleLowerCase() &&
        "text-gray-900 dark:text-white font-[500]"
      }`}
    >
      <span>
        <PlusCircleIcon
          className={`${
            queryString.toLocaleLowerCase() ===
              component.name.toLocaleLowerCase() && "stroke-teal-500"
          } w-5 h-5`}
        />
      </span>
      <span>{component.name}</span>
      {component.required && <span className="text-red-600">*</span>}
    </div>
  );
};

export default SideBar;
