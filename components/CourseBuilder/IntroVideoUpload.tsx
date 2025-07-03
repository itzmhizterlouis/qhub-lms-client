// components/IntroVideoUpload.tsx
"use client";
import React from "react";
import { Label } from "../ui/label";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";

const IntroVideoUpload = ({ courseInput, setCourseInput }: any) => {
  return (
    <div className="grid gap-6 mt-4">
      <Label htmlFor="intro-video">Course Intro Video (Optional)</Label>
      <VideoUpload 
        file={courseInput.introVideoUrl}
        setFile={(url) => setCourseInput(prev => ({ 
          ...prev, 
          introVideoUrl: url 
        }))}
      />
      
      <Label htmlFor="image-upload">Display Image (Optional)</Label>
      <ImageUpload 
        file={courseInput.displayImageUrl}
        setFile={(url) => {
          console.log("Setting display image URL:", url);
          setCourseInput(prev => ({ 
            ...prev, 
            displayImageUrl: url 
          }));
        }}
      />
      
      {/* Debug section */}
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p className="text-sm">Current displayImageUrl: {courseInput.displayImageUrl || "Not set"}</p>
        <p className="text-sm">Current introVideoUrl: {courseInput.introVideoUrl || "Not set"}</p>
      </div>
    </div>
  );
};

export default IntroVideoUpload;