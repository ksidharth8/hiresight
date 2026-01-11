export default function AuthShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-md space-y-6">
				<div className="text-center space-y-1">
					<h1 className="text-3xl font-bold">HireSight</h1>
					<p className="text-sm text-muted-foreground">
						AI-powered career intelligence
					</p>
				</div>
				{children}
			</div>
		</div>
	);
}
