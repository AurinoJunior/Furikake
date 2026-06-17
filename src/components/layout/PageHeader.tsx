"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
	title: string;
	subtitle?: string;
	showBack?: boolean;
}

export function PageHeader({ title, subtitle, showBack = false }: PageHeaderProps) {
	const router = useRouter();

	return (
		<header className="flex items-start gap-3 px-6 pt-6 pb-4">
			{showBack && (
				<button
					type="button"
					onClick={() => router.back()}
					className="mt-0.5 flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
					aria-label="Voltar"
				>
					<ArrowLeft size={22} />
				</button>
			)}
			<div>
				<h1 className="font-heading font-bold text-2xl text-foreground leading-tight">{title}</h1>
				{subtitle && (
					<p className="text-sm text-muted-foreground mt-0.5 leading-snug">{subtitle}</p>
				)}
			</div>
		</header>
	);
}
