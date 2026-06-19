import Link from "next/link";
import { RecipeImage } from "@/components/recipe/RecipeImage";
import type { Recipe } from "@/types/recipe";

interface SuggestionHeroCardProps {
	recipe: Recipe;
}

export function SuggestionHeroCard({ recipe }: SuggestionHeroCardProps) {
	return (
		<Link
			href={`/recipes/${recipe.slug}`}
			className="block relative w-full h-55 rounded-[20px] overflow-hidden group"
		>
			<RecipeImage
				src={recipe.image}
				alt={recipe.title}
				sizes="100vw"
				className="object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
			<div className="absolute inset-0 flex items-center justify-center p-5">
				<h2 className="font-heading font-bold text-2xl text-white leading-tight line-clamp-2 text-center">
					{recipe.title}
				</h2>
			</div>
		</Link>
	);
}
