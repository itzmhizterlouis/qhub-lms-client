"use client";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import { Loader2 } from "lucide-react";

interface Step1UploadFileProps {
  onNext: (fileUrl: string, fileType: string) => void;
}

const Step1UploadFile = ({ onNext }: Step1UploadFileProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const { startUpload } = useUploadThing("documentUploader");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(null);
    }
  };

  const handleNext = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploaded = await startUpload([selectedFile]);
      
      if (uploaded?.[0]?.url) {
        const fileType = selectedFile.name.split('.').pop()?.toLowerCase() || '';
        onNext(uploaded[0].url, fileType);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("File upload error:", error);
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle className=" px-6 border-b-2 pb-4">
          Upload Resource
        </SheetTitle>
        <SheetDescription className="px-6">
          Easily upload and share educational documents with your students or
          organization.
        </SheetDescription>
      </SheetHeader>
      <div className="mt-4 px-6">
        <div className="flex flex-col gap-2 mt-6 max-w-sm">
          <Label htmlFor="picture">Upload File</Label>
          <Input 
            id="picture" 
            type="file" 
            accept=".pdf,.docx,.txt,.pptx" 
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <p className="text-xs text-gray-500">.pdf, .docx, .txt, .pptx</p>
          {selectedFile && (
            <p className="text-sm text-green-600">
              Selected: {selectedFile.name}
            </p>
          )}
          {uploadError && (
            <p className="text-sm text-red-600">{uploadError}</p>
          )}
        </div>
        <div className="flex mt-4">
          <Button 
            className="bg-primary" 
            onClick={handleNext}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Step1UploadFile;
