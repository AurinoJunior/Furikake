import { Suspense } from "react";
import { NavBar } from "@/components/layout/NavBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchClient } from "@/components/search/SearchClient";
import { getAllRecipes } from "@/lib/recipes";

export default function SearchPage() {
	const recipes = getAllRecipes();
	return (
		<div className="max-w-md mx-auto min-h-screen pb-28">
			<PageHeader title="Buscar" titleHighlight="Receitas" />
			<Suspense>
				<SearchClient recipes={recipes} />
			</Suspense>
			<NavBar />
		</div>
	);
}
