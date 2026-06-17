import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAllRecipes } from "@/lib/recipes";
import { FavoritesClient } from "./FavoritesClient";

export default function FavoritesPage() {
	const allRecipes = getAllRecipes();

	return (
		<div className="max-w-md mx-auto min-h-screen pb-28">
			<PageHeader
				title="Favoritos do Chef 👨🏾‍🍳"
				subtitle="Uma seleção das suas receitas favoritas"
			/>
			<FavoritesClient allRecipes={allRecipes} />
			<BottomNavigation />
		</div>
	);
}
