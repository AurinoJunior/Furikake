import { Search } from "lucide-react";
import Link from "next/link";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CategoryRail } from "@/components/recipe/CategoryRail";
import { FeaturedRecipeCard } from "@/components/recipe/FeaturedRecipeCard";
import { getAllRecipes, getCategories, getFeaturedRecipe } from "@/lib/recipes";

export default function HomePage() {
	const featured = getFeaturedRecipe();
	const categories = getCategories();
	const allRecipes = getAllRecipes();

	return (
		<div className="max-w-md mx-auto min-h-screen pb-20">
			<header className="p-6 pb-0">
				<h1 className="font-nunito font-black text-3xl text-foreground">
					Olá <span className="bg-black px-1 text-white">Chef</span>
				</h1>
				<p className="mt-1">O que vamos cozinhar hoje?</p>
			</header>

			{featured && (
				<section className="px-6 mt-4 mb-6">
					<FeaturedRecipeCard recipe={featured} />
				</section>
			)}

			{/* Category rails */}
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
