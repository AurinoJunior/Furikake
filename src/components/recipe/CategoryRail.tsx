import { RecipeCard } from "@/components/recipe/RecipeCard";
import type { Recipe } from "@/types/recipe";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CategoryRailProps {
	title: string;
	categorySlug: string;
	recipes: Recipe[];
}

export function CategoryRail({ title, categorySlug, recipes }: CategoryRailProps) {
	if (recipes.length === 0) return null;

	return (
		<section className="mb-6">
			<div className="flex items-center justify-between px-6 mb-3">
				<h2 className="font-heading font-bold text-base text-foreground">{title}</h2>
				<Link
					href={`/categories/${categorySlug}`}
					className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-brand transition-colors"
				>
					Ver todos
					<ChevronRight size={14} />
				</Link>
			</div>

			<div className="flex gap-3 overflow-x-auto px-6 pb-1 scrollbar-hide">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.slug} recipe={recipe} />
				))}
			</div>
		</section>
	);
}
