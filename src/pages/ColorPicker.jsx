import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const colors = [
  "#ffffff", // White
  "#f8d7da", // Light Red
  "#d4edda", // Light Green
  "#cce5ff", // Light Blue
  "#fff3cd", // Light Yellow
  "#e9ecef", // Light Gray
];

export const ColorPicker = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] justify-start text-left font-normal"
        >
          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }}></div>
          {color === "#ffffff" ? "Default" : color}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px]">
        <div className="grid grid-cols-6 gap-2">
          {colors.map((c) => (
            <Button
              key={c}
              className="w-8 h-8 rounded-full p-0"
              style={{ backgroundColor: c }}
              onClick={() => {
                onChange(c);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};