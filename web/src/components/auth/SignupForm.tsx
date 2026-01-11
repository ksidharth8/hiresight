"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignupForm() {
	const router = useRouter();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await clientFetch("/api/auth/signup", {
				method: "POST",
				body: JSON.stringify(form),
			});
			router.push("/dashboard");
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Card>
			<CardHeader>
				<h2 className="text-xl font-semibold">Create account</h2>
			</CardHeader>
			<CardContent>
				<form onSubmit={submit} className="space-y-4">
					<Input
						placeholder="Full name"
						value={form.name}
						onChange={(e) => setForm({ ...form, name: e.target.value })}
						required
					/>
					<Input
						type="email"
						placeholder="Email"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						required
					/>
					<Input
						type="password"
						placeholder="Password"
						value={form.password}
						onChange={(e) =>
							setForm({ ...form, password: e.target.value })
						}
						required
					/>

					{error && <p className="text-sm text-red-500">{error}</p>}

					<Button className="w-full" disabled={loading}>
						{loading ? "Creating..." : "Sign up"}
					</Button>

					<p className="text-sm text-center text-muted-foreground">
						Already have an account?{" "}
						<a href="/login" className="underline">
							Login
						</a>
					</p>
				</form>
			</CardContent>
		</Card>
	);
}
