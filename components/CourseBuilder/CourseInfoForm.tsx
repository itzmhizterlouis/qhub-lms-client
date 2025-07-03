import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import IntroVideoUpload from "./IntroVideoUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseInfoFormProps {
  courseInput: any;
  setCourseInput: (updates: Partial<any>) => void;
}

const CourseInfoForm = ({ 
  courseInput, 
  setCourseInput 
}: CourseInfoFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setCourseInput({ [id]: value });
  };

  const handleCategoryChange = (value: string) => {
    setCourseInput({ category: value });
  };

  return (
    <div>
      <div className="grid gap-4">
        <Label htmlFor="title">Course Title *</Label>
        <Input 
          id="title" 
          className="col-span-3" 
          value={courseInput.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-4 mt-4">
        <Label htmlFor="description">Course Description *</Label>
        <Textarea
          placeholder="Type your description here."
          id="description"
          rows={10}
          value={courseInput.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex max-md:flex-col w-full mt-4 ">
        <div className="grid gap-4 max-md:w-full w-[50%]">
          <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Estimated Course Duration *
          </p>

          <div className="flex gap-4">
            <div>
              <Input 
                id="durationHours" 
                className="col-span-3" 
                type="number" 
                min="0"
                value={courseInput.durationHours}
                onChange={handleChange}
                required
              />
              <Label
                htmlFor="durationHours"
                className="mt-1 text-sm text-gray-400"
              >
                Hours
              </Label>
            </div>
            <div>
              <Input 
                id="durationMinutes" 
                className="col-span-3" 
                type="number" 
                min="0" 
                max="59"
                value={courseInput.durationMinutes}
                onChange={handleChange}
                required
              />
              <Label
                htmlFor="durationMinutes"
                className="mt-1 text-sm text-gray-400"
              >
                Minutes
              </Label>
            </div>
          </div>
        </div>
        <div className="grid gap-4 w-[50%]  max-md:w-full max-md:mt-4">
          <Label htmlFor="category">Category *</Label>
          <Select 
            onValueChange={handleCategoryChange} 
            value={courseInput.category}
            required
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <IntroVideoUpload 
        setCourseInput={setCourseInput}
        courseInput={courseInput}
      />
    </div>
  );
};

export default CourseInfoForm;