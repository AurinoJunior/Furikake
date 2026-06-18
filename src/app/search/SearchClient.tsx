"use client";

import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import { SearchResultCard } from "@/components/recipe/SearchResultCard";
import { SuggestionHeroCard } from "@/components/recipe/SuggestionHeroCard";
import type { Recipe } from "@/types/recipe";

interface SearchClientProps {
	recipes: Recipe[];
}

function filterRecipes(recipes: Recipe[], query: string): Recipe[] {
	if (!query.trim()) return [];
	const q = query.toLowerCase();
	return recipes.filter(
		(r) =>
			r.title.toLowerCase().includes(q) ||
			r.category.toLowerCase().includes(q) ||
			r.tags.some((t) => t.toLowerCase().includes(q)),
	);
}

export function SearchClient({ recipes }: SearchClientProps) {
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
	const deferred = useDeferredValue(query);
	const results = useMemo(
		() => filterRecipes(recipes, deferred),
		[recipes, deferred],
	);

	const hero = recipes.find((r) => r.featured) ?? recipes[0];
	const suggestions = recipes.filter((r) => r.slug !== hero?.slug).slice(0, 2);

	return (
		<>
			<div className="p-6">
				<h1 className="font-nunito font-bold text-3xl text-foreground mb-4">
					Buscar{" "}
					<span className="px-2 bg-black text-white w-fit">Receitas</span>
				</h1>

				<div className="relative flex items-center">
					<Search
						size={16}
						className="absolute left-3.5 text-muted-foreground pointer-events-none"
					/>
					<input
						type="text"
						placeholder="Receitas, categorias, tags..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="w-full h-11 pl-10 pr-10 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand/30 transition-all"
					/>
					{query && (
						<button
							type="button"
							onClick={() => setQuery("")}
							className="absolute right-3 text-muted-foreground hover:text-foreground"
						>
							<X size={16} />
						</button>
					)}
				</div>
			</div>

			<div className="px-6">
				{query && (
					<p className="text-xs text-muted-foreground mb-4">
						{results.length === 0
							? "Nenhum resultado encontrado"
							: `${results.length} resultado${results.length !== 1 ? "s" : ""} encontrado${results.length !== 1 ? "s" : ""}`}
					</p>
				)}

				{!query && hero && (
					<div className="space-y-4">
						<h2 className="text-muted-foreground">Sugestões do chef</h2>
						<SuggestionHeroCard recipe={hero} />
						{suggestions.map((recipe) => (
							<SearchResultCard key={recipe.slug} recipe={recipe} />
						))}
					</div>
				)}

				{query && results.length === 0 && (
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
							<Search size={24} className="text-muted-foreground" />
						</div>
						<p className="font-heading font-semibold text-foreground mb-1">
							Sem resultados para &ldquo;{query}&rdquo;
						</p>
						<p className="text-sm text-muted-foreground">
							Tente buscar com palavras diferentes
						</p>
					</div>
				)}

				{results.length > 0 && (
					<ul className="space-y-4">
						{results.map((recipe) => (
							<li key={recipe.slug}>
								<SearchResultCard recipe={recipe} />
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
}
