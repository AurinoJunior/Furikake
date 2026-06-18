import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CategoryRail } from "@/components/recipe/CategoryRail";
import { RecommendationRecipeCard } from "@/components/recipe/RecommendationRecipeCard";
import { getAllRecipes, getCategories, getFeaturedRecipe } from "@/lib/recipes";

export default function HomePage() {
	const featured = getFeaturedRecipe();
	const categories = getCategories();
	const allRecipes = getAllRecipes();

	return (
		<div className="max-w-md mx-auto min-h-screen pb-28">
			<PageHeader
				title="Olá,"
				titleHighlight="Chef"
				subtitle="O que vamos cozinhar hoje?"
			/>

			{featured && (
				<section className="px-6 mb-6">
					<RecommendationRecipeCard recipe={featured} />
				</section>
			)}

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

			<BottomNavigation />
		</div>
	);
}
