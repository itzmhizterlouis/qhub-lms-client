"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import fire from "@/assets/icons/fire.gif";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/utils/uploadthing";
import { Loader2 } from "lucide-react";

const ImageUpload = ({
  file,
  setFile,
  className,
}: {
  file: string | null;
  className?: string;
  setFile: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [dragging, setDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("logoUploader");

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      console.log("Starting image upload for file:", file.name, "Size:", file.size, "Type:", file.type);
      const uploaded = await startUpload([file]);
      console.log("Upload result:", uploaded);
      if (uploaded?.[0]?.url) {
        console.log("Setting file URL:", uploaded[0].url);
        setFile(uploaded[0].url);
        console.log("File URL set successfully");
      } else {
        console.error("Upload failed - no URL returned");
        throw new Error("Upload failed - no URL returned");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      // Show user-friendly error message
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image")) {
      await uploadImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image")) {
      await uploadImage(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "w-full rounded-md border-2 border-dashed h-[300px] flex items-center justify-center relative overflow-hidden",
        dragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
        className
      )}
    >
      {isUploading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}

      {!file ? (
        <>
          {!dragging ? (
            <div className="flex items-center justify-center w-full h-full flex-col p-4 text-center">
              <p className="text-sm">Drag & drop your image here</p>
              <p className="mt-1 text-xs text-gray-500">
                File format: <b>.jpg, .png, .webp</b>
              </p>
              <p className="my-2 text-xs ">Or</p>
              <Button 
                className="bg-primary hover:bg-primary/90" 
                type="button"
                disabled={isUploading}
              >
                <label htmlFor="image-upload" className="cursor-pointer">
                  Browse Image
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={isUploading}
                />
              </Button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              <img src={fire.src} alt="Fire" width={100} height={100} />
              <h1 className="mt-2 text-primary text-lg font-medium">
                Drop it like it&apos;s hot!
              </h1>
            </div>
          )}
        </>
      ) : (
        <img
          src={file}
          alt="Display Image"
          className="w-full h-full object-cover rounded-md"
        />
      )}
    </div>
  );
};

export default ImageUpload;