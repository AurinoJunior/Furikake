"use client";

import type { LucideIcon } from "lucide-react";
import {
	Calendar,
	ChevronDown,
	ChevronUp,
	Clock,
	Coffee,
	Fish,
	Flame,
	Gem,
	Globe,
	Heart,
	Leaf,
	Moon,
	Snowflake,
	Star,
	Tag,
	Utensils,
	Zap,
} from "lucide-react";
import { useState } from "react";

interface TagConfig {
	icon: LucideIcon;
	label: string;
	description: string;
}

const TAG_CONFIG: Record<string, TagConfig> = {
	rápido: {
		icon: Zap,
		label: "Preparo Rápido",
		description: "Fica pronta em menos de 30 minutos.",
	},
	vegetariano: {
		icon: Leaf,
		label: "Vegetariana",
		description: "Esta receita não contém carne.",
	},
	forno: {
		icon: Flame,
		label: "Forno",
		description: "Preparada no forno para sabor intenso.",
	},
	assado: {
		icon: Flame,
		label: "Assado",
		description: "Assada lentamente para sabor profundo.",
	},
	"sem-forno": {
		icon: Zap,
		label: "Sem Forno",
		description: "Sem necessidade de forno.",
	},
	"frutos-do-mar": {
		icon: Fish,
		label: "Frutos do Mar",
		description: "Com frutos do mar frescos.",
	},
	frango: {
		icon: Utensils,
		label: "Frango",
		description: "Prato à base de frango.",
	},
	carne: {
		icon: Utensils,
		label: "Carne",
		description: "Prato à base de carne.",
	},
	jantar: {
		icon: Moon,
		label: "Jantar",
		description: "Ideal para um jantar especial.",
	},
	"fim-de-semana": {
		icon: Calendar,
		label: "Fim de Semana",
		description: "Perfeita para o fim de semana.",
	},
	elegante: {
		icon: Star,
		label: "Elegante",
		description: "Apresentação sofisticada.",
	},
	requintado: {
		icon: Gem,
		label: "Premium",
		description: "Ingredientes selecionados de alta qualidade.",
	},
	clássico: {
		icon: Star,
		label: "Clássico",
		description: "Uma receita clássica e atemporal.",
	},
	reconfortante: {
		icon: Heart,
		label: "Reconfortante",
		description: "Comida que abraça a alma.",
	},
	inverno: {
		icon: Snowflake,
		label: "Inverno",
		description: "Ideal para dias frios.",
	},
	italiano: {
		icon: Globe,
		label: "Italiano",
		description: "Inspirada na culinária italiana.",
	},
	árabe: {
		icon: Globe,
		label: "Árabe",
		description: "Sabores do Oriente Médio.",
	},
	peruano: {
		icon: Globe,
		label: "Peruano",
		description: "Sabores autênticos do Peru.",
	},
	americano: {
		icon: Globe,
		label: "Americano",
		description: "Inspirada na culinária americana.",
	},
	café: {
		icon: Coffee,
		label: "Café",
		description: "Com sabor marcante de café.",
	},
	chocolate: {
		icon: Star,
		label: "Chocolate",
		description: "Com chocolate de qualidade.",
	},
	queijo: {
		icon: Utensils,
		label: "Queijo",
		description: "Com queijo especial.",
	},
	cogumelos: {
		icon: Leaf,
		label: "Cogumelos",
		description: "Com cogumelos selecionados.",
	},
	frutas: {
		icon: Leaf,
		label: "Frutas",
		description: "Com frutas frescas da estação.",
	},
	limão: {
		icon: Zap,
		label: "Limão",
		description: "Com toque cítrico de limão.",
	},
	risoto: {
		icon: Utensils,
		label: "Risoto",
		description: "Risoto cremoso italiano.",
	},
	sopa: {
		icon: Flame,
		label: "Sopa",
		description: "Sopa nutritiva e saborosa.",
	},
	salada: {
		icon: Leaf,
		label: "Salada",
		description: "Salada fresca e nutritiva.",
	},
	sobremesa: {
		icon: Star,
		label: "Sobremesa",
		description: "Uma sobremesa irresistível.",
	},
	entrada: {
		icon: Utensils,
		label: "Entrada",
		description: "Perfeita para abrir o apetite.",
	},
	"slow-cook": {
		icon: Clock,
		label: "Cozimento Lento",
		description: "Feita em baixa temperatura por horas.",
	},
};

function formatTagLabel(tag: string): string {
	return tag.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

interface RecipeAboutProps {
	description: string;
	tags: string[];
}

export function RecipeAbout({ description, tags }: RecipeAboutProps) {
	const [open, setOpen] = useState(true);

	const knownTags = tags.filter((t) => TAG_CONFIG[t]);

	return (
		<div className="px-6 py-4">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="flex items-center justify-between w-full cursor-pointer"
			>
				<h2 className="font-heading font-bold text-lg text-foreground">
					Sobre a receita
				</h2>
				{open ? (
					<ChevronUp size={20} className="text-muted-foreground" />
				) : (
					<ChevronDown size={20} className="text-muted-foreground" />
				)}
			</button>

			{open && (
				<div className="mt-4 space-y-5">
					<p className="text-sm text-muted-foreground leading-relaxed">
						{description}
					</p>

					{knownTags.length > 0 && (
						<ul className="space-y-4">
							{knownTags.map((tag) => {
								const config = TAG_CONFIG[tag];
								const Icon = config.icon;
								return (
									<li key={tag} className="flex items-start gap-2">
										<div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
											<Icon size={16} className="text-foreground" />
										</div>
										<div>
											<p className="text-sm font-semibold text-foreground">
												{config.label}
											</p>
											<p className="text-xs text-muted-foreground">
												{config.description}
											</p>
										</div>
									</li>
								);
							})}
						</ul>
					)}

					{tags
						.filter((t) => !TAG_CONFIG[t])
						.map((tag) => (
							<li key={tag} className="flex items-start gap-3 list-none">
								<div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
									<Tag size={16} className="text-foreground" />
								</div>
								<div className="flex items-center h-9">
									<p className="text-sm font-semibold text-foreground">
										{formatTagLabel(tag)}
									</p>
								</div>
							</li>
						))}
				</div>
			)}
		</div>
	);
}
