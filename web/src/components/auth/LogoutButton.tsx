"use client";

import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api.client";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
	const router = useRouter();

	async function logout() {
		await clientFetch("/api/auth/logout", { method: "POST" });
		router.push("/login");
	}

	return <Button onClick={logout}>Logout</Button>;
}
