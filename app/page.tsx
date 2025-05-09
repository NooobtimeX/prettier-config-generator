"use client";

import { useState } from "react";
import options from "@/lib/options";
import { generateConfig } from "@/lib/generateConfig";
import { Button } from "@/components/ui/button";
import { PrettierOption } from "@/components/PrettierOption";
import { GeneratedModal } from "@/components/GeneratedModal";

// Type definition based on options array
type PrettierOptionKey = (typeof options)[number]["key"];
type SelectedOptions = {
  [key in PrettierOptionKey]: string | number | boolean | null;
};

export default function PrettierConfigPage() {
  const emptyConfig = Object.fromEntries(
    options.map((opt) => [opt.key, null])
  ) as SelectedOptions;

  const [selected, setSelected] = useState<SelectedOptions>(emptyConfig);
  const [showConfig, setShowConfig] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState("");

  const handleChange = (
    key: keyof SelectedOptions,
    value: string | number | boolean | null
  ) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    const config = generateConfig(selected);
    setGeneratedConfig(config);
    setShowConfig(true);
  };

  const handleReset = () => {
    setSelected(emptyConfig);
    setGeneratedConfig("");
    setShowConfig(false);
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-2">
        Prettier Config Generator
      </h1>
      <p className="text-muted-foreground mb-2 text-center">
        Select options below to generate your <code>.prettierrc</code>{" "}
        configuration file.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {options.map((opt) => (
          <PrettierOption
            key={opt.key}
            option={opt}
            value={selected[opt.key]}
            onChange={(val) => handleChange(opt.key, val)}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Button size="lg" className="text-white" onClick={handleGenerate}>
          Generate Config
        </Button>
        <Button size="lg" variant="secondary" onClick={handleReset}>
          Generate New
        </Button>
      </div>

      <GeneratedModal
        open={showConfig}
        config={generatedConfig}
        onClose={() => setShowConfig(false)}
      />
    </div>
  );
}
