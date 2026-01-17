import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type FetchOptions = Parameters<typeof fetch>[1];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function serverFetch(path: string, options: FetchOptions = {}) {
	const cookieStore = await cookies();

	const cookieHeader = cookieStore
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join("; ");

	const res = await fetch(`${SITE_URL}${path}`, {
		...options,
		headers: {
			...(options.headers || {}),
			cookie: cookieHeader,
		},
		cache: "no-store",
	});

	if (res.status === 401) {
		redirect("/login");
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
