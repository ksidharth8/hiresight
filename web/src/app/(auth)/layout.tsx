import TopBar from "@/components/layout/TopBar";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col">
			<TopBar />
			<main className="flex-1 flex items-center justify-center">
				{children}
			</main>
		</div>
	);
}
