"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
	title: string;
	titleHighlight?: string;
	subtitle?: string;
	showBack?: boolean;
}

export function PageHeader({
	title,
	titleHighlight,
	subtitle,
	showBack = false,
}: PageHeaderProps) {
	const router = useRouter();

	return (
		<header className="flex items-start gap-3 px-6 pt-6 pb-4">
			{showBack && (
				<button
					type="button"
					onClick={() => router.back()}
					className="mt-1.5 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
					aria-label="Voltar"
				>
					<ArrowLeft size={22} />
				</button>
			)}
			<div>
				<h1 className="font-nunito font-black text-3xl text-foreground">
					{title}{" "}
					{titleHighlight && (
						<span className="bg-black px-2 text-white">{titleHighlight}</span>
					)}
				</h1>
				{subtitle && (
					<p className="text-sm text-muted-foreground mt-2 leading-snug">
						{subtitle}
					</p>
				)}
			</div>
		</header>
	);
}
