
import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-scheduler-gray-light/50 font-twcent">
      <Sidebar />
      <div className="flex-1 p-0 md:p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
