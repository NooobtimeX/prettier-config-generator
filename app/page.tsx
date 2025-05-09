"use client";

import { useState, useEffect } from "react";
import options from "@/lib/options";
import { generateConfig } from "@/lib/generateConfig";
import { Button } from "@/components/ui/button";
import { PrettierOption } from "@/components/PrettierOption";
import { GeneratedModal } from "@/components/GeneratedModal";
import { RotateCcw, FilePlus } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type PrettierOptionKey = (typeof options)[number]["key"];
type SelectedOptions = {
	[key in PrettierOptionKey]: string | number | boolean | string[] | null;
};

export default function PrettierConfigPage() {
	const emptyConfig = Object.fromEntries(
		options.map((opt) => [opt.key, null])
	) as SelectedOptions;

	const [selected, setSelected] = useState<SelectedOptions>(emptyConfig);
	const [showConfig, setShowConfig] = useState(false);
	const [generatedConfig, setGeneratedConfig] = useState("");
	const [showTooltip, setShowTooltip] = useState<boolean | undefined>(
		undefined
	);

	useEffect(() => {
		setShowTooltip(true);
		const timer = setTimeout(() => setShowTooltip(undefined), 5000);
		return () => clearTimeout(timer);
	}, []);

	const handleChange = (
		key: keyof SelectedOptions,
		value: string | number | boolean | string[]
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
			<h1 className="mb-2 text-center text-3xl font-bold">
				Prettier Config Generator
			</h1>
			<p className="text-muted-foreground mb-2 text-center">
				Select options below to generate your <code>.prettierrc</code>{" "}
				configuration file.
			</p>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{options.map((opt) => (
					<PrettierOption
						key={opt.key}
						option={opt}
						value={selected[opt.key]}
						onChange={(val) => handleChange(opt.key, val)}
					/>
				))}
			</div>

			<TooltipProvider>
				<div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3">
					<Tooltip open={showTooltip}>
						<TooltipTrigger asChild>
							<Button
								size="icon"
								variant="default"
								className="h-12 w-12 rounded-full shadow-md"
								onClick={handleGenerate}
								aria-label="Generate Config"
							>
								<FilePlus className="h-5 w-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left" sideOffset={8}>
							Generate Config
						</TooltipContent>
					</Tooltip>

					<Tooltip open={showTooltip}>
						<TooltipTrigger asChild>
							<Button
								size="icon"
								variant="secondary"
								className="h-12 w-12 rounded-full shadow-md"
								onClick={handleReset}
								aria-label="Reset Config"
							>
								<RotateCcw className="h-5 w-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left" sideOffset={8}>
							Reset Selections
						</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>

			<GeneratedModal
				open={showConfig}
				config={generatedConfig}
				onClose={() => setShowConfig(false)}
			/>
		</div>
	);
}
