import { Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/recipe/FavoriteButton";
import type { Recipe } from "@/types/recipe";

interface FeaturedRecipeCardProps {
	recipe: Recipe;
}

export function FeaturedRecipeCard({ recipe }: FeaturedRecipeCardProps) {
	return (
		<Link href={`/recipes/${recipe.slug}`} className="block group">
			<div className="relative w-full h-52 rounded-2xl overflow-hidden">
				<Image
					src={recipe.image}
					alt={recipe.title}
					fill
					sizes="(max-width: 480px) 100vw, 480px"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
					priority
					unoptimized
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

				<div className="absolute bottom-0 left-0 right-0 p-5">
					<p className="text-white text-sm font-bold mb-0.5">
						Recomendação do dia
					</p>
					<h2 className="font-heading font-bold text-white text-2xl leading-tight line-clamp-2 mb-4">
						{recipe.title}
					</h2>
					<div className="flex items-center gap-3 text-white/80 text-xs">
						<span className="flex items-center gap-1">
							<Users size={12} />
							{recipe.servings} {recipe.servings === 1 ? "pessoa" : "pessoas"}
						</span>
						<span className="flex items-center gap-1">
							<Clock size={12} />
							{recipe.time}
						</span>
						{recipe.difficulty && (
							<span className="lowercase tracking-wide">
								{recipe.difficulty}
							</span>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
}
