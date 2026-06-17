"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
	favoriteRecipeSlugs: string[];
	addFavorite: (slug: string) => void;
	removeFavorite: (slug: string) => void;
	isFavorite: (slug: string) => boolean;
	toggleFavorite: (slug: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
	persist(
		(set, get) => ({
			favoriteRecipeSlugs: [],
			addFavorite: (slug) =>
				set((state) => ({
					favoriteRecipeSlugs: [...state.favoriteRecipeSlugs, slug],
				})),
			removeFavorite: (slug) =>
				set((state) => ({
					favoriteRecipeSlugs: state.favoriteRecipeSlugs.filter((s) => s !== slug),
				})),
			isFavorite: (slug) => get().favoriteRecipeSlugs.includes(slug),
			toggleFavorite: (slug) => {
				if (get().isFavorite(slug)) {
					get().removeFavorite(slug);
				} else {
					get().addFavorite(slug);
				}
			},
		}),
		{ name: "furikake-favorites" },
	),
);
