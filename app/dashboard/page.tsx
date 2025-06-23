import AdminHome from "@/components/Admin/AdminHome";
import React from "react";
import EmployeeHome from "@/components/EmployeeHome";
import { cookies } from "next/headers";
const Page = () => {
  const cookieStore = cookies();
    const role = cookieStore.get("role")?.value;
  return (
    <div className="w-full h-full p-6">
      {role === "organizationOwner" || role === "admin" ? <AdminHome /> : <EmployeeHome />}
    </div>
  );
};

export default Page;
