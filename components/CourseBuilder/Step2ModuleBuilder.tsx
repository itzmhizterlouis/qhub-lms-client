import React from "react";
import ModuleBuilder from "./ModuleBuilder";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface Step2ModuleBuilderProps {
  onNext: () => void;
  onPrevious: () => void;
  courseId: string;
  modules: any[];
  setModules: (modules: any[]) => void;
}

const Step2ModuleBuilder = ({
  onNext,
  onPrevious,
  courseId,
  modules,
  setModules
}: Step2ModuleBuilderProps) => {
  const router = useRouter();

  const handleSubmit = async () => {
    // Check if user is authenticated
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      toast.error("Please log in to submit course");
      router.push("/auth/login");
      return;
    }

    try {
      // All modules are already created via API, just proceed to next step
      onNext();
    } catch (error: any) {
      console.error("Course submission failed:", error);
      if (error.message?.includes("authentication") || error.message?.includes("log in")) {
        toast.error("Authentication failed. Please log in again.");
        router.push("/auth/login");
      } else {
        toast.error("Failed to submit course");
      }
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      const updatedModules = modules.filter((m: any) => m.id !== moduleId);
      setModules(updatedModules);
      toast.success("Module removed");
    } catch (error) {
      console.error("Module deletion failed:", error);
      toast.error("Failed to delete module");
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] relative">
      <div className="border-b border-b-gray-300 p-6">
        <h1 className="text-lg font-semibold">Module Creation</h1>
        <p className="text-sm text-gray-600">
          Add modules, lessons and quizzes to your course
        </p>
      </div>
      <ModuleBuilder 
        modules={modules} 
        setModules={setModules} 
        courseId={courseId}
        onDeleteModule={handleDeleteModule}
      />
      <div className="flex !justify-between w-full flex-row absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={handleSubmit}
        >
          Submit Course
        </Button>
      </div>
    </div>
  );
};

export default Step2ModuleBuilder;