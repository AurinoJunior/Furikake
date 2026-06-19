"use client";

import { useState } from "react";

interface ShareOptions {
	title: string;
	url: string;
}

export function useShare() {
	const [copied, setCopied] = useState(false);

	const share = async ({ title, url }: ShareOptions) => {
		if (navigator.share) {
			await navigator.share({ title, url });
			return;
		}

		await navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return { share, copied };
}
