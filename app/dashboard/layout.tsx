import Bottombar from "@/components/Main/Bottombar";
import Header from "@/components/Main/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

const Dashboard: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className=" open-sans  h-screen flex overflow-hidden ">
      <Sidebar />
      <div className="max-md:w-full w-[calc(100%-250px)] overflow-y-auto">
        <Header />
        {children}
        <Bottombar />
      </div>
    </div>
  );
};

export default Dashboard;
