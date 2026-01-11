import LogoutButton from "@/components/auth/LogoutButton";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export default function ProtectedNav() {
	return (
		<div className="flex items-center justify-between border-b p-4">
			<h2 className="font-semibold text-lg">
				<Link href="/">HireSight</Link>
			</h2>

			<div className="flex gap-2">
				<ThemeToggle />
				<LogoutButton />
			</div>
		</div>
	);
}
