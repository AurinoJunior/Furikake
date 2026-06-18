import { Suspense } from "react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAllRecipes } from "@/lib/recipes";
import { SearchClient } from "./SearchClient";

export default function SearchPage() {
	const recipes = getAllRecipes();
	return (
		<div className="max-w-md mx-auto min-h-screen pb-28">
			<PageHeader title="Buscar" titleHighlight="Receitas" />
			<Suspense>
				<SearchClient recipes={recipes} />
			</Suspense>
			<BottomNavigation />
		</div>
	);
}
