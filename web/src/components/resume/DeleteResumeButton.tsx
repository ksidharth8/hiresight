"use client";

import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api.client";
import { Button } from "@/components/ui/button";

export default function DeleteResumeButton({ id }: { id: string }) {
	const router = useRouter();

	async function del() {
		if (!confirm("Delete this resume?")) return;

		await clientFetch(`/api/resume/${id}`, {
			method: "DELETE",
		});

		router.push("/resume");
	}

	return (
		<Button variant="destructive" onClick={del} style={{ cursor: "pointer" }}>
			Delete
		</Button>
	);
}
