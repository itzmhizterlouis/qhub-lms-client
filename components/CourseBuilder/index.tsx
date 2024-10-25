"use client";
import React, { useState } from "react";
import Step1CourseInfo from "./Step1CourseInfo";
import Step2ModuleBuilder from "./Step2ModuleBuilder";

const CourseBuilder = () => {
  const [currentStep, setCurrentStep] = useState(2);

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);
  console.log(currentStep, "currentStep");
  return (
    <div className="w-full mt-4 min-h-[calc(100vh-200px)] bg-white rounded-md  border border-gray-300">
      {currentStep === 1 && <Step1CourseInfo onNext={handleNextStep} />}
      {currentStep === 2 && <Step2ModuleBuilder />}
    </div>
  );
};

export default CourseBuilder;
