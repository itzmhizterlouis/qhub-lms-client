import React from "react";
import Course from "../ui/Course";

const AllCourses = ({ showEnrolled }: { showEnrolled: boolean }) => {
  return (
    <div className="max-lg:h-[80vh] h-[70vh] flex flex-col items-center overflow-y-auto">
      <div className="  py-8 px-4 md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        <Course enrolled={showEnrolled} />
        <Course enrolled={showEnrolled} />
        <Course enrolled={showEnrolled} />
        <Course enrolled={showEnrolled} />
        <Course enrolled={showEnrolled} />
        <Course enrolled={showEnrolled} />
      </div>
    </div>
  );
};

export default AllCourses;
