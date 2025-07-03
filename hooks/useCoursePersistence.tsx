"use client";

import { useState, useEffect, useCallback } from 'react';

interface CourseCreationState {
  currentStep: number;
  courseId: string | null;
  courseInput: {
    title: string;
    description: string;
    durationHours: string;
    durationMinutes: string;
    category: string;
    introVideoUrl: string;
    displayImageUrl: string;
  };
  modules: any[];
  lastSaved: number;
}

const STORAGE_KEY = 'qhub_course_creation_state';

export const useCoursePersistence = () => {
  const [state, setState] = useState<CourseCreationState>({
    currentStep: 1,
    courseId: null,
    courseInput: {
      title: "",
      description: "",
      durationHours: "",
      durationMinutes: "",
      category: "",
      introVideoUrl: "",
      displayImageUrl: "",
    },
    modules: [],
    lastSaved: Date.now(),
  });

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Only restore if the saved state is less than 24 hours old
        const isRecent = Date.now() - parsedState.lastSaved < 24 * 60 * 60 * 1000;
        if (isRecent) {
          setState(parsedState);
          console.log("Restored course creation state from localStorage");
        } else {
          // Clear old state
          localStorage.removeItem(STORAGE_KEY);
          console.log("Cleared old course creation state");
        }
      }
    } catch (error) {
      console.error("Error loading course creation state:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save state to localStorage whenever it changes
  const saveState = useCallback((newState: Partial<CourseCreationState>) => {
    const updatedState = {
      ...state,
      ...newState,
      lastSaved: Date.now(),
    };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
      setState(updatedState);
      console.log("Saved course creation state to localStorage");
    } catch (error) {
      console.error("Error saving course creation state:", error);
    }
  }, [state]);

  // Clear saved state
  const clearState = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setState({
        currentStep: 1,
        courseId: null,
        courseInput: {
          title: "",
          description: "",
          durationHours: "",
          durationMinutes: "",
          category: "",
          introVideoUrl: "",
          displayImageUrl: "",
        },
        modules: [],
        lastSaved: Date.now(),
      });
      console.log("Cleared course creation state");
    } catch (error) {
      console.error("Error clearing course creation state:", error);
    }
  }, []);

  // Update specific parts of the state
  const updateCourseInput = useCallback((updates: Partial<CourseCreationState['courseInput']>) => {
    saveState({
      courseInput: { ...state.courseInput, ...updates }
    });
  }, [state.courseInput, saveState]);

  const updateModules = useCallback((modules: any[]) => {
    saveState({ modules });
  }, [saveState]);

  const setCurrentStep = useCallback((step: number) => {
    saveState({ currentStep: step });
  }, [saveState]);

  const setCourseId = useCallback((id: string | null) => {
    saveState({ courseId: id });
  }, [saveState]);

  return {
    state,
    updateCourseInput,
    updateModules,
    setCurrentStep,
    setCourseId,
    clearState,
    saveState,
  };
}; 