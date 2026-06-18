import { notFound } from "next/navigation";
import { ChefNotes } from "@/components/recipe/ChefNotes";
import { IngredientList } from "@/components/recipe/IngredientList";
import { PreparationSteps } from "@/components/recipe/PreparationSteps";
import { RecipeAbout } from "@/components/recipe/RecipeAbout";
import { RecipeHero } from "@/components/recipe/RecipeHero";
import { RecipeTitle } from "@/components/recipe/RecipeTitle";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return getAllRecipes().map((r) => ({ slug: r.slug }));
}

export default async function RecipePage({ params }: Props) {
	const { slug } = await params;
	const recipe = getRecipeBySlug(slug);

	if (!recipe) notFound();

	return (
		<div className="max-w-md mx-auto min-h-screen pb-12">
			<RecipeHero
				src={recipe.image}
				title={recipe.title}
				slug={recipe.slug}
				featured={recipe.featured}
			/>

			<div className="relative z-10 -mt-8 rounded-t-[32px] bg-background">
				<RecipeTitle
					title={recipe.title}
					servings={recipe.servings}
					time={recipe.time}
					difficulty={recipe.difficulty}
				/>

				<div className="my-2 mx-6 h-px bg-border" />

				<RecipeAbout description={recipe.description} tags={recipe.tags} />

				<div className="my-2 mx-6 h-px bg-border" />

				<IngredientList ingredients={recipe.ingredients} />

				<div className="my-2 mx-6 h-px bg-border" />

				<PreparationSteps steps={recipe.steps} />

				{recipe.chefNotes.length > 0 && <ChefNotes notes={recipe.chefNotes} />}
			</div>
		</div>
	);
}
