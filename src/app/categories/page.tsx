import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { getCategories } from "@/lib/recipes";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const categoryEmoji: Record<string, string> = {
	massas: "🍝",
	entradas: "🥗",
	sobremesas: "🍫",
	carnes: "🥩",
	sopas: "🍲",
	saladas: "🥙",
	peixes: "🐟",
	bebidas: "🥂",
};

export default function CategoriesPage() {
	const categories = getCategories();

	return (
		<div className="max-w-md mx-auto min-h-screen pb-28">
			<PageHeader title="Categorias" subtitle="Explore por tipo de prato" />

			<ul className="px-6 space-y-3">
				{categories.map((cat) => (
					<li key={cat.slug}>
						<Link
							href={`/search?q=${encodeURIComponent(cat.slug)}`}
							className="flex items-center gap-4 p-4 rounded-2xl bg-secondary hover:bg-border/60 transition-colors group"
						>
							<span className="text-3xl">{categoryEmoji[cat.slug] ?? "🍽️"}</span>
							<div className="flex-1">
								<p className="font-heading font-semibold text-foreground">{cat.name}</p>
								<p className="text-xs text-muted-foreground">
									{cat.count} {cat.count === 1 ? "receita" : "receitas"}
								</p>
							</div>
							<ChevronRight
								size={18}
								className="text-muted-foreground group-hover:text-foreground transition-colors"
							/>
						</Link>
					</li>
				))}
			</ul>

			<BottomNavigation />
		</div>
	);
}
