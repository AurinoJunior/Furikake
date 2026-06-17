"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface IngredientListProps {
	ingredients: string[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
	const [checked, setChecked] = useState<Set<number>>(new Set());

	const toggle = (i: number) => {
		setChecked((prev) => {
			const next = new Set(prev);
			if (next.has(i)) {
				next.delete(i);
			} else {
				next.add(i);
			}
			return next;
		});
	};

	return (
		<section className="px-6 py-5">
			<h2 className="font-heading font-bold text-lg text-foreground mb-4">Ingredientes</h2>
			<ul className="space-y-3">
				{ingredients.map((ingredient, i) => (
					<li
						key={ingredient}
						className="flex items-start gap-3 cursor-pointer"
						onClick={() => toggle(i)}
					>
						<Checkbox
							checked={checked.has(i)}
							onCheckedChange={() => toggle(i)}
							className="mt-0.5 flex-shrink-0"
						/>
						<span
							className={`text-sm leading-snug transition-colors ${
								checked.has(i) ? "text-muted-foreground line-through" : "text-foreground"
							}`}
						>
							{ingredient}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
