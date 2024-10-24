import React from "react";
import { IconCirclePlus } from "@tabler/icons-react";
const AdminCoursesPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-semibold">List of Courses</h2>
        <button className="bg-primary text-white px-4 p-2 rounded-md ">
          <IconCirclePlus className="inline mr-2 w-5 h-5" />
          Add New Course
        </button>
      </div>
    </div>
  );
};

export default AdminCoursesPage;
