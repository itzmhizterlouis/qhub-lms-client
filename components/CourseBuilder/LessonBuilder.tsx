"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { IconLink, IconX } from "@tabler/icons-react";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";
import { Lesson, Module, LessonInput } from "@/lib/types";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useCourses } from "@/hooks/useCourses";
import { useUploadThing } from "@/utils/uploadthing";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const LessonBuilder = ({
  module,
  setModules,
  propLesson,
  moduleId,
}: {
  module: Module;
  setModules: React.Dispatch<React.SetStateAction<Module[]>>;
  propLesson?: Lesson;
  moduleId: string;
}) => {
  const [featuredImage, setFeaturedImage] = useState<string | null>(
    propLesson?.featuredImage || ""
  );
  const [lessonVideo, setLessonVideo] = useState<string | null>(
    propLesson?.video || ""
  );
  const [attachments, setAttachments] = useState<File[]>(
    propLesson?.exerciseFiles || []
  );
  const [lesson, setLesson] = useState<Lesson>({
    id: propLesson?.id || "",
    name: propLesson?.name || "",
    content: propLesson?.content || "",
    featuredImage: propLesson?.featuredImage || "",
    video: propLesson?.video || "",
    exerciseFiles: propLesson?.exerciseFiles || []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createLesson, addLessonLoading } = useCourses();
  const { startUpload } = useUploadThing("documentUploader");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachments((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLesson((prev) => ({ ...prev, [id]: value }));
  };

  const handleQuillChange = (value: string) => {
    setLesson((prev) => ({ ...prev, content: value }));
  };

  const removeAttachment = (fileToRemove: File) => {
    setAttachments((prev) =>
      prev.filter((file) => file.name !== fileToRemove.name)
    );
  };

  const uploadAttachments = async (files: File[]): Promise<string> => {
    if (files.length === 0) return "";
    
    try {
      const uploaded = await startUpload(files);
      if (uploaded && uploaded.length > 0) {
        // Return the first file URL as the extra resources URL
        return uploaded[0].url;
      }
      return "";
    } catch (error) {
      console.error("Error uploading attachments:", error);
      return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if moduleId is a valid MongoDB ID
      if (!moduleId || moduleId.startsWith('temp-')) {
        toast.error("Please save the module first before creating lessons");
        setIsSubmitting(false);
        return;
      }

      // Upload attachments if any
      const extraResourcesUrl = await uploadAttachments(attachments);

      // Create lesson input
      const lessonInput: LessonInput = {
        contentUrl: lesson.content, // Using content as contentUrl
        extraResourcesUrl: extraResourcesUrl || "nothing",
        imageUrl: featuredImage || "",
        index: module.lessons?.length || 0, // Use current lessons count as index
        moduleId: moduleId,
        name: lesson.name,
        videoUrl: lessonVideo || "",
      };

      // Create lesson via API
      const result = await createLesson(lessonInput);

      if (result?._id) {
        const newLesson = {
          ...lesson,
          _id: result._id,
          featuredImage: featuredImage!,
          video: lessonVideo!,
          exerciseFiles: attachments,
        };

        if (propLesson) {
          setModules((prev) =>
            prev.map((prevModule) =>
              prevModule.id === module.id
                ? {
                    ...module,
                    lessons: prevModule.lessons?.map((l) =>
                      l.id === lesson.id ? newLesson : l
                    ),
                  }
                : module
            )
          );
        } else {
          setModules((prev) =>
            prev.map((prevModule) =>
              prevModule.id === module.id
                ? { ...module, lessons: [...(module.lessons || []), newLesson] }
                : module
            )
          );
        }

        toast.success("Lesson created successfully!");
        console.log("Lesson created:", result);
      }
    } catch (error: any) {
      console.error("Error creating lesson:", error);
      if (error.message?.includes("authentication") || error.message?.includes("log in")) {
        toast.error("Authentication failed. Please log in again.");
        // You might want to redirect to login here
      } else {
        toast.error("Failed to create lesson");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="name">Lesson Name</Label>
        <Input
          id="name"
          className="col-span-3"
          onChange={handleChange}
          value={lesson.name}
          required
        />
      </div>
      <div className="grid gap-2 mt-4">
        <Label htmlFor="lessonContent">Lesson Content</Label>
        <ReactQuill
          theme="snow"
          value={lesson.content}
          onChange={handleQuillChange}
          className="rounded-md shadow-sm"
          style={{
            resize: "vertical",
            minHeight: "150px",
            height: "150px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        />
      </div>
      <div className="grid gap-2 mt-4">
        <Label htmlFor="video">Lesson Video</Label>
        <VideoUpload
          className="h-[180px]"
          file={lessonVideo}
          setFile={setLessonVideo}
        />
      </div>
      <div className="grid gap-2 mt-4">
        <Label htmlFor="featuredImage">Featured Image</Label>
        <ImageUpload
          className="h-[180px]"
          file={featuredImage}
          setFile={setFeaturedImage}
        />
      </div>

      <div className="grid gap-2 mt-4 w-[50%]">
        <Label htmlFor="lessonResources">Extra Lesson Resources</Label>
        <Button variant={"outline"} type="button">
          <label
            htmlFor="attachments"
            className="cursor-pointer flex items-center gap-2"
          >
            <IconLink className="w-5 h-5" />
            Upload Attachments
          </label>
          <input
            id="attachments"
            type="file"
            accept="*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </Button>
      </div>

      {attachments.length > 0 && (
        <div className="mt-4 space-y-2">
          <Label>Uploaded Files</Label>
          <div className="flex flex-wrap gap-4">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md shadow-md"
              >
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => removeAttachment(file)}
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <DialogFooter className="flex !justify-between w-full mt-4 flex-row">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button 
            className="bg-primary hover:bg-primary/90" 
            type="submit"
            disabled={addLessonLoading || isSubmitting}
          >
            {addLessonLoading || isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Lesson"
            )}
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};

export default LessonBuilder;
