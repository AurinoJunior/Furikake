import type { Recipe } from "@/types/recipe";
import Image from "next/image";
import Link from "next/link";

interface SearchResultCardProps {
	recipe: Recipe;
}

export function SearchResultCard({ recipe }: SearchResultCardProps) {
	return (
		<Link
			href={`/recipes/${recipe.slug}`}
			className="flex h-[120px] rounded-[20px] overflow-hidden bg-white shadow-[0_4px_4px_rgba(0,0,0,0.10)] group"
		>
			<div className="relative w-[134px] flex-shrink-0">
				<Image
					src={recipe.image}
					alt={recipe.title}
					fill
					sizes="134px"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
					unoptimized
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
				<p className="text-xs font-semibold text-muted-foreground">{recipe.time}</p>
			</div>
		</Link>
	);
}
