import React from "react";
import TestObjectives from "./TestObjectives";
import OtherTestInfo from "./OtherTestInfo";

const TestDetails = () => {
  return (
    <div className="grid grid-cols-12 my-6 gap-8">
      <TestObjectives />
      <OtherTestInfo />
    </div>
  );
};

export default TestDetails;
