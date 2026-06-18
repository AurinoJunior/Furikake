"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

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
			<h2 className="font-heading font-bold text-lg text-foreground mb-4">
				Ingredientes
			</h2>
			<ul className="space-y-4">
				{ingredients.map((ingredient, i) => (
					<li
						key={ingredient}
						className="flex items-center gap-3 cursor-pointer"
						onClick={() => toggle(i)}
						onKeyDown={() => toggle(i)}
					>
						<Checkbox
							checked={checked.has(i)}
							onCheckedChange={() => toggle(i)}
						/>
						<span
							className={`leading-snug transition-colors ${
								checked.has(i)
									? "text-muted-foreground line-through"
									: "text-foreground"
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
