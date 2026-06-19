import { ChefHat } from "lucide-react";

interface ChefNotesProps {
	notes: string[];
}

export function ChefNotes({ notes }: ChefNotesProps) {
	if (notes.length === 0) return null;

	return (
		<section className="mx-6 my-5 p-4 rounded-2xl bg-secondary">
			<div className="flex items-center gap-2 mb-3">
				<ChefHat size={16} className="text-brand" />
				<h2 className="font-heading font-bold text-sm text-foreground">
					Dica do Chef
				</h2>
			</div>
			<ul className="space-y-2">
				{notes.map((note) => (
					<li
						key={note}
						className="text-sm text-muted-foreground leading-relaxed"
					>
						&ldquo;{note}&rdquo;
					</li>
				))}
			</ul>
		</section>
	);
}
