"use client";
import React, { useState } from "react";
import Step1CourseInfo from "./Step1CourseInfo";
import Step2ModuleBuilder from "./Step2ModuleBuilder";
import { IconCircleCheckFilled } from "@tabler/icons-react";

const steps = [
  {
    label: "Course Information",
    component: Step1CourseInfo,
  },
  {
    label: "Module & Quiz Creation",
    component: Step2ModuleBuilder,
  },
];
const CourseBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <>
      <div className="flex gap-4 items-center my-2">
        {steps.map((step, index) => {
          return (
            <p
              key={index}
              className={`text-sm flex items-center gap-2 ${
                index < currentStep ? "text-primary" : "text-gray-500"
              }`}
            >
              <IconCircleCheckFilled className="w-5 h-5" /> {step.label}
            </p>
          );
        })}
      </div>
      <div className="w-full mt-4 min-h-[calc(100vh-200px)] bg-white rounded-md  border border-gray-300">
        {currentStep === 1 && <Step1CourseInfo onNext={handleNextStep} />}
        {currentStep === 2 && (
          <Step2ModuleBuilder
            onNext={handleNextStep}
            onPrevious={handlePrevStep}
          />
        )}
      </div>
    </>
  );
};

export default CourseBuilder;
