import Main from "@/components/Dashboard/Main/Main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    <div className=" open-sans  h-screen flex ">
      <Main>{children}</Main>
    </div>
  );
};

export default Dashboard;
