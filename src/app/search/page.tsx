import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { getAllRecipes } from "@/lib/recipes";
import { SearchClient } from "./SearchClient";

export default function SearchPage() {
	const recipes = getAllRecipes();
	return (
		<div className="max-w-md mx-auto min-h-screen pb-28">
			<SearchClient recipes={recipes} />
			<BottomNavigation />
		</div>
	);
}
