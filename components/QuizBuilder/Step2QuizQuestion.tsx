"use client";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

import QuestionBoard from "./QuestionBoard";
import Page1QuizQuestion from "./Page1QuizQuestion";
import { DialogClose } from "../ui/dialog";
import { Quiz } from "@/lib/types";
const Step2QuizQuestion = ({
  handleNextStep,
  handlePrevStep,
  isEditQuiz,
  quiz,
  setQuiz,
  onSubmit,
  handleNextQuizPage,
  handlePrevQuizPage,
  quizPageNo,
  loading,
}: {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  isEditQuiz: boolean;
  quiz: Quiz;
  onSubmit: () => void;
  handleNextQuizPage: () => void;
  handlePrevQuizPage: () => void;
  quizPageNo: number;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
  loading?: boolean;
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const questions = quiz.questions;
  const activeQuestionIndex = editIndex || 0;
  const activeQuestion = questions[activeQuestionIndex];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((prevQ, idx) =>
        idx === activeQuestionIndex
          ? {
              ...prevQ,
              [id]: value,
            }
          : prevQ
      ),
    }));
  };
  const handleReactQuillChange = (value: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((prevQ, idx) =>
        idx === activeQuestionIndex
          ? {
              ...prevQ,
              description: value,
            }
          : prevQ
      ),
    }));
  };

  const handleAnswerExplanationChange = (value: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((prevQ, idx) =>
        idx === activeQuestionIndex
          ? {
              ...prevQ,
              answerExplanation: value,
            }
          : prevQ
      ),
    }));
  };

  const handleQuestionTypeChange = (value: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((prevQuestion, idx) =>
        idx === activeQuestionIndex
          ? {
              ...prevQuestion,
              questionType: value,
              options: [{ id: `temp-option-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, name: "", isCorrect: false }],
            }
          : prevQuestion
      ),
    }));
  };
  const handleAddOption = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((prevQuestion) => ({
        ...prevQuestion,
        options: [
          ...prevQuestion.options,
          { id: `temp-option-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, name: "", isCorrect: false },
        ],
      })),
    }));
  };
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((prevQuestion) => ({
        ...prevQuestion,
        options: prevQuestion.options.map((prevOption) =>
          prevOption.id === id ? { ...prevOption, name: value } : prevOption
        ),
      })),
    }));
  };

  const handleTrueFalseChange = (value: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((prevQ, idx) =>
        idx === activeQuestionIndex
          ? {
              ...prevQ,
              trueFalseSelection: value,
            }
          : prevQ
      ),
    }));
  };
  const handleEditQuestion = (index: number) => {
    handlePrevQuizPage();
    setEditIndex(index);
  };
  const handleDeleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, idx) => idx !== index);
    setQuiz((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleAddNewQuestion = () => {
    handlePrevQuizPage();

    const newQuestions = [
      ...questions,
      {
        id: `temp-question-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        question: "",
        questionType: "true/false",
        points: 1,
        description: "",
        options: [{ id: `temp-option-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, name: "", isCorrect: false }],
        answerExplanation: "",
      },
    ];
    setEditIndex(quiz.questions.length);
    setQuiz((prev) => ({ ...prev, questions: newQuestions }));
  };

  return (
    <>
      {quizPageNo === 1 && (
        <Page1QuizQuestion
          onNext={handleNextQuizPage}
          onBack={handlePrevStep}
          handleChange={handleChange}
          handleQuestionTypeChange={handleQuestionTypeChange}
          handleReactQuillChange={handleReactQuillChange}
          handleAddOption={handleAddOption}
          handleOptionChange={handleOptionChange}
          question={activeQuestion}
          isEditing={editIndex !== null}
          handleAnswerExplanationChange={handleAnswerExplanationChange}
          handleTrueFalseChange={handleTrueFalseChange}
        />
      )}
      {quizPageNo === 2 && (
        <>
          <QuestionBoard
            onDelete={handleDeleteQuestion}
            questions={questions}
            onEdit={handleEditQuestion}
            onAdd={handleAddNewQuestion}
          />
          <div className="flex justify-between w-full flex-row mt-4 ">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="bg-primary hover:bg-primary/90"
                type="submit"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  isEditQuiz ? "Update Quiz" : "Save & Next"
                )}
              </Button>
            </DialogClose>
          </div>
        </>
      )}
    </>
  );
};

export default Step2QuizQuestion;
