"use client";

import { ChefHat, ChevronDown, ChevronUp, Clock, Tag, Users } from "lucide-react";
import { useState } from "react";

interface RecipeAboutProps {
	description: string;
	category: string;
	time: string;
	difficulty?: string;
	servings: number;
}

export function RecipeAbout({
	description,
	category,
	time,
	difficulty,
	servings,
}: RecipeAboutProps) {
	const [open, setOpen] = useState(true);

	const items = [
		{ icon: Tag, label: "Categoria", value: category },
		{ icon: Clock, label: "Tempo de preparo", value: time },
		...(difficulty ? [{ icon: ChefHat, label: "Dificuldade", value: difficulty }] : []),
		{
			icon: Users,
			label: "Rendimento",
			value: `${servings} ${servings === 1 ? "Pessoa" : "Pessoas"}`,
		},
	];

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

					<ul className="space-y-4">
						{items.map(({ icon: Icon, label, value }) => (
							<li key={label} className="flex items-start gap-2">
								<div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
									<Icon size={16} className="text-foreground" />
								</div>
								<div>
									<p className="text-sm font-semibold text-foreground">{label}</p>
									<p className="text-xs text-muted-foreground">{value}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
