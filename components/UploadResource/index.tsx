"use client";
import React, { useState } from "react";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import { IconFilePlus } from "@tabler/icons-react";
import { Button } from "../ui/button";
import Step1UploadFile from "./Step1UploadFile";
import Step2ResourceInfo from "./Step2ResourceInfo";
import Cookies from "js-cookie";

const UploadResource = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const organizationId = Cookies.get('organizationId');

  const handleNextStep = (uploadedFileUrl?: string, uploadedFileType?: string) => {
    if (uploadedFileUrl && uploadedFileType) {
      setFileUrl(uploadedFileUrl);
      setFileType(uploadedFileType);
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => setCurrentStep((prev) => prev - 1);

  const handleSuccess = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setFileUrl("");
    setFileType("");
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setCurrentStep(1);
      setFileUrl("");
      setFileType("");
    }
  };

  if (!organizationId) {
    return (
      <Button className="bg-primary w-fit max-lg:mt-2 text-white hover:bg-primary/90" disabled type="button">
        <IconFilePlus className="inline mr-2 w-5 h-5" />
        Upload Resource
      </Button>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button className="bg-primary w-fit max-lg:mt-2 text-white hover:bg-primary/90" type="button">
          <IconFilePlus className="inline mr-2 w-5 h-5" />
          Upload Resource
        </Button>
      </SheetTrigger>
      <SheetContent className="px-0 py-4">
        {currentStep === 1 && <Step1UploadFile onNext={handleNextStep} />}
        {currentStep === 2 && (
          <Step2ResourceInfo 
            onBack={handlePreviousStep} 
            fileUrl={fileUrl}
            fileType={fileType}
            organizationId={organizationId}
            onSuccess={handleSuccess}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default UploadResource;
