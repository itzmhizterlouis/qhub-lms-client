import Image from "next/image";
import React from "react";
import testimage from "@/public/testimage.png";
import TestDetails from "@/components/Tests/TestDetails";
const page = () => {
  return (
    <div className="overflow-y-auto max-h-[650px] p-6">
      <Image src={testimage} alt="testimage" />
      <TestDetails />
    </div>
  );
};

export default page;
