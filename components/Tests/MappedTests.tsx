import React from "react";
import { tests } from "@/lib/data";
import { IoIosLock } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
const MappedTests = () => {
  return (
    <div className="grid grid-cols-3 gap-12 mt-10">
      {tests.map((test, index) => (
        <div key={index} className="border-gray-300 rounded-xl p-6 border">
          <h1 className="text-xl font-bold ">{test.title}</h1>
          <p className="mt-3">{test.description}</p>
          <div className="flex justify-end">
            <div className="bg-primary mt-4 text-xl cursor-pointer rounded-full text-white flex items-center justify-center w-11 h-11">
              {test.isLocked ? (
                <IoIosLock className="text-white" />
              ) : (
                <FaArrowRight className="" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MappedTests;
