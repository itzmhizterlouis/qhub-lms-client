import ReportsPageStat from "@/components/Admin/ReportsPageStat";
import Course from "@/components/ui/Course";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const Page = () => {
  return (
    <div className="p-6">
      <ReportsPageStat />
      <div className=" mt-6 ">
        <h3 className=" mb-2 font-semibold">Recent courses</h3>
        <div className="flex w-full gap-6">
          <Course enrolled={true} />
          <Course enrolled={true} />
          <Course enrolled={true} />
        </div>
      </div>
    </div>
  );
};

export default Page;
