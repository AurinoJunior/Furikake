import type { Recipe } from "@/types/recipe";
import { Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchResultCardProps {
	recipe: Recipe;
}

export function SearchResultCard({ recipe }: SearchResultCardProps) {
	return (
		<Link href={`/recipes/${recipe.slug}`} className="flex gap-3 group">
			<div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
				<Image
					src={recipe.image}
					alt={recipe.title}
					fill
					sizes="80px"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
					unoptimized
				/>
			</div>
			<div className="flex-1 min-w-0 py-0.5">
				<span className="text-xs text-brand font-medium mb-0.5 block">{recipe.category}</span>
				<h3 className="font-heading font-semibold text-sm text-foreground leading-snug line-clamp-2 mb-1.5">
					{recipe.title}
				</h3>
				<div className="flex items-center gap-3 text-muted-foreground">
					<span className="flex items-center gap-1 text-xs">
						<Clock size={11} />
						{recipe.time}
					</span>
					<span className="flex items-center gap-1 text-xs">
						<Users size={11} />
						{recipe.servings} {recipe.servings === 1 ? "pessoa" : "pessoas"}
					</span>
				</div>
			</div>
		</Link>
	);
}
