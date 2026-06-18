"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites";

interface FavoriteButtonProps {
	slug: string;
	size?: "sm" | "md";
}

export function FavoriteButton({ slug, size = "md" }: FavoriteButtonProps) {
	const { isFavorite, toggleFavorite } = useFavoritesStore();
	const active = isFavorite(slug);

	const dim = size === "sm" ? 18 : 22;

	return (
		<button
			type="button"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				toggleFavorite(slug);
			}}
			aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
			className={`flex items-center justify-center rounded-full transition-all cursor-pointer ${
				size === "sm" ? "w-8 h-8" : "w-10 h-10"
			} ${
				active
					? "bg-brand text-brand-foreground"
					: "bg-black/30 backdrop-blur-sm text-white"
			}`}
		>
			<Heart
				size={dim}
				strokeWidth={active ? 0 : 1.8}
				fill={active ? "currentColor" : "none"}
			/>
		</button>
	);
}
