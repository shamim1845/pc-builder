import SideNav from "@/components/sidebar/SideNav";
import { ReactNode } from "react";
import BreadCrumb from "@/components/BreadCrumb";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex ">
      <SideNav />
      <div className="flex-1 pl-5 pt-5">
        <BreadCrumb /> {children}
      </div>
    </main>
  );
};

export default PageLayout;
