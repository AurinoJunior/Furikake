"use client";

import { useEffect, useState } from "react";

export function ServiceWorkerRegistration() {
	const [waitingSW, setWaitingSW] = useState<ServiceWorker | null>(null);

	useEffect(() => {
		if (!("serviceWorker" in navigator)) return;

		navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((reg) => {
			reg.update();

			if (reg.waiting) {
				setWaitingSW(reg.waiting);
			}

			reg.addEventListener("updatefound", () => {
				const newSW = reg.installing;
				if (!newSW) return;

				newSW.addEventListener("statechange", () => {
					if (
						newSW.state === "installed" &&
						navigator.serviceWorker.controller
					) {
						setWaitingSW(newSW);
					}
				});

				// catch race condition where statechange fired before listener attached
				if (
					newSW.state === "installed" &&
					navigator.serviceWorker.controller
				) {
					setWaitingSW(newSW);
				}
			});
		});
	}, []);

	function applyUpdate() {
		if (!waitingSW) return;

		navigator.serviceWorker.addEventListener("controllerchange", () => {
			window.location.reload();
		});

		waitingSW.postMessage("SKIP_WAITING");
	}

	if (!waitingSW) return null;

	return (
		<div className="fixed bottom-20 left-0 right-0 z-50 mx-auto max-w-md px-4">
			<div className="flex items-center justify-between gap-4 rounded-2xl bg-foreground px-4 py-3 shadow-lg">
				<p className="text-sm font-medium text-background">
					Nova versão disponível
				</p>
				<button
					type="button"
					onClick={applyUpdate}
					className="shrink-0 rounded-xl bg-background px-3 py-1.5 text-sm font-semibold text-foreground"
				>
					Atualizar
				</button>
			</div>
		</div>
	);
}
