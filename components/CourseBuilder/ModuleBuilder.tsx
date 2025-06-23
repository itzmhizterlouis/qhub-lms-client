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
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import ModuleItem from "./ModuleItem";
import { Accordion } from "@/components/ui/accordion";

interface ModuleBuilderProps {
  modules: any[];
  setModules: React.Dispatch<React.SetStateAction<any[]>>;
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
    id: uuidv4(),
    name: "",
    summary: "",
    lessons: [],
    quizzes: [],
  });

  const handleUpdateModule = () => {
    if (activeModuleIndex !== null) {
      setModules(prev => 
        prev.map((mod, idx) => 
          idx === activeModuleIndex ? newModule : mod
        )
      );
    } else {
      setModules([...modules, newModule]);
    }
    resetModuleState();
  };

  const resetModuleState = () => {
    setActiveModuleIndex(null);
    setNewModule({
      id: uuidv4(),
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
              disabled={!newModule.name.trim()}
            >
              {activeModuleIndex !== null ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleBuilder;