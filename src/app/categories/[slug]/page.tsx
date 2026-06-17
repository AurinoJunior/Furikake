import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { getCategories, getRecipesByCategory } from "@/lib/recipes";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const categories = getCategories();
	return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params }: Props) {
	const { slug } = await params;
	const recipes = getRecipesByCategory(slug);

	if (recipes.length === 0) notFound();

	const categoryName = recipes[0].category;

	return (
		<div className="max-w-md mx-auto min-h-screen pb-28">
			<PageHeader
				title={categoryName}
				subtitle={`${recipes.length} ${recipes.length === 1 ? "receita" : "receitas"}`}
				showBack
			/>

			<div className="grid grid-cols-2 gap-4 px-6">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.slug} recipe={recipe} />
				))}
			</div>

			<BottomNavigation />
		</div>
	);
}
