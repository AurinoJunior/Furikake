import Link from "next/link";
import { RecipeImage } from "@/components/recipe/RecipeImage";
import type { Recipe } from "@/types/recipe";

interface SearchResultCardProps {
	recipe: Recipe;
}

export function SearchResultCard({ recipe }: SearchResultCardProps) {
	return (
		<Link
			href={`/recipes/${recipe.slug}`}
			className="flex h-30 rounded-[20px] overflow-hidden bg-white shadow-[0_4px_4px_rgba(0,0,0,0.10)] group"
		>
			<div className="relative w-33.5 shrink-0">
				<RecipeImage
					src={recipe.image}
					alt={recipe.title}
					sizes="134px"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			<div className="flex-1 flex flex-col justify-between p-5 min-w-0">
				<div>
					<p className="text-xs text-muted-foreground uppercase mb-2">
						{recipe.category}
					</p>
					<h3 className="text-base text-foreground leading-tight line-clamp-2">
						{recipe.title}
					</h3>
				</div>
				<p className="text-xs font-semibold text-muted-foreground">
					{recipe.time}
				</p>
			</div>
		</Link>
	);
}
