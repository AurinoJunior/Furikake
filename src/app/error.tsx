"use client";

import { Home, RefreshCw, WifiOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavBar } from "@/components/layout/NavBar";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
	const [isOffline, setIsOffline] = useState(false);

	useEffect(() => {
		setIsOffline(!navigator.onLine);
	}, []);

	return (
		<div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center px-6 pb-28">
			<div className="flex flex-col items-center text-center gap-6">
				<div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
					<WifiOff size={32} className="text-muted-foreground" />
				</div>

				<div className="flex flex-col gap-2">
					<h1 className="font-nunito font-black text-2xl text-foreground">
						{isOffline ? "Você está offline" : "Algo deu errado"}
					</h1>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{isOffline
							? "Esta página não estava disponível quando você estava conectado e não pode ser exibida offline."
							: "Não foi possível carregar esta página. Tente novamente."}
					</p>
				</div>

				<div className="flex flex-col gap-3 w-full">
					<button
						type="button"
						onClick={reset}
						className="flex items-center justify-center gap-2 w-full rounded-2xl bg-foreground text-background px-4 py-3 text-sm font-semibold"
					>
						<RefreshCw size={15} />
						Tentar novamente
					</button>
					<Link
						href="/"
						className="flex items-center justify-center gap-2 w-full rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-foreground"
					>
						<Home size={15} />
						Voltar ao início
					</Link>
				</div>
			</div>

			<NavBar />
		</div>
	);
}
