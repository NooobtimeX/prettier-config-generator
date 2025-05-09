"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ThemeChanger from "@/components/ButtonThemeChanger";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header() {
	const [showTooltip, setShowTooltip] = useState<boolean | undefined>(
		undefined
	);

	// Manage tooltip visibility with useEffect
	useEffect(() => {
		setShowTooltip(true);
		const timer = setTimeout(() => setShowTooltip(undefined), 5000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<header
			className={cn(
				"border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
			)}
		>
			<div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
				{/* Logo and Title */}
				<Link href="/" className="flex items-center space-x-3">
					<Image
						src="/favicon.ico"
						alt="Prettier Config Generator Logo"
						width={32}
						height={32}
						className="h-8 w-8 rounded-md"
					/>
					<span className="text-xl font-semibold tracking-tight">
						Prettier Config Generator
					</span>
				</Link>

				{/* Right-side Actions */}
				<div className="flex items-center gap-4">
					<TooltipProvider>
						<Tooltip open={showTooltip}>
							<TooltipTrigger asChild>
								<div>
									<ThemeChanger />
								</div>
							</TooltipTrigger>
							<TooltipContent side="bottom" sideOffset={8}>
								Toggle Theme
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</header>
	);
}
