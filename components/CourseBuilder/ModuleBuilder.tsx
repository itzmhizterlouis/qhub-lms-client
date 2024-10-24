"use client";
import React, { useState, useRef } from "react";
import { IconCirclePlus, IconInfoCircle } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Module } from "@/lib/types";
import ModuleItem from "./ModuleItem";
const ModuleBuilder = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [moduleName, setModuleName] = useState("");
  const [moduleSummary, setModuleSummary] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "moduleName") {
      setModuleName(value);
    } else if (id === "moduleSummary") {
      setModuleSummary(value);
    }
  };
  const handleAddModule = () => {
    setModules([
      ...modules,
      { name: moduleName, summary: moduleSummary, id: uuidv4() },
    ]);
    setModuleName("");
    setModuleSummary("");
  };
  return (
    <div className="p-6">
      {modules.length === 0 ? (
        <p>No module created yet</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {modules.map((module, index) => {
            return <ModuleItem key={index} module={module} />;
          })}
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-primary mt-2 text-white text-sm px-4 p-2 rounded-md flex items-center ">
            <IconCirclePlus className="inline mr-2 w-5 h-5" />
            Add New Module
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add Module</DialogTitle>
            <DialogDescription>
              Add the fist module for the course
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Label htmlFor="moduleName">Module Name</Label>
            <Input id="moduleName" className="col-span-3" />
            <p className="mt-1 flex items-center gap-2 text-gray-500 text-sm">
              <IconInfoCircle className="w-5 h-5" />
              Module titles are displayed publicly wherever required. Each
              module may contain one or more lessons, quiz and tasks.
            </p>
          </div>
          <div className="grid gap-4 mt-4">
            <Label htmlFor="moduleSummary">Module Summary</Label>
            <Textarea
              placeholder="Type summary here."
              id="moduleSummary"
              rows={4}
            />
            <p className="mt-1 flex items-center gap-2 text-gray-500 text-sm">
              <IconInfoCircle className="w-5 h-5" />
              Add a summary of short text to prepare students for the activities
              for the topic. The text is shown on the course page beside the
              tooltip beside the module name.
            </p>
          </div>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="bg-primary hover:bg-primary/90">
              Add Module
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleBuilder;
