"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Check } from "lucide-react";
import options from "@/lib/options";

type PrettierOptionType = (typeof options)[number];

interface Props {
  option: PrettierOptionType;
  value: string | number | boolean | string[] | null;
  onChange: (val: string | number | boolean | string[]) => void;
}

export function PrettierOption({ option, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // detect viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // utility: current selected array
  const selectedValues = Array.isArray(value) ? (value as string[]) : [];
  const selectedCount = selectedValues.length;

  // toggle a single plugin
  const handleToggle = (item: string) => {
    onChange(
      selectedValues.includes(item)
        ? selectedValues.filter((v) => v !== item)
        : [...selectedValues, item]
    );
  };

  // all possible plugins (guaranteed string[] when multiselect)
  const allOptions = Array.isArray(option.options)
    ? (option.options as string[])
    : [];

  const selectAll = () => onChange(allOptions);
  const unselectAll = () => onChange([]);

  // only render this if options is a non-empty string[]
  const MultiSelectContent =
    allOptions.length > 0 ? (
      <div className="space-y-4">
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={unselectAll}>
            Unselect All
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {allOptions.map((item) => {
            const isSelected = selectedValues.includes(item);
            return (
              <Button
                key={item}
                variant={isSelected ? "default" : "outline"}
                onClick={() => handleToggle(item)}
                className="justify-between"
              >
                {item}
                {isSelected && <Check className="h-4 w-4" />}
              </Button>
            );
          })}
        </div>
      </div>
    ) : null;

  return (
    <Card className="p-4 h-full min-h-[100px] flex flex-col justify-between">
      <div>
        <h3 className="font-bold mb-1 text-center">{option.name}</h3>
        <p className="text-sm text-muted-foreground mb-2 text-center">
          {option.description}
        </p>
      </div>

      {/* simple buttons */}
      {option.type === "buttons" && Array.isArray(option.options) ? (
        <div className="flex flex-wrap gap-2">
          {(option.options as (string | boolean)[]).map((o) => (
            <Button
              key={o.toString()}
              variant={value === o ? "default" : "outline"}
              onClick={() => onChange(o)}
              className="flex-1"
            >
              {o.toString()}
            </Button>
          ))}
        </div>
      ) : option.type === "multiselect" && Array.isArray(option.options) ? (
        <>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpen(true)}
          >
            {selectedCount > 0 ? `${selectedCount} selected` : "Select options"}
          </Button>

          {isMobile ? (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="text-center">
                    {option.name}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="p-4">{MultiSelectContent}</div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    {option.name}
                  </DialogTitle>
                </DialogHeader>
                {MultiSelectContent}
              </DialogContent>
            </Dialog>
          )}
        </>
      ) : (
        <Input
          type="text"
          value={value?.toString() ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter value"
        />
      )}
    </Card>
  );
}
