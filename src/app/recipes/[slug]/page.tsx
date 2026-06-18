import { ArrowLeft, Clock, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChefNotes } from "@/components/recipe/ChefNotes";
import { FavoriteButton } from "@/components/recipe/FavoriteButton";
import { IngredientList } from "@/components/recipe/IngredientList";
import { PreparationSteps } from "@/components/recipe/PreparationSteps";
import { RecipeAbout } from "@/components/recipe/RecipeAbout";
import { RecipeImage } from "@/components/recipe/RecipeImage";
import { ShareButton } from "@/components/recipe/ShareButton";
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
			<div className="relative w-full h-80">
				<RecipeImage
					src={recipe.image}
					alt={recipe.title}
					sizes="(max-width: 480px) 100vw, 480px"
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent" />

				<Link
					href="/"
					className="absolute top-5 left-5 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white cursor-pointer"
					aria-label="Voltar"
				>
					<ArrowLeft size={18} />
				</Link>

				<div className="absolute top-5 right-5 flex items-center gap-2">
					<ShareButton title={recipe.title} />
					<FavoriteButton slug={recipe.slug} />
				</div>

				{recipe.featured && (
					<div className="absolute bottom-4 left-5">
						<span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand text-brand-foreground">
							Escolha do Chef
						</span>
					</div>
				)}
			</div>

			<div className="relative z-10 -mt-8 rounded-t-[32px] bg-background">
				<div className="px-6 pt-6 pb-2">
					<h1 className="font-heading font-bold text-2xl text-foreground leading-tight mb-3">
						{recipe.title}
					</h1>

					<div className="flex items-center gap-1 text-xs text-muted-foreground uppercase tracking-wide mb-4">
						<span className="flex items-center gap-1">
							<Users size={12} />
							{recipe.servings} {recipe.servings === 1 ? "Pessoa" : "Pessoas"}
						</span>
						<span className="mx-1.5">·</span>
						<span className="flex items-center gap-1">
							<Clock size={12} />
							{recipe.time}
						</span>
						{recipe.difficulty && (
							<>
								<span className="mx-1.5">·</span>
								<span>{recipe.difficulty}</span>
							</>
						)}
					</div>
				</div>

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
