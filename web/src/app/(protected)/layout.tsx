import ProtectedNav from "@/components/layout/ProtectedNav";

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-background">
			<ProtectedNav />
			<main className="p-6">{children}</main>
		</div>
	);
}
