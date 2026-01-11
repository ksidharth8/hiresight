type FetchOptions = Parameters<typeof fetch>[1];

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

// CLIENT COMPONENT FETCH
export async function clientFetch(path: string, options: FetchOptions = {}) {
	const res = await fetch(`${API_BASE}${path}`, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {}),
		},
	});

	if (res.status === 401) {
		window.location.href = "/login";
		throw new Error("Unauthorized");
	}

	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error.message || "Request failed");
	}

	return res.json();
}
