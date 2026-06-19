"use client";

import Image from "next/image";
import { useState } from "react";

const PLACEHOLDER = "/recipe-placeholder.jpg";

interface RecipeImageProps {
	src: string;
	alt: string;
	sizes: string;
	priority?: boolean;
	className?: string;
}

export function RecipeImage({
	src,
	alt,
	sizes,
	priority,
	className,
}: RecipeImageProps) {
	const [imgSrc, setImgSrc] = useState(src);

	return (
		<Image
			src={imgSrc}
			alt={alt}
			fill
			sizes={sizes}
			priority={priority}
			className={className}
			unoptimized
			onError={() => setImgSrc(PLACEHOLDER)}
		/>
	);
}
