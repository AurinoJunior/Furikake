import { NavBar } from "@/components/layout/NavBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { CategoryList } from "@/components/recipe/CategoryList";
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

			<CategoryList categories={categories} allRecipes={allRecipes} />

			<NavBar />
		</div>
	);
}
