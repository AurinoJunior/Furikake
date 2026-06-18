interface PreparationStepsProps {
	steps: string[];
}

export function PreparationSteps({ steps }: PreparationStepsProps) {
	return (
		<section className="px-6 py-5">
			<h2 className="font-heading font-bold text-lg text-foreground mb-4">
				Modo de Preparo
			</h2>
			<ol className="space-y-5">
				{steps.map((step, i) => (
					<li key={step} className="flex gap-4">
						<span className="shrink-0 font-heading font-black text-muted-foreground text-2xl pt-1 leading-none">
							{String(i + 1).padStart(2, "0")}
						</span>
						<p className="text-foreground leading-relaxed">{step}</p>
					</li>
				))}
			</ol>
		</section>
	);
}
