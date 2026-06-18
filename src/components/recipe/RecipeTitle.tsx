import { Clock, Users } from "lucide-react";

interface RecipeTitleProps {
	title: string;
	servings: number;
	time: string;
	difficulty?: string;
}

export function RecipeTitle({
	title,
	servings,
	time,
	difficulty,
}: RecipeTitleProps) {
	return (
		<div className="px-6 pt-6 pb-2">
			<h1 className="font-heading font-bold text-2xl text-foreground leading-tight mb-3">
				{title}
			</h1>

			<div className="flex items-center gap-1 text-xs text-muted-foreground uppercase tracking-wide mb-4">
				<span className="flex items-center gap-1">
					<Users size={12} />
					{servings} {servings === 1 ? "Pessoa" : "Pessoas"}
				</span>
				<span className="mx-1.5">·</span>
				<span className="flex items-center gap-1">
					<Clock size={12} />
					{time}
				</span>
				{difficulty && (
					<>
						<span className="mx-1.5">·</span>
						<span>{difficulty}</span>
					</>
				)}
			</div>
		</div>
	);
}
