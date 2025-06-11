<<<<<<< HEAD
import Main from "@/components/Dashboard/Main/Main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

=======
import Bottombar from "@/components/Main/Bottombar";
import Header from "@/components/Main/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
>>>>>>> 378d3d01ef40fbc431a9b5e2521ce6ba54ecff7e
import React from "react";

const Dashboard: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    redirect("/login");
  }
  return (
<<<<<<< HEAD
    <div className=" open-sans  h-screen flex ">
      <Main>{children}</Main>
=======
    <div className="flex  max-h-screen overflow-hidden">
      <div className="max-md:hidden">
      <Sidebar />
      </div>
      <div className="flex-1 max-h-screen overflow-y-auto h-full ">
        <Header />
        {children}
        {/* <Bottombar /> */}
      </div>
>>>>>>> 378d3d01ef40fbc431a9b5e2521ce6ba54ecff7e
    </div>
  );
};

export default Dashboard;
