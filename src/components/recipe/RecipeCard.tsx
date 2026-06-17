import type { Recipe } from "@/types/recipe";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
	recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
	return (
		<Link href={`/recipes/${recipe.slug}`} className="flex-shrink-0 w-40 group">
			<div className="relative w-40 h-44 rounded-2xl overflow-hidden mb-2">
				<Image
					src={recipe.image}
					alt={recipe.title}
					fill
					sizes="160px"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
					unoptimized
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
			</div>
			<h3 className="font-heading font-semibold text-sm text-foreground leading-snug line-clamp-2">
				{recipe.title}
			</h3>
			<div className="flex items-center gap-1 mt-1 text-muted-foreground">
				<Clock size={12} />
				<span className="text-xs">{recipe.time}</span>
			</div>
		</Link>
	);
}
