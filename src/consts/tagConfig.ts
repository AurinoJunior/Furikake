import type { LucideIcon } from "lucide-react";
import {
	Calendar,
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
	Utensils,
	Zap,
} from "lucide-react";

export interface TagConfig {
	icon: LucideIcon;
	label: string;
	description: string;
}

export const TAG_CONFIG: Record<string, TagConfig> = {
	// -- Tempo de preparo --
	rapido: {
		icon: Zap,
		label: "Preparo Rápido",
		description: "Fica pronta em menos de 30 minutos.",
	},
	"sem-forno": {
		icon: Zap,
		label: "Sem Forno",
		description: "Sem necessidade de forno.",
	},
	"slow-cook": {
		icon: Clock,
		label: "Cozimento Lento",
		description: "Feita em baixa temperatura por horas.",
	},

	// -- Método de cocção --
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

	// -- Dieta / Restrições --
	vegetariano: {
		icon: Leaf,
		label: "Vegetariana",
		description: "Esta receita não contém carne.",
	},

	// -- Proteína / Base --
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

	// -- Ingrediente destaque --
	cafe: {
		icon: Coffee,
		label: "Café",
		description: "Com sabor marcante de café.",
	},
	chocolate: {
		icon: Star,
		label: "Chocolate",
		description: "Com chocolate de qualidade.",
	},
	frutas: {
		icon: Leaf,
		label: "Frutas",
		description: "Com frutas frescas da estação.",
	},
	limao: {
		icon: Zap,
		label: "Limão",
		description: "Com toque cítrico de limão.",
	},

	// -- Tipo de prato --
	entrada: {
		icon: Utensils,
		label: "Entrada",
		description: "Perfeita para abrir o apetite.",
	},
	salada: {
		icon: Leaf,
		label: "Salada",
		description: "Salada fresca e nutritiva.",
	},
	sopa: {
		icon: Flame,
		label: "Sopa",
		description: "Sopa nutritiva e saborosa.",
	},
	risoto: {
		icon: Utensils,
		label: "Risoto",
		description: "Risoto cremoso italiano.",
	},
	sobremesa: {
		icon: Star,
		label: "Sobremesa",
		description: "Uma sobremesa irresistível.",
	},

	// -- Ocasião --
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
	inverno: {
		icon: Snowflake,
		label: "Inverno",
		description: "Ideal para dias frios.",
	},

	// -- Estilo / Vibe --
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
	classico: {
		icon: Star,
		label: "Clássico",
		description: "Uma receita clássica e atemporal.",
	},
	reconfortante: {
		icon: Heart,
		label: "Reconfortante",
		description: "Comida que abraça a alma.",
	},

	// -- Culinária / Origem --
	italiano: {
		icon: Globe,
		label: "Italiano",
		description: "Inspirada na culinária italiana.",
	},
	arabe: {
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
	japones: {
		icon: Globe,
		label: "Japonês",
		description: "Técnicas e sabores da culinária japonesa.",
	},
};
