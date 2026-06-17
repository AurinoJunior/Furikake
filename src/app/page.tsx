import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CategoryRail } from "@/components/recipe/CategoryRail";
import { FeaturedRecipeCard } from "@/components/recipe/FeaturedRecipeCard";
import { getAllRecipes, getCategories, getFeaturedRecipe } from "@/lib/recipes";
import { Search } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	const featured = getFeaturedRecipe();
	const categories = getCategories();
	const allRecipes = getAllRecipes();

	return (
		<div className="max-w-md mx-auto min-h-screen pb-28">
			{/* Header */}
			<header className="flex items-center justify-between px-6 pt-8 pb-2">
				<div>
					<h1 className="font-heading font-extrabold text-2xl text-foreground">Furikake</h1>
					<p className="text-sm text-muted-foreground">O que vamos cozinhar hoje?</p>
				</div>
				<Link
					href="/search"
					aria-label="Buscar receitas"
					className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
				>
					<Search size={20} />
				</Link>
			</header>

			{/* Featured recipe */}
			{featured && (
				<section className="px-6 mt-4 mb-6">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
						Recomendação do dia
					</p>
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
