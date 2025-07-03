"use client";
import React, { useState, useEffect } from "react";
import Step1CourseInfo from "./Step1CourseInfo";
import Step2ModuleBuilder from "./Step2ModuleBuilder";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useCourses } from "@/hooks/useCourses";
import { useCoursePersistence } from "@/hooks/useCoursePersistence";
import { CourseInput } from "@/lib/types";
import { Button } from "@/components/ui/button";

const steps = [
  {
    label: "Course Information",
  },
  {
    label: "Module Creation",
  },
];

const CourseBuilder = () => {
  const {
    state,
    updateCourseInput,
    updateModules,
    setCurrentStep,
    setCourseId,
    clearState,
  } = useCoursePersistence();

  const { currentStep, courseId, courseInput, modules } = state;

  // Debug: Log course input changes
  useEffect(() => {
    console.log("Course input updated:", courseInput);
  }, [courseInput]);

  // Show notification when state is restored
  useEffect(() => {
    const savedState = localStorage.getItem('qhub_course_creation_state');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      const isRecent = Date.now() - parsedState.lastSaved < 24 * 60 * 60 * 1000;
      if (isRecent && (parsedState.courseInput.title || parsedState.modules.length > 0)) {
        toast.success("Your course creation progress has been restored!");
      }
    }
  }, []);

  const { createCourse, addCourseLoading } = useCourses();
  const organizationId = Cookies.get("organizationId") || "";
  const router = useRouter();

  const handleNextStep = async () => {
    console.log("Current course input state:", courseInput);
    
    // Validate required fields
    if (
      !courseInput.title ||
      !courseInput.description ||
      !courseInput.durationHours ||
      !courseInput.durationMinutes ||
      !courseInput.category
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Check if user is authenticated
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      toast.error("Please log in to create a course");
      router.push("/auth/login");
      return;
    }

    try {
      const duration = `${courseInput.durationHours}h ${courseInput.durationMinutes}m`;
      const courseInputData: CourseInput = {
        title: courseInput.title,
        description: courseInput.description,
        duration,
        category: courseInput.category,
        introVideoUrl: courseInput.introVideoUrl || "",
        displayImageUrl: courseInput.displayImageUrl || "",
        organizationId: organizationId,
      };

      console.log("Course input data being sent:", courseInputData);
      console.log("Display image URL:", courseInputData.displayImageUrl);

      const result = await createCourse(courseInputData);
      
      if (result?._id) {
        setCourseId(result._id);
        setCurrentStep(2);
        toast.success("Course created successfully!");
      } else {
        toast.error("Failed to create course");
      }
    } catch (error: any) {
      console.error("Course creation failed:", error);
      if (error.message?.includes("authentication") || error.message?.includes("log in")) {
        toast.error("Authentication failed. Please log in again.");
        router.push("/auth/login");
      } else {
        toast.error("Failed to create course");
      }
    }
  };

  const handlePrevStep = () => setCurrentStep(1);
  const handleStepClick = (index: number) => {
    if (index === 1) {
      setCurrentStep(1);
    } else if (index === 2 && courseId) {
      setCurrentStep(2);
    }
  };

  const handleSubmitCourse = () => {
    // This would be handled in Step2ModuleBuilder
    clearState(); // Clear saved state after successful submission
    router.push("/dashboard/courses");
    toast.success("Course published successfully!");
  };

  return (
    <>
      <div className="flex gap-4 items-center my-2 justify-between">
        <div className="flex gap-4 items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => handleStepClick(index + 1)}
              className={`flex items-center gap-2 text-sm max-md:text-xs cursor-pointer ${
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
        {(courseInput.title || modules.length > 0) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clearState();
              toast.success("Draft cleared successfully!");
            }}
            className="text-red-600 hover:text-red-700"
          >
            Clear Draft
          </Button>
        )}
      </div>
      <div className="w-full mt-4 min-h-[calc(100vh-200px)] bg-white rounded-md  border border-gray-300">
        {currentStep === 1 && (
          <Step1CourseInfo 
            onNext={handleNextStep} 
            courseInput={courseInput}
            setCourseInput={updateCourseInput}
            loading={addCourseLoading}
          />
        )}
        {currentStep === 2 && courseId && (
          <Step2ModuleBuilder
            onPrevious={handlePrevStep}
            onNext={handleSubmitCourse}
            courseId={courseId}
            modules={modules}
            setModules={updateModules}
          />
        )}
      </div>
    </>
  );
};

export default CourseBuilder;