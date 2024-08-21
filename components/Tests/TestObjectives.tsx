"use client";
import React from "react";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { IoIosLock } from "react-icons/io";
const TestObjectives = () => {
  const searchParams = useSearchParams();
  const isLocked = searchParams.get("locked");
  return (
    <div className="col-span-7 border border-gray-500/20 rounded-xl ">
      <div className="p-6 border-b-gray/20 border-b">
        <h1 className="text-xl font-bold">Customer Service Excellence</h1>
        <h3 className="flex gap-2 items-center my-2 mt-4">
          <span className="font-bold">Prerequisite Course: </span>
          Fundamentals of Customer Service in Banking
          <span className="bg-green-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            <FaCheck />
          </span>
        </h3>
        <h3 className="">
          {" "}
          <span className="font-bold">Question Type:</span> Multiple Choice
        </h3>
        <h3 className="my-2">
          {" "}
          <span className="font-bold">Number of Questions:</span>50
        </h3>
      </div>
      <div className="p-6">
        <h1 className="font-bold">Objectives</h1>
        <p className="text-sm  mt-3 text-gray-500">
          Evaluate the employee&apos;s understanding of customer service
          principles and their ability to apply them in a banking context.
        </p>
        <h1 className="font-bold mt-4">Requirements</h1>
        <ul className="list-disc list-inside mt-4">
          <li>
            You should be currently taking or have completed this course to be
            able to understand and answer the questions correctly.
          </li>
          <li>
            You should be currently taking or have completed this course to be
            able to understand and answer the questions correctly.
          </li>
        </ul>
        <button className="flex items-center w-[250px] bg-primary rounded-full text-white p-3 mt-6 px-5 justify-between ">
          Start Test {isLocked ? <IoIosLock /> : <FaArrowRight />}
        </button>
      </div>
    </div>
  );
};

export default TestObjectives;
