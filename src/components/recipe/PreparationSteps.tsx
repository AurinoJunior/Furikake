interface PreparationStepsProps {
	steps: string[];
}

export function PreparationSteps({ steps }: PreparationStepsProps) {
	return (
		<section className="px-6 py-5">
			<h2 className="font-heading font-bold text-lg text-foreground mb-4">Modo de Preparo</h2>
			<ol className="space-y-5">
				{steps.map((step, i) => (
					<li key={step} className="flex gap-4">
						<span className="flex-shrink-0 font-heading font-bold text-brand text-base w-7 pt-0.5 leading-none">
							{String(i + 1).padStart(2, "0")}
						</span>
						<p className="text-sm text-foreground leading-relaxed">{step}</p>
					</li>
				))}
			</ol>
		</section>
	);
}
