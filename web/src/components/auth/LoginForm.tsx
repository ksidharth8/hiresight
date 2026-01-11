"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginForm() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await clientFetch("/api/auth/login", {
				method: "POST",
				body: JSON.stringify({ email, password }),
			});
			router.push("/dashboard");
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<h2 className="text-xl font-semibold">Sign in</h2>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<Input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					{error && <p className="text-sm text-red-500">{error}</p>}

					<Button className="w-full" disabled={loading}>
						{loading ? "Signing in..." : "Sign in"}
					</Button>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-card px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>

					<Button
						type="button"
						variant="outline"
						className="w-full"
						onClick={() =>
							(window.location.href = `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/google`)
						}
					>
						Continue with Google
					</Button>

					<p className="text-sm text-center text-muted-foreground">
						Don’t have an account?{" "}
						<a href="/signup" className="underline">
							Sign up
						</a>
					</p>
				</form>
			</CardContent>
		</Card>
	);
}
