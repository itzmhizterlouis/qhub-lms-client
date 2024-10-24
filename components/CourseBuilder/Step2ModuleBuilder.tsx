import React from "react";
import ModuleBuilder from "./ModuleBuilder";

const Step2ModuleBuilder = () => {
  return (
    <div>
      <div className="border-b border-b-gray-300 p-6">
        <h1 className="text-lg font-semibold">Module & Quiz Creation</h1>
        <p className="text-sm text-gray-600">
          Add modules, quizzes, or tasks to your course
        </p>
      </div>
      <ModuleBuilder />
    </div>
  );
};

export default Step2ModuleBuilder;
