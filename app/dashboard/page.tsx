import Main from "@/components/Dashboard/Main";
import Sidebar from "@/components/Dashboard/Sidebar";
import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Dashboard;
