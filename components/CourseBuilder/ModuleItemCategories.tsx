import React from "react";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";

const MODULEITEMCATGORIES = ["lesson", "quiz"];

const ModuleItemCategories = ({
  onAddItem,
  moduleId,
}: {
  onAddItem: (itemType: string) => void;
  moduleId?: string;
}) => {
  const handleClick = (item: string) => {
    onAddItem(item);
  };

  return (
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
            type="button"
            className={`flex items-center gap-2 text-sm border capitalize ${borderColor} p-2 rounded-md ${hoverColor}`}
            onClick={() => handleClick(moduleItem)}
          >
            <IconSquareRoundedPlusFilled className={`w-5 h-5 ${iconColor}`} />
            {moduleItem}
          </button>
        );
      })}
    </div>
  );
};

export default ModuleItemCategories;
