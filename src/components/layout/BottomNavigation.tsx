"use client";

import { Home, Search, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{ href: "/", icon: Home, label: "Home" },
	{ href: "/search", icon: Search, label: "Buscar" },
	{ href: "/favorites", icon: Star, label: "Favoritos" },
];

export function BottomNavigation() {
	const pathname = usePathname();

	return (
		<div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
			<nav
				className="flex items-center justify-between px-1 py-1 rounded-[45px] backdrop-blur-sm"
				style={{ width: 257, background: "rgba(255,255,255,0.7)" }}
			>
				{items.map(({ href, icon: Icon, label }) => {
					const active = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							className={`flex flex-col items-center justify-center w-18.75 h-10 rounded-[20px] px-2 py-1 gap-0.5 transition-colors ${
								active ? "bg-[#1c1c1c] text-white" : "text-[#1c1c1c]"
							}`}
						>
							<Icon size={20} />
							{!active && (
								<span className="text-xs leading-none mt-0.5">{label}</span>
							)}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
