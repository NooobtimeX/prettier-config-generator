"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import options from "@/lib/options";

type PrettierOptionType = (typeof options)[number];

interface Props {
  option: PrettierOptionType;
  value: string | number | boolean | null;
  onChange: (val: string | number | boolean) => void;
}

export function PrettierOption({ option, value, onChange }: Props) {
  return (
    <Card className="p-4 h-full min-h-[220px] flex flex-col justify-between">
      <div>
        <h3 className="font-bold mb-1">{option.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {option.description}
        </p>
      </div>

      {option.type === "buttons" && Array.isArray(option.options) ? (
        <div className="flex flex-wrap gap-2">
          {option.options.map((o: string | boolean) => (
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
