import Main from "@/components/Dashboard/Main";
import Sidebar from "@/components/Dashboard/Sidebar";
import React from "react";

const Dashboard: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="grid grid-cols-12 open-sans h-screen overflow-hidden">
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
};

export default Dashboard;
