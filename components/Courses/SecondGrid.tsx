import React from "react";
import woman from "@/public/womanspeaking.png";

import { courseinfo } from "@/lib/data";
import Image from "next/image";
import Button from "../ui/Button";
const SecondGrid = () => {
  return (
    <div className="bg-primary-light col-span-3 text-sm h-fit sticky top-0">
      <Image src={woman} alt="Woman Speaking" width={500} height={500} />
      <div className="px-7 pb-5">
        <ul className="mb-5">
          {courseinfo.map((info, index) => (
            <li
              key={index}
              className="flex my-4 justify-between items-center border-b py-2 border-b-slate-300"
            >
              <span className="flex font-bold items-center justify-center gap-2">
                <Image src={info.icon} alt={info.title} />
                {info.title}
              </span>
              <p>{info.content}</p>
            </li>
          ))}
        </ul>
        <Button text="Start Course" />
      </div>
    </div>
  );
};

export default SecondGrid;
