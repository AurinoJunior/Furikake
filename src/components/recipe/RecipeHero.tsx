import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FavoriteButton } from "@/components/recipe/FavoriteButton";
import { RecipeImage } from "@/components/recipe/RecipeImage";
import { ShareButton } from "@/components/recipe/ShareButton";

interface RecipeHeroProps {
	src: string;
	title: string;
	slug: string;
	featured: boolean;
}

export function RecipeHero({ src, title, slug, featured }: RecipeHeroProps) {
	return (
		<div className="relative w-full h-80">
			<RecipeImage
				src={src}
				alt={title}
				sizes="(max-width: 480px) 100vw, 480px"
				className="object-cover"
				priority
			/>
			<div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent" />

			<Link
				href="/"
				className="absolute top-5 left-5 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white cursor-pointer"
				aria-label="Voltar"
			>
				<ArrowLeft size={18} />
			</Link>

			<div className="absolute top-5 right-5 flex items-center gap-2">
				<ShareButton title={title} />
				<FavoriteButton slug={slug} />
			</div>

			{featured && (
				<div className="absolute bottom-4 left-5">
					<span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand text-brand-foreground">
						Escolha do Chef
					</span>
				</div>
			)}
		</div>
	);
}
