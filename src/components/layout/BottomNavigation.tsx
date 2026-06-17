"use client";

import { Heart, Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{ href: "/", icon: Home, label: "Início" },
	{ href: "/search", icon: Search, label: "Busca" },
	{ href: "/favorites", icon: Heart, label: "Favoritos" },
];

export function BottomNavigation() {
	const pathname = usePathname();

	return (
		<div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
			<nav
				className="flex items-center justify-between gap-[86px] px-1.5 py-3 rounded-[45px] backdrop-blur-md"
				style={{
					width: 257,
					background: "oklch(1 0 0 / 70%)",
					boxShadow: "0 4px 24px oklch(0 0 0 / 10%)",
				}}
			>
				{items.map(({ href, icon: Icon, label }) => {
					const active = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							aria-label={label}
							className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
								active ? "text-brand" : "text-muted-foreground"
							}`}
						>
							<Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
