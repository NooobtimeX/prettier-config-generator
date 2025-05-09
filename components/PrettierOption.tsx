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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Info } from "lucide-react";
import { PrettierOptionType } from "@/interface/PrettierOptionType";

interface Props {
	option: PrettierOptionType;
	value: string | number | boolean | string[] | null;
	onChange: (val: string | number | boolean | string[]) => void;
}

export function PrettierOption({ option, value, onChange }: Props) {
	const [open, setOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const selectedValues = Array.isArray(value) ? value : [];
	const selectedCount = selectedValues.length;

	const handleToggle = (item: string) => {
		onChange(
			selectedValues.includes(item) ?
				selectedValues.filter((v) => v !== item)
			:	[...selectedValues, item]
		);
	};

	const allOptions =
		Array.isArray(option.options) && option.options.length > 0 ?
			option.options
		:	[];

	const filteredOptions = allOptions.filter((item) =>
		item.toString().toLowerCase().includes(searchTerm.toLowerCase())
	);

	const selectAll = () => onChange(allOptions.map((v) => v.toString()));
	const unselectAll = () => onChange([]);

	const MultiSelectContent = (
		<div className="space-y-4">
			<div className="flex justify-end gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={selectAll}
					aria-label="Select All"
				>
					Select All
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={unselectAll}
					aria-label="Unselect All"
				>
					Unselect All
				</Button>
			</div>

			<Input
				type="text"
				placeholder="Search options..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="w-full"
			/>

			<div className="grid max-h-[300px] grid-cols-1 gap-2 overflow-y-auto">
				{filteredOptions.map((item) => {
					const stringVal = item.toString();
					const isSelected = selectedValues.includes(stringVal);
					return (
						<Button
							key={stringVal}
							variant={isSelected ? "default" : "outline"}
							onClick={() => handleToggle(stringVal)}
							className="justify-between"
							aria-label={stringVal}
						>
							{stringVal}
							{isSelected && <Check className="h-4 w-4" />}
						</Button>
					);
				})}
				{filteredOptions.length === 0 && (
					<p className="text-muted-foreground text-center text-sm">
						No matches found
					</p>
				)}
			</div>
		</div>
	);

	return (
		<TooltipProvider>
			<Card className="relative flex h-full min-h-[100px] flex-col justify-between p-4">
				{option.recommend && (
					<div className="absolute top-2 right-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="text-muted-foreground hover:text-foreground h-6 w-6"
									aria-label="Recommended"
								>
									<Info className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="left" className="max-w-xs text-sm">
								{option.recommend}
							</TooltipContent>
						</Tooltip>
					</div>
				)}

				<div>
					<h2 className="mb-1 text-center font-bold">{option.name}</h2>
					<p className="text-muted-foreground mb-2 text-center text-sm">
						{option.description}
					</p>

					{option.since && (
						<div className="flex justify-center">
							<Badge variant="destructive">Since Prettier {option.since}</Badge>
						</div>
					)}
				</div>

				{/* Render based on type */}
				{option.type === "select" ?
					<Select
						value={value?.toString() ?? ""}
						onValueChange={(val) => onChange(val)}
						aria-label={`Select ${option.name}`}
					>
						<SelectTrigger
							className="w-full"
							aria-label={`Select ${option.name}`}
						>
							<SelectValue placeholder="Select an option" />
						</SelectTrigger>
						<SelectContent>
							{allOptions.map((o) => (
								<SelectItem key={o.toString()} value={o.toString()}>
									{o.toString()}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				: option.type === "buttons" ?
					<div className="flex flex-wrap gap-2">
						{allOptions.map((o) => (
							<Button
								key={o.toString()}
								variant={value === o ? "default" : "outline"}
								onClick={() => onChange(o)}
								className="flex-1"
								aria-label={o.toString()}
							>
								{o.toString()}
							</Button>
						))}
					</div>
				: option.type === "multiselect" ?
					<>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => setOpen(true)}
							aria-label={`Select ${option.name}`}
						>
							{selectedCount > 0 ?
								`${selectedCount} selected`
							:	"Select options"}
						</Button>

						{isMobile ?
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
						:	<Dialog open={open} onOpenChange={setOpen}>
								<DialogContent>
									<DialogHeader>
										<DialogTitle className="text-center">
											{option.name}
										</DialogTitle>
									</DialogHeader>
									{MultiSelectContent}
								</DialogContent>
							</Dialog>
						}
					</>
				:	<Input
						type={option.validate === "integer" ? "number" : "text"}
						value={value?.toString() ?? ""}
						onChange={(e) =>
							onChange(
								option.validate === "integer" ?
									parseInt(e.target.value || "0", 10)
								:	e.target.value
							)
						}
						placeholder="Enter value"
					/>
				}
			</Card>
		</TooltipProvider>
	);
}
