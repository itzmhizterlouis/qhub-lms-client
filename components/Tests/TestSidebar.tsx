import React from "react";
import { QUESTIONS } from "@/lib/data";
import ellipse from "../../assets/icons/ellipse.svg";
import Image from "next/image";
const TestSidebar = ({
  questionIndex,
  setQuestionIndex,
}: {
  questionIndex: number;
  setQuestionIndex;
}) => {
  return (
    <div className="col-span-2 border-r ">
      <h3 className="font-bold">Questions</h3>
      <ul className="mt-2">
        {QUESTIONS.map((question, index) => {
          return (
            <li
              key={index}
              className={`flex items-center gap-2 mr-4 px-2 text-sm py-3  ${
                index === questionIndex
                  ? "text-primary  bg-primary/10"
                  : "text-black"
              }`}
            >
              <Image src={ellipse} alt="ellipse" />
              {question.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TestSidebar;
