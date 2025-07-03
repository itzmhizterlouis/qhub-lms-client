import React from "react";
import CourseInfoForm from "./CourseInfoForm";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface Step1CourseInfoProps {
  onNext: () => void;
  courseInput: any;
  setCourseInput: React.Dispatch<React.SetStateAction<any>>;
  loading?: boolean;
}

const Step1CourseInfo = ({ 
  onNext, 
  courseInput, 
  setCourseInput,
  loading = false
}: Step1CourseInfoProps) => {
  return (
    <div className="h-full">
      <div className="border-b border-b-gray-300 p-6 max-md:p-4">
        <h1 className="text-lg font-semibold">Course Information</h1>
        <p className="text-sm text-gray-600">
          Add information about the course
        </p>
      </div>
      <div className="p-6 max-md:p-4">
        <CourseInfoForm 
          courseInput={courseInput} 
          setCourseInput={setCourseInput} 
        />
        <div className="flex justify-end mt-4 ">
          <Button 
            className="bg-primary hover:bg-primary/90" 
            onClick={onNext}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step1CourseInfo;