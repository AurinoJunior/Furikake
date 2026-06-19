import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Category, Recipe } from "@/types/recipe";

const contentDir = path.join(process.cwd(), "content/recipes");

function toSlug(text: string): string {
	return text
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/\s+/g, "-");
}

export function getAllRecipes(): Recipe[] {
	const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

	return files.map((file) => {
		const source = fs.readFileSync(path.join(contentDir, file), "utf-8");
		const { data, content } = matter(source);
		const raw = data as Recipe;

		return {
			...raw,
			content,
			categorySlug: toSlug(raw.category),
			featured: raw.featured ?? false,
			chefNotes: raw.chefNotes ?? [],
		};
	});
}

export function getRecipeBySlug(slug: string): Recipe | null {
	return getAllRecipes().find((r) => r.slug === slug) ?? null;
}

export function getFeaturedRecipe(): Recipe | null {
	return getAllRecipes().find((r) => r.featured) ?? null;
}

export function getCategories(): Category[] {
	const recipes = getAllRecipes();
	const map = new Map<string, Category>();

	for (const recipe of recipes) {
		const existing = map.get(recipe.categorySlug);
		if (existing) {
			existing.count++;
		} else {
			map.set(recipe.categorySlug, {
				name: recipe.category,
				slug: recipe.categorySlug,
				count: 1,
			});
		}
	}

	return Array.from(map.values());
}
