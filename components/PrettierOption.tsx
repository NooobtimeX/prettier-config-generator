"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import options from "@/lib/options";

type PrettierOptionType = (typeof options)[number];

interface Props {
  option: PrettierOptionType;
  value: string | number | boolean | string[] | null;
  onChange: (val: string | number | boolean | string[]) => void;
}

export function PrettierOption({ option, value, onChange }: Props) {
  return (
    <Card className="p-4 h-full min-h-[100px] flex flex-col justify-between">
      <div>
        <h3 className="font-bold mb-1 text-center">{option.name}</h3>
        <p className="text-sm text-muted-foreground mb-2 text-center">
          {option.description}
        </p>
      </div>

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
        <div className="flex flex-wrap gap-2">
          {(option.options as string[]).map((o) => {
            const selectedValues = Array.isArray(value) ? value : [];
            const isSelected = selectedValues.includes(o);
            const newValue = isSelected
              ? selectedValues.filter((v) => v !== o)
              : [...selectedValues, o];

            return (
              <Button
                key={o}
                variant={isSelected ? "default" : "outline"}
                onClick={() => onChange(newValue)}
                className="flex-1"
              >
                {o}
              </Button>
            );
          })}
        </div>
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
