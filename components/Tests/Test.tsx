"use client";
import React, { useState, useCallback } from "react";
import TestHeader from "./TestHeader";
import TestBody from "./TestBody";
import { QUESTIONS } from "@/lib/data";
import TestSummary from "./TestSummary";
const Test = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  return (
    <div className="w-full h-full border grid grid-rows-12">
      <TestHeader questionIndex={activeQuestionIndex} />
      {showSummary ? (
        <TestSummary  setShowSummary={setShowSummary}  setQuestionIndex={setActiveQuestionIndex}/>
      ) : (
        <TestBody
          questionIndex={activeQuestionIndex}
          setQuestionIndex={setActiveQuestionIndex}
          setShowSummary={setShowSummary}
        />
      )}
    </div>
  );
};

export default Test;
