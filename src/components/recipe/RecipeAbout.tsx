"use client";

import { ChevronDown, ChevronUp, Tag } from "lucide-react";
import { useState } from "react";
import { TAG_CONFIG } from "@/consts/tagConfig";

function formatTagLabel(tag: string): string {
	return tag.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

interface RecipeAboutProps {
	description: string;
	tags: string[];
}

export function RecipeAbout({ description, tags }: RecipeAboutProps) {
	const [open, setOpen] = useState(true);

	const knownTags = tags.filter((t) => TAG_CONFIG[t]);

	return (
		<div className="px-6 py-4">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="flex items-center justify-between w-full cursor-pointer"
			>
				<h2 className="font-heading font-bold text-lg text-foreground">
					Sobre a receita
				</h2>
				{open ? (
					<ChevronUp size={20} className="text-muted-foreground" />
				) : (
					<ChevronDown size={20} className="text-muted-foreground" />
				)}
			</button>

			{open && (
				<div className="mt-4 space-y-5">
					<p className="text-sm text-muted-foreground leading-relaxed">
						{description}
					</p>

					{knownTags.length > 0 && (
						<ul className="space-y-4">
							{knownTags.map((tag) => {
								const config = TAG_CONFIG[tag];
								const Icon = config.icon;
								return (
									<li key={tag} className="flex items-start gap-2">
										<div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
											<Icon size={16} className="text-foreground" />
										</div>
										<div>
											<p className="text-sm font-semibold text-foreground">
												{config.label}
											</p>
											<p className="text-xs text-muted-foreground">
												{config.description}
											</p>
										</div>
									</li>
								);
							})}
						</ul>
					)}

					{tags
						.filter((t) => !TAG_CONFIG[t])
						.map((tag) => (
							<li key={tag} className="flex items-start gap-3 list-none">
								<div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
									<Tag size={16} className="text-foreground" />
								</div>
								<div className="flex items-center h-9">
									<p className="text-sm font-semibold text-foreground">
										{formatTagLabel(tag)}
									</p>
								</div>
							</li>
						))}
				</div>
			)}
		</div>
	);
}
