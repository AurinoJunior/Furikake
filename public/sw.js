const CACHE_VERSION = "furikake-v2";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

self.addEventListener("install", (event) => {
	event.waitUntil(caches.open(PAGE_CACHE).then((cache) => cache.add("/")));
});

self.addEventListener("message", (event) => {
	if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((k) => !k.startsWith(CACHE_VERSION))
						.map((k) => caches.delete(k)),
				),
			)
			.then(() => self.clients.claim()),
	);
});

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") return;

	const url = new URL(event.request.url);

	// Next.js static assets are immutable (filename includes content hash)
	if (url.pathname.startsWith("/_next/static/")) {
		event.respondWith(cacheFirst(event.request, STATIC_CACHE));
		return;
	}

	// Images from any origin (including Unsplash)
	if (
		event.request.destination === "image" ||
		/\.(png|jpg|jpeg|gif|webp|svg|ico)(\?.*)?$/.test(url.pathname)
	) {
		event.respondWith(cacheImage(event.request));
		return;
	}

	// Full page navigations
	if (event.request.mode === "navigate") {
		event.respondWith(networkFirstNav(event.request));
		return;
	}

	// RSC payloads and other same-origin requests
	if (url.origin === location.origin) {
		event.respondWith(staleWhileRevalidate(event.request));
	}
});

async function cacheFirst(request, cacheName) {
	const cache = await caches.open(cacheName);
	const cached = await cache.match(request);
	if (cached) return cached;

	const response = await fetch(request);
	if (response.ok) cache.put(request, response.clone());
	return response;
}

async function cacheImage(request) {
	const cache = await caches.open(IMAGE_CACHE);
	const cached = await cache.match(request);
	if (cached) return cached;

	const response = await fetch(request);
	// allow opaque responses (cross-origin no-cors, e.g. Unsplash)
	if (response.ok || response.type === "opaque") {
		cache.put(request, response.clone());
	}
	return response;
}

async function networkFirstNav(request) {
	const cache = await caches.open(PAGE_CACHE);
	try {
		const response = await fetch(request);
		if (response.ok) cache.put(request, response.clone());
		return response;
	} catch {
		const cached =
			(await cache.match(request)) ?? (await cache.match("/"));
		return (
			cached ??
			new Response(
				"<!doctype html><html><body>Você está offline.</body></html>",
				{
					status: 200,
					headers: { "Content-Type": "text/html; charset=utf-8" },
				},
			)
		);
	}
}

async function staleWhileRevalidate(request) {
	const cache = await caches.open(STATIC_CACHE);

	const revalidatePromise = fetch(request)
		.then((response) => {
			if (response.ok) cache.put(request, response.clone());
			return response;
		})
		.catch(() => null);

	// ignoreVary: Next.js RSC responses have Vary: Next-Router-State-Tree,
	// which changes on every navigation path and causes cache misses offline.
	const cached = await cache.match(request, { ignoreVary: true });
	return cached ?? (await revalidatePromise) ?? new Response(null, { status: 503 });
}
