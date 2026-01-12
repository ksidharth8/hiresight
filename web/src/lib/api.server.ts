import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type FetchOptions = Parameters<typeof fetch>[1];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

// SERVER COMPONENT FETCH
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
		const error = await res.json().catch(() => ({}));
		throw new Error(error.message);
	}

	return res.json();
}
