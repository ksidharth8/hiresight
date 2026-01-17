import { redirect } from "next/navigation";
import { serverFetch } from "@/lib/api.server";
import ProtectedNav from "@/components/layout/ProtectedNav";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	try {
		const me = await serverFetch("/api/auth/me");

		if (me.role !== "admin") {
			redirect("/dashboard");
		}
	} catch {
		redirect("/login");
	}

	return (
		<div className="min-h-screen bg-background">
			<ProtectedNav />
			<main className="p-6">{children}</main>
		</div>
	);
}
