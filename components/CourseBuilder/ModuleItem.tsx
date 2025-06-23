import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ModuleItemCategories from "./ModuleItemCategories";

interface ModuleItemProps {
  module: any;
  moduleIndex: number;
  onEdit: () => void;
  onDelete: () => void;
}

const ModuleItem = ({
  module,
  moduleIndex,
  onEdit,
  onDelete
}: ModuleItemProps) => {
  return (
    <AccordionItem
      value={`module-${moduleIndex}`}
      className="bg-gray-200 rounded-md p-4 py-0"
    >
      <AccordionTrigger className="hover:no-underline">
        <div className="flex justify-between w-full">
          <p className="text-lg flex gap-2 items-center capitalize">
            <span className="text-base text-gray-700">
              Module {moduleIndex + 1}:
            </span>
            {module.name}
          </p>
          <div className="flex items-center gap-2 text-gray-500">
            <IconEdit
              className="w-4 h-4 hover:text-gray-600"
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
            />
            <IconTrash
              className="w-4 h-4 hover:text-gray-600"
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {module.lessons && module.lessons.length > 0 && (
          <div className="my-2 flex flex-col gap-2">
            {module.lessons.map((lesson: any, index: number) => (
              <div key={index} className="bg-white rounded-md p-3 flex items-center justify-between">
                <h2 className="">
                  Lesson {index + 1}: <b className="capitalize">{lesson.name}</b>
                </h2>
              </div>
            ))}
          </div>
        )}
        {module.quizzes && module.quizzes.length > 0 && (
          <div className="my-2 flex flex-col gap-2">
            {module.quizzes.map((quiz: any, index: number) => (
              <div key={index} className="bg-white border border-green-500 rounded-md p-3 flex items-center justify-between">
                <h2 className="">
                  Quiz {index + 1}: <b className="capitalize">{quiz.name}</b>
                </h2>
              </div>
            ))}
          </div>
        )}
        <ModuleItemCategories />
      </AccordionContent>
    </AccordionItem>
  );
};

export default ModuleItem;