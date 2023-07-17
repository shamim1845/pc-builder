"use client";

import Products from "@/components/newSystem/products/Products";
import SideBar from "@/components/newSystem/sidebar/Sidebar";
import { useState } from "react";

const components = [
  // Core Components
  { id: 1, name: "CPU", required: true, coreComponents: true },
  { id: 2, name: "CPU Cooler", required: false, coreComponents: true },
  { id: 3, name: "Motherboard", required: true, coreComponents: true },
  { id: 4, name: "RAM", required: true, coreComponents: true },
  { id: 5, name: "Storage", required: true, coreComponents: true },
  { id: 6, name: "Graphics Card", required: false, coreComponents: true },
  { id: 7, name: "Power Supply", required: false, coreComponents: true },
  { id: 8, name: "Casing", required: false, coreComponents: true },
  //   PeriPherals & others
  { id: 9, name: "Monitor", required: false, coreComponents: false },
  { id: 10, name: "Casing Cooler", required: false, coreComponents: false },
  { id: 11, name: "Keyboard", required: false, coreComponents: false },
  { id: 12, name: "Mouse", required: false, coreComponents: false },
  { id: 13, name: "Anti Virus", required: false, coreComponents: false },
  { id: 14, name: "Headphone", required: false, coreComponents: false },
  { id: 15, name: "UPS", required: false, coreComponents: false },
];

const NewPC = () => {
  const [queryString, setQueryString] = useState("cpu");

  return (
    <div className="flex  new_system">
      <div className="h-full overflow-y-auto pr-2">
        <SideBar
          queryString={queryString}
          setQueryString={(str: string) => setQueryString(str)}
          components={components}
        />
      </div>
      <div
        className={`h-full overflow-y-auto flex-1 border-l custom_border pl-2`}
      >
        <Products queryString={queryString} />
      </div>
    </div>
  );
};

export default NewPC;
