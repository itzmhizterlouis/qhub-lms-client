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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { useResources } from "@/hooks/useResources";
import { ResourceInput } from "@/lib/types";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface Step2ResourceInfoProps {
  onBack: () => void;
  fileUrl: string;
  fileType: string;
  onSuccess?: () => void;
}

const Step2ResourceInfo = ({ 
  onBack, 
  fileUrl, 
  fileType,
  onSuccess 
}: Step2ResourceInfoProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    author: "",
    estimatedHours: "",
    estimatedMinutes: "",
  });

  const { createResource, addLoading } = useResources();
  const organizationId = Cookies.get('organizationId');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, fileType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.author) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!organizationId) {
      toast.error("Organization not found");
      return;
    }

    try {
      const resourceInput: ResourceInput = {
        name: formData.name,
        description: formData.description,
        author: formData.author,
        fileType: formData.fileType || fileType,
        fileUrl: fileUrl,
        organizationId: organizationId,
      };

      await createResource(resourceInput);
      toast.success("Resource created successfully!");
      onSuccess?.();
    } catch (error) {
      console.error("Error creating resource:", error);
      toast.error("Failed to create resource. Please try again.");
    }
  };

  return (
    <>
      <SheetHeader className="  ">
        <SheetTitle className=" px-6 border-b-2 pb-4">
          Resource Information
        </SheetTitle>
        <SheetDescription className="px-6">
          Input author, title, and description for your resource.
        </SheetDescription>
      </SheetHeader>
      <div className="mt-4 px-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name *
            </Label>
            <Input 
              type="text" 
              id="name" 
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-4 ">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              placeholder="Type your description here."
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="author" className="text-sm font-medium">
              Author *
            </Label>
            <Input 
              type="text" 
              id="author" 
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2 grid-cols-2 place-content-center ">
            <div className="flex flex-col gap-2">
              <Label>Estimated Duration</Label>
              <div className="flex gap-4">
                <div>
                  <Input
                    id="estimatedHours"
                    className="col-span-3"
                    type="number"
                    placeholder="0"
                    value={formData.estimatedHours}
                    onChange={handleInputChange}
                  />
                  <Label
                    htmlFor="estimatedHours"
                    className="mt-1 text-xs text-gray-400"
                  >
                    Hrs
                  </Label>
                </div>
                <div>
                  <Input
                    id="estimatedMinutes"
                    className="col-span-3"
                    type="number"
                    placeholder="0"
                    value={formData.estimatedMinutes}
                    onChange={handleInputChange}
                  />
                  <Label
                    htmlFor="estimatedMinutes"
                    className="mt-1 text-xs text-gray-400"
                  >
                    Mins
                  </Label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="fileType">File Type</Label>
              <Select value={formData.fileType || fileType} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={fileType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">.pdf</SelectItem>
                  <SelectItem value="pptx">.pptx</SelectItem>
                  <SelectItem value="txt">.txt</SelectItem>
                  <SelectItem value="docx">.docx</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full gap-2 flex items-center">
            <Button 
              variant={"outline"} 
              onClick={onBack}
              type="button"
              disabled={addLoading}
            >
              Go back
            </Button>
            <Button 
              variant={"default"} 
              className="bg-primary"
              type="submit"
              disabled={addLoading}
            >
              {addLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Step2ResourceInfo;
