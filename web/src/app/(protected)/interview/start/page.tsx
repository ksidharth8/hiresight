"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientFetch } from "@/lib/api.client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ROLES = [
	"Frontend Developer",
	"Backend Developer",
	"Fullstack Developer",
];

export default function InterviewStartPage() {
	const router = useRouter();
	const [role, setRole] = useState(ROLES[0]);
	const [loading, setLoading] = useState(false);

	async function start() {
		setLoading(true);

		sessionStorage.removeItem("interview_session");

		const res = await clientFetch("/api/interview/start", {
			method: "POST",
			body: JSON.stringify({ role }),
		});

		sessionStorage.setItem(
			"interview_session",
			JSON.stringify({
				role,
				questions: res.session.questions,
				answers: [],
			})
		);

		router.push("/interview/session");
	}

	return (
		<div className="max-w-md mx-auto mt-12">
			<Card>
				<CardHeader>
					<h2 className="text-xl font-semibold">Start Interview</h2>
				</CardHeader>
				<CardContent className="space-y-4">
					<select
						value={role}
						onChange={(e) => setRole(e.target.value)}
						className="w-full border rounded p-2 bg-background"
					>
						{ROLES.map((r) => (
							<option key={r}>{r}</option>
						))}
					</select>

					<Button className="w-full" onClick={start} disabled={loading}>
						{loading ? "Starting…" : "Start Interview"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
