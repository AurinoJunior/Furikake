"use client";

import { SearchResultCard } from "@/components/recipe/SearchResultCard";
import type { Recipe } from "@/types/recipe";
import { Search, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

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
	const [query, setQuery] = useState("");
	const deferred = useDeferredValue(query);
	const results = useMemo(() => filterRecipes(recipes, deferred), [recipes, deferred]);

	return (
		<>
			<div className="px-6 pt-8 pb-4">
				<h1 className="font-heading font-bold text-2xl text-foreground mb-4">Buscar</h1>

				<div className="relative flex items-center">
					<Search
						size={16}
						className="absolute left-3.5 text-muted-foreground pointer-events-none"
					/>
					<input
						type="search"
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

				{!query && (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
							<Search size={24} className="text-muted-foreground" />
						</div>
						<p className="font-heading font-semibold text-foreground mb-1">
							Encontre sua próxima receita
						</p>
						<p className="text-sm text-muted-foreground">Busque por nome, categoria ou tags</p>
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
						<p className="text-sm text-muted-foreground">Tente buscar com palavras diferentes</p>
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
