"use client";
import React, { useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import ModuleItem from "./ModuleItem";
import { Accordion } from "@/components/ui/accordion";
import LessonBuilder from "./LessonBuilder";
import { Lesson, Module } from "@/lib/types";
import { useCourses } from "@/hooks/useCourses";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import QuizBuilder from "../QuizBuilder";

interface ModuleBuilderProps {
  modules: any[];
  setModules: (modules: any[]) => void;
  courseId: string;
  onDeleteModule: (moduleId: string) => void;
}

const ModuleBuilder = ({
  modules,
  setModules,
  courseId,
  onDeleteModule
}: ModuleBuilderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);
  const [newModule, setNewModule] = useState({
    id: "",
    name: "",
    summary: "",
    lessons: [],
    quizzes: [],
  });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | undefined>(undefined);
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<string>("");

  const { createCourseModule, addModuleLoading } = useCourses();

  const handleUpdateModule = async () => {
    if (activeModuleIndex !== null) {
      // Update existing module
      const updatedModules = modules.map((mod, idx) => 
        idx === activeModuleIndex ? newModule : mod
      );
      setModules(updatedModules);
      resetModuleState();
    } else {
      // Create new module via API
      try {
        const courseModuleInput = {
          courseId,
          name: newModule.name,
          summary: newModule.summary || ""
        };

        const result = await createCourseModule(courseModuleInput);
        
        if (result?._id) {
          const createdModule = {
            ...newModule,
            id: result._id,
            _id: result._id
          };
          
          setModules([...modules, createdModule]);
          toast.success("Module created successfully!");
        } else {
          toast.error("Failed to create module");
        }
      } catch (error: any) {
        console.error("Error creating module:", error);
        if (error.message?.includes("authentication") || error.message?.includes("log in")) {
          toast.error("Authentication failed. Please log in again.");
        } else {
          toast.error("Failed to create module");
        }
      }
      resetModuleState();
    }
  };

  const resetModuleState = () => {
    setActiveModuleIndex(null);
    setNewModule({
      id: "",
      name: "",
      summary: "",
      lessons: [],
      quizzes: [],
    });
    setIsOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setNewModule(prev => ({ ...prev, [id]: value }));
  };

  const handleEditModule = (index: number) => {
    setActiveModuleIndex(index);
    setNewModule(modules[index]);
    setIsOpen(true);
  };

  const handleAddItem = (moduleId: string, itemType: string) => {
    setCurrentModuleId(moduleId);
    setSelectedItem(itemType);
    
    if (itemType === "lesson") {
      setIsLessonDialogOpen(true);
    } else if (itemType === "quiz") {
      setIsQuizDialogOpen(true);
    }
  };



  return (
    <div className="p-6 h-full">
      {modules.length === 0 ? (
        <p>No modules created yet</p>
      ) : (
        <Accordion type="single" collapsible className="grid gap-4">
          {modules.map((module, index) => (
            <ModuleItem
              key={module.id}
              module={module}
              moduleIndex={index}
              onEdit={() => handleEditModule(index)}
              onDelete={() => onDeleteModule(module.id)}
              onAddItem={(itemType) => handleAddItem(module.id, itemType)}
            />
          ))}
        </Accordion>
      )}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4 flex items-center gap-2">
            <IconCirclePlus className="w-5 h-5" />
            Add New Module
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {activeModuleIndex !== null ? "Edit Module" : "Create Module"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Label htmlFor="name">Module Name *</Label>
            <Input
              id="name"
              value={newModule.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="summary">Module Summary</Label>
            <Textarea
              id="summary"
              value={newModule.summary}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateModule}
              disabled={!newModule.name.trim() || addModuleLoading}
            >
              {addModuleLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                activeModuleIndex !== null ? "Update" : "Create"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lesson Dialog */}
      <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Lesson</DialogTitle>
          </DialogHeader>
          <LessonBuilder
            module={modules.find(m => m.id === currentModuleId) || { id: "", lessons: [] }}
            setModules={setModules}
            propLesson={activeLesson}
            moduleId={currentModuleId}
            modules={modules}
          />
        </DialogContent>
      </Dialog>

      {/* Quiz Dialog */}
      <Dialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Quiz</DialogTitle>
          </DialogHeader>
          <QuizBuilder
            module={modules.find(m => m.id === currentModuleId) || { id: "", quizzes: [] }}
            setModules={setModules}
            propQuiz={undefined}
            modules={modules}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleBuilder;