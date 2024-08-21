import React from "react";
import ProgressBar from "../ui/ProgressBar";
import { IoMdTrophy } from "react-icons/io";
const Test = () => {
  return (
    <div className="w-full h-full border ">
      <div className="bg-primary text-white w-full p-6 ">
        <h1 className=" text-2xl mb-2 font-semibold">
          Customer Service Excellence
        </h1>
        <div className="w-[300px] my-2 flex gap-2 items-center">
          <ProgressBar value={0} max={100} />
          <IoMdTrophy className="text-3xl text-yellow" />
        </div>
        <p className="text-sm">0 of 50 answered</p>
      </div>
    </div>
  );
};

export default Test;
