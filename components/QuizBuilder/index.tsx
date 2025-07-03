"use client";
import React, { useState } from "react";
import { Quiz } from "@/lib/types";
import Step2QuizQuestion from "./Step2QuizQuestion";
import Step1QuizInfo from "./Step1QuizInfo";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { Module } from "@/lib/types";
import { useCourses } from "@/hooks/useCourses";
import { QuizInput, QuizQuestionInput } from "@/lib/types";
import toast from "react-hot-toast";
import { DialogClose } from "../ui/dialog";
const QuizBuilder = ({
  module,
  setModules,
  propQuiz,
  modules,
}: {
  module: Module;
  setModules: (modules: Module[]) => void;
  propQuiz?: Quiz;
  modules: Module[];
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const defaultQuiz = {
    id: "",
    name: "",
    summary: "",
    questions: [],
  };
  const [quizPageNo, setQuizPageNo] = useState(2);
  const [quiz, setQuiz] = useState<Quiz>(propQuiz || defaultQuiz);
  const { createModuleQuiz, createQuestion, addQuizLoading, addQuestionLoading } = useCourses();

  const handleSubmit = async () => {
    try {
      if (propQuiz) {
        // Update existing quiz
        const updatedModules = modules.map((prevModule: any) =>
          prevModule.id === module.id
            ? {
                ...module,
                quizzes: prevModule.quizzes?.map((q: any) =>
                  q.id === quiz.id ? quiz : q
                ),
              }
            : prevModule
        );
        setModules(updatedModules);
      } else {
        // Create new quiz via API
        const quizInput: QuizInput = {
          moduleId: module.id,
          title: quiz.name,
          summary: quiz.summary,
        };

        const result = await createModuleQuiz(quizInput);

        if (result?._id) {
          const newQuiz = {
            ...quiz,
            id: result._id,
            _id: result._id,
          };

          // Create questions via API if there are any
          if (quiz.questions.length > 0) {
            try {
              for (const question of quiz.questions) {
                // Convert frontend question format to API format
                let options = [];
                
                if (question.questionType === "true/false") {
                  // For true/false questions, create standard options based on user selection
                  const trueFalseSelection = (question as any).trueFalseSelection;
                  options = [
                    { text: "True", isCorrect: trueFalseSelection === "true" },
                    { text: "False", isCorrect: trueFalseSelection === "false" }
                  ];
                } else {
                  // For other question types, use the provided options
                  options = question.options.map(option => ({
                    text: option.name,
                    isCorrect: option.isCorrect
                  }));
                }

                const questionInput: QuizQuestionInput = {
                  quizId: result._id,
                  text: question.question,
                  type: question.questionType,
                  point: question.points,
                  displayPoint: true, // You might want to make this configurable
                  options: options
                };

                const questionResult = await createQuestion(questionInput);
                console.log("Question created:", questionResult);
              }
              toast.success("Quiz and questions created successfully!");
            } catch (questionError: any) {
              console.error("Error creating questions:", questionError);
              toast.error("Quiz created but failed to create some questions");
            }
          } else {
            toast.success("Quiz created successfully!");
          }

          const updatedModules = modules.map((prevModule: any) =>
            prevModule.id === module.id
              ? { ...module, quizzes: [...(module.quizzes || []), newQuiz] }
              : prevModule
          );
          setModules(updatedModules);
        } else {
          toast.error("Failed to create quiz");
        }
      }
    } catch (error: any) {
      console.error("Error creating quiz:", error);
      if (error.message?.includes("authentication") || error.message?.includes("log in")) {
        toast.error("Authentication failed. Please log in again.");
      } else {
        toast.error("Failed to create quiz");
      }
    }
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setQuiz((prev) => ({ ...prev, [id]: value }));
  };

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);
  const steps = [
    { label: "Quiz Info" },
    { label: "Questions" },
    { label: "Settings" },
  ];
  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };
  const handleNextQuizPage = () => setQuizPageNo((prev) => prev + 1);
  const handlePrevQuizPage = () => setQuizPageNo((prev) => prev - 1);
  console.log(quiz, "quiz");
  return (
    <>
      <div className="flex gap-4 items-center my-4">
        {steps.map((step, index) => (
          <div
            key={index}
            onClick={() => handleStepClick(index + 1)}
            className={`flex items-center gap-2 text-sm cursor-pointer ${
              index + 1 < currentStep ? "text-primary" : "text-gray-500"
            }`}
          >
            {index + 1 < currentStep ? (
              <IconCircleCheckFilled className="w-5 h-5 text-primary" />
            ) : (
              <span
                className={`w-5 h-5 flex items-center justify-center rounded-full ${
                  index + 1 === currentStep
                    ? "bg-primary text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </span>
            )}
            <span
              className={`${
                index + 1 <= currentStep ? "font-semibold" : "font-normal"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
      {currentStep == 1 && (
        <Step1QuizInfo
          onNext={handleNextStep}
          onChange={handleChange}
          quiz={quiz}
        />
      )}
      {currentStep == 2 && (
        <Step2QuizQuestion
          onSubmit={handleSubmit}
          isEditQuiz={!!propQuiz}
          quizPageNo={quizPageNo}
          quiz={quiz}
          setQuiz={setQuiz}
          handleNextQuizPage={handleNextQuizPage}
          handlePrevQuizPage={handlePrevQuizPage}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          loading={addQuizLoading || addQuestionLoading}
        />
      )}
    </>
  );
};

export default QuizBuilder;
