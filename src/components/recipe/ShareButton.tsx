"use client";

import { Check, Share2 } from "lucide-react";
import { useShare } from "@/hooks/useShare";

interface ShareButtonProps {
	title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
	const { share, copied } = useShare();

	return (
		<button
			type="button"
			onClick={() => share({ title, url: window.location.href })}
			aria-label="Compartilhar receita"
			className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white transition-all cursor-pointer"
		>
			{copied ? (
				<Check size={20} strokeWidth={2} />
			) : (
				<Share2 size={20} strokeWidth={1.8} />
			)}
		</button>
	);
}
