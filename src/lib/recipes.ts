import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Category, Recipe } from "@/types/recipe";

const contentDir = path.join(process.cwd(), "content/recipes");

export function getAllRecipes(): Recipe[] {
	const recipes: Recipe[] = [];

	const categories = fs.readdirSync(contentDir);
	for (const category of categories) {
		const categoryPath = path.join(contentDir, category);
		const stat = fs.statSync(categoryPath);
		if (!stat.isDirectory()) continue;

		const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith(".mdx"));
		for (const file of files) {
			const filePath = path.join(categoryPath, file);
			const source = fs.readFileSync(filePath, "utf-8");
			const { data, content } = matter(source);
			recipes.push({ ...(data as Recipe), content });
		}
	}

	return recipes;
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

