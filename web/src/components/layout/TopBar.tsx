import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function TopBar() {
	return (
		<div className="w-full flex justify-end p-4 border-b">
			<ThemeToggle />
		</div>
	);
}
