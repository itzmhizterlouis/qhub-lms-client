import EmployeeTable from "@/components/Admin/EmployeeTable";
import { IconCirclePlus, IconCirclePlus2, IconPlus } from "@tabler/icons-react";
import { notFound } from "next/navigation";
import React from "react";

const Page = () => {
  const user = {
    role: "admin",
  };
  const role = user.role;
  if (role !== "admin") return notFound();
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="font-semibold">Employees</h2>
        <button className="bg-primary text-white px-4 p-2 rounded-md ">
          <IconCirclePlus className="inline mr-2 w-5 h-5" />
          Invite New Employee
        </button>
      </div>
      <EmployeeTable />
    </div>
  );
};

export default Page;
