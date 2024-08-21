import React from "react";
import { tests } from "@/lib/data";
import { IoIosLock } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
const MappedTests = () => {
  const getSlug = (title: string) => {
    return title.replace(/\s+/g, "-").toLowerCase();
  };
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {tests.map((test, index) => (
        <div key={index} className="border-gray-300 rounded-xl p-6 border">
          <h1 className="text-base font-bold ">{test.title}</h1>
          <p className="mt-3 text-sm">{test.description}</p>
          <div className="flex justify-end">
            <div className="bg-primary mt-4 text-xl cursor-pointer rounded-full text-white flex items-center justify-center w-11 h-11">
              <Link
                href={`/dashboard/tests/${getSlug(test.title)}${
                  test.isLocked ? "?locked=true" : ""
                }`}
              >
                {test.isLocked ? (
                  <IoIosLock className="text-white" />
                ) : (
                  <FaArrowRight className="" />
                )}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MappedTests;
