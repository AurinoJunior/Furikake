export interface Recipe {
	title: string;
	slug: string;
	description: string;
	category: string;
	categorySlug: string;
	time: string;
	servings: number;
	difficulty?: string;
	image: string;
	featured: boolean;
	ingredients: string[];
	steps: string[];
	chefNotes: string[];
	content?: string;
}

export interface Category {
	name: string;
	slug: string;
	count: number;
}
