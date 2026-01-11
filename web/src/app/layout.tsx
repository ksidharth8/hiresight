import "./globals.css";
import { AppThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<AppThemeProvider>{children}</AppThemeProvider>
			</body>
		</html>
	);
}

export const metadata = {
	title: {
		default: "HireSight",
		template: "%s | HireSight",
	},
	description: "AI-powered career intelligence for students and freshers.",
};
