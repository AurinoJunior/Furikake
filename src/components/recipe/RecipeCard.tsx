import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import { RecipeImage } from "@/components/recipe/RecipeImage";

interface RecipeCardProps {
	recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
	const meta = [recipe.time, recipe.difficulty].filter(Boolean).join(" • ");

	return (
		<Link href={`/recipes/${recipe.slug}`} className="shrink-0 w-40 group">
			<div className="relative w-40 h-51 rounded-2xl overflow-hidden">
				<RecipeImage
					src={recipe.image}
					alt={recipe.title}
					sizes="160px"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-3">
					<h3 className="font-heading font-bold text-lg text-white leading-tight line-clamp-2">
						{recipe.title}
					</h3>
					{meta && <p className="text-xs text-white/75 mt-1">{meta}</p>}
				</div>
			</div>
		</Link>
	);
}
