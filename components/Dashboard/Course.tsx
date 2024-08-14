import React from "react";
import image from "@/public/courseimage.png";
import Image from "next/image";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
const Course = () => {
  return (
    <div className="w-[320px] bg-primary-light p-2 py-4 flex gap-2 flex-col rounded-md">
      <Image src={image} alt="course image" />
      <h1 className="font-bold text-xl">Introduction to Data Science</h1>

      <p className="text-sm my-1">3 modules | 20 videos</p>
      <div className="flex gap-2 my-1 items-center">
        <div className="w-[60%]">
          <ProgressBar max={100} value={72} />
        </div>
        <p className="text-xs">45% completed</p>
      </div>
      <Button text="Continue" />
    </div>
  );
};

export default Course;
