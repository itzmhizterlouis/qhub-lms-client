import React, { useState } from "react";
import { Module } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  IconEdit,
  IconSquareRoundedPlusFilled,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import LessonBuilder from "./LessonBuilder";

const MODULEITEMCATGORIES = ["lesson", "quiz"];

const ModuleItem = ({ module }: { module: Module }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex justify-between w-full">
              <p className="text-lg flex gap-2 items-center capitalize">
                <span className="text-base text-gray-700">Module 1:</span>
                {module.name}
              </p>
              <div className="flex items-center gap-2 text-gray-500">
                <IconEdit className="w-4 h-4 hover:text-gray-600" />
                <IconTrash className="w-4 h-4 hover:text-gray-600" />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2 items-center">
              {MODULEITEMCATGORIES.map((moduleItem, index) => {
                let borderColor = "border-primary";
                let hoverColor = "hover:bg-primary/10";
                let iconColor = "text-primary";
                if (moduleItem === "lesson") {
                  borderColor = "border-primary";
                  iconColor = "text-primary";
                  hoverColor = "hover:bg-primary/10";
                } else if (moduleItem === "quiz") {
                  borderColor = "border-green-500";
                  iconColor = "text-green-500";
                  hoverColor = "hover:bg-green-500/10";
                } else if (moduleItem === "task") {
                  borderColor = "border-red-500";
                  iconColor = "text-red-500";
                  hoverColor = "hover:bg-red-500/10";
                }

                return (
                  <button
                    key={index}
                    className={`flex items-center gap-2 border capitalize ${borderColor} p-2 rounded-md ${hoverColor}`}
                    onClick={() => {
                      setSelectedItem(moduleItem);
                      setIsDialogOpen(true);
                    }}
                  >
                    <IconSquareRoundedPlusFilled
                      className={`w-5 h-5 ${iconColor}`}
                    />
                    {moduleItem}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-h-[90vh] flex flex-col overflow-hidden"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="capitalize">
              {selectedItem ? selectedItem : "Item"}
            </DialogTitle>
          </DialogHeader>
          {selectedItem === "lesson" && <LessonBuilder />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModuleItem;
