import { CategoryRail } from "@/components/recipe/CategoryRail";
import type { Category, Recipe } from "@/types/recipe";

interface CategoryListProps {
	categories: Category[];
	allRecipes: Recipe[];
}

export function CategoryList({ categories, allRecipes }: CategoryListProps) {
	return (
		<>
			{categories.map((cat) => {
				const recipes = allRecipes.filter((r) => r.categorySlug === cat.slug);
				return (
					<CategoryRail
						key={cat.slug}
						title={cat.name}
						categorySlug={cat.slug}
						recipes={recipes}
					/>
				);
			})}
		</>
	);
}
