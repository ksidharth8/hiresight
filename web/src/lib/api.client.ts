type FetchOptions = Parameters<typeof fetch>[1];

export async function clientFetch(path: string, options: FetchOptions = {}) {
	const res = await fetch(`${path}`, {
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
		let message = `Request failed (${res.status})`;

		try {
			const contentType = res.headers.get("content-type");

			if (contentType?.includes("application/json")) {
				const body = await res.json();
				message = body?.message || body?.error || message;
			} else {
				const text = await res.text();
				if (text) message = text;
			}
		} catch {
			// swallow parsing errors safely
		}
		throw new Error(message);
	}

	return res.json();
}
