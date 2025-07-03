"use client";

import { useMutation } from "@apollo/client";
import { 
  ADD_COURSE, 
  ADD_COURSE_MODULE, 
  ADD_LESSON, 
  ADD_MODULE_QUIZ, 
  ADD_QUESTION 
} from "@/lib/graphql";
import { 
  CourseInput, 
  CourseModuleInput, 
  LessonInput, 
  QuizInput, 
  QuizQuestionInput 
} from "@/lib/types";
import { useCallback } from "react";
import Cookies from "js-cookie";

export const useCourses = () => {
  // Helper function to get current access token
  const getAccessToken = useCallback(() => {
    const token = Cookies.get('accessToken');
    if (!token) {
      console.error("No access token found in cookies");
    }
    return token;
  }, []);

  // Helper function to get auth headers
  const getAuthHeaders = useCallback(() => {
    const token = getAccessToken();
    if (!token) {
      throw new Error("Authentication required. Please log in again.");
    }
    return {
      authorization: `Bearer ${token}`,
    };
  }, [getAccessToken]);

  // Add course mutation
  const [addCourse, { loading: addCourseLoading, error: addCourseError }] = useMutation(ADD_COURSE);

  // Add course module mutation
  const [addCourseModule, { loading: addModuleLoading, error: addModuleError }] = useMutation(ADD_COURSE_MODULE);

  // Add lesson mutation
  const [addLesson, { loading: addLessonLoading, error: addLessonError }] = useMutation(ADD_LESSON);

  // Add module quiz mutation
  const [addModuleQuiz, { loading: addQuizLoading, error: addQuizError }] = useMutation(ADD_MODULE_QUIZ);

  // Add question mutation
  const [addQuestion, { loading: addQuestionLoading, error: addQuestionError }] = useMutation(ADD_QUESTION);

  // Create course function
  const createCourse = useCallback(async (courseInput: CourseInput) => {
    console.log("createCourse called with:", courseInput);
    console.log("Display image URL in course input:", courseInput.displayImageUrl);
    
    try {
      const { data } = await addCourse({
        variables: { courseInput },
        context: {
          headers: getAuthHeaders(),
        },
      });
      console.log("createCourse result:", data);
      console.log("Returned course display image URL:", data?.addCourse?.displayImageUrl);
      return data?.addCourse;
    } catch (error: any) {
      console.error("Error creating course:", error);
      if (error.message?.includes("authentication") || error.message?.includes("unauthorized")) {
        throw new Error("Authentication failed. Please log in again.");
      }
      throw error;
    }
  }, [addCourse, getAuthHeaders]);

  // Create course module function
  const createCourseModule = useCallback(async (courseModuleInput: CourseModuleInput) => {
    console.log("createCourseModule called with:", courseModuleInput);
    
    try {
      const { data } = await addCourseModule({
        variables: { courseModuleInput },
        context: {
          headers: getAuthHeaders(),
        },
      });
      console.log("createCourseModule result:", data);
      return data?.addCourseModule;
    } catch (error: any) {
      console.error("Error creating course module:", error);
      if (error.message?.includes("authentication") || error.message?.includes("unauthorized")) {
        throw new Error("Authentication failed. Please log in again.");
      }
      throw error;
    }
  }, [addCourseModule, getAuthHeaders]);

  // Create lesson function
  const createLesson = useCallback(async (lessonInput: LessonInput) => {
    console.log("createLesson called with:", lessonInput);
    
    try {
      const { data } = await addLesson({
        variables: { lessonInput },
        context: {
          headers: getAuthHeaders(),
        },
      });
      console.log("createLesson result:", data);
      return data?.addLesson;
    } catch (error: any) {
      console.error("Error creating lesson:", error);
      if (error.message?.includes("authentication") || error.message?.includes("unauthorized")) {
        throw new Error("Authentication failed. Please log in again.");
      }
      throw error;
    }
  }, [addLesson, getAuthHeaders]);

  // Create module quiz function
  const createModuleQuiz = useCallback(async (quizInput: QuizInput) => {
    console.log("createModuleQuiz called with:", quizInput);
    
    try {
      const { data } = await addModuleQuiz({
        variables: { quizInput },
        context: {
          headers: getAuthHeaders(),
        },
      });
      console.log("createModuleQuiz result:", data);
      return data?.addModuleQuiz;
    } catch (error: any) {
      console.error("Error creating module quiz:", error);
      if (error.message?.includes("authentication") || error.message?.includes("unauthorized")) {
        throw new Error("Authentication failed. Please log in again.");
      }
      throw error;
    }
  }, [addModuleQuiz, getAuthHeaders]);

  // Create question function
  const createQuestion = useCallback(async (questionInput: QuizQuestionInput) => {
    console.log("createQuestion called with:", questionInput);
    
    try {
      const { data } = await addQuestion({
        variables: { questionInput },
        context: {
          headers: getAuthHeaders(),
        },
      });
      console.log("createQuestion result:", data);
      return data?.addQuestion;
    } catch (error: any) {
      console.error("Error creating question:", error);
      if (error.message?.includes("authentication") || error.message?.includes("unauthorized")) {
        throw new Error("Authentication failed. Please log in again.");
      }
      throw error;
    }
  }, [addQuestion, getAuthHeaders]);

  return {
    // Loading states
    addCourseLoading,
    addModuleLoading,
    addLessonLoading,
    addQuizLoading,
    addQuestionLoading,
    
    // Error states
    addCourseError,
    addModuleError,
    addLessonError,
    addQuizError,
    addQuestionError,
    
    // Functions
    createCourse,
    createCourseModule,
    createLesson,
    createModuleQuiz,
    createQuestion,
  };
}; 