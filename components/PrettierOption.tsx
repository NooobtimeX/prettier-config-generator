"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PrettierOption({
  option,
  value,
  onChange,
}: {
  option: any;
  value: any;
  onChange: (val: any) => void;
}) {
  return (
    <Card className="p-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="font-bold mb-1">{option.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {option.description}
        </p>
      </div>

      {option.type === "buttons" ? (
        <div className="flex flex-wrap gap-2">
          {option.options.map((o: any) => (
            <Button
              key={o}
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
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter value"
        />
      )}
    </Card>
  );
}
