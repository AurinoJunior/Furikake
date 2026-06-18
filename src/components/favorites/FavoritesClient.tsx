"use client";

import { Clock, Heart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFavoritesStore } from "@/store/favorites";
import type { Recipe } from "@/types/recipe";

interface FavoritesClientProps {
	allRecipes: Recipe[];
}

export function FavoritesClient({ allRecipes }: FavoritesClientProps) {
	const { favoriteRecipeSlugs } = useFavoritesStore();
	const favorites = allRecipes.filter((r) =>
		favoriteRecipeSlugs.includes(r.slug),
	);

	if (favorites.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 px-6 text-center">
				<div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
					<Heart size={28} className="text-muted-foreground" />
				</div>
				<p className="font-heading font-semibold text-foreground mb-1">
					Nenhum favorito ainda
				</p>
				<p className="text-sm text-muted-foreground">
					Toque no coração de uma receita para salvá-la aqui
				</p>
			</div>
		);
	}

	return (
		<ul className="px-6 space-y-8">
			{favorites.map((recipe) => (
				<li key={recipe.slug}>
					<Link href={`/recipes/${recipe.slug}`} className="block group">
						<div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3">
							<Image
								src={recipe.image}
								alt={recipe.title}
								fill
								sizes="(max-width: 480px) 100vw, 480px"
								className="object-cover transition-transform duration-300 group-hover:scale-105"
								unoptimized
							/>
						</div>
						<h3 className="font-heading font-semibold text-base text-foreground leading-snug mb-1.5">
							{recipe.title}
						</h3>
						<div className="flex items-center gap-4 text-muted-foreground">
							<span className="flex items-center gap-1 text-xs">
								<Clock size={12} />
								{recipe.time}
							</span>
							<span className="flex items-center gap-1 text-xs">
								<Users size={12} />
								{recipe.servings} {recipe.servings === 1 ? "pessoa" : "pessoas"}
							</span>
							<span className="text-xs text-brand">{recipe.category}</span>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
