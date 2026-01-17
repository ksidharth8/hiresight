"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/api.client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ROLES = [
	"Frontend Developer",
	"Backend Developer",
	"Fullstack Developer",
	"Software Engineer",
	"Cloud Engineer",
	"App Developer",
	"AI/ML Engineer",
];

export default function InterviewStartPage() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const type = searchParams.get("type");

	const [role, setRole] = useState<string>("");
	const [jobId, setJobId] = useState<string>("");

	const [jobs, setJobs] = useState<any[]>([]);
	const [loadingJobs, setLoadingJobs] = useState(false);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	if (type !== "role" && type !== "job") {
		return (
			<div className="max-w-md mx-auto">
				<p className="text-red-500">Invalid interview type.</p>
			</div>
		);
	}

	useEffect(() => {
		if (type !== "job") return;

		async function fetchJobs() {
			try {
				setLoadingJobs(true);
				const data = await clientFetch("/api/jobs");
				setJobs(data);
			} finally {
				setLoadingJobs(false);
			}
		}

		fetchJobs();
	}, [type]);

	async function handleStart() {
		setLoading(true);
		setError(null);

		sessionStorage.removeItem("interview_session");
		let res;
		try {
			const body =
				type === "role"
					? {
							contextType: "ROLE",
							role,
						}
					: {
							contextType: "JOB",
							jobId,
						};

			res = await clientFetch("/api/interview/start", {
				method: "POST",
				body: JSON.stringify(body),
			});

			sessionStorage.setItem(
				"interview_session",
				JSON.stringify({
					_id: res.session.sessionId,
					type: res.session.contextType === "ROLE" ? "role" : "job",
					role: res.session.role,
					jobId: res.session.jobId,
					questions: res.session.questions,
					answers: [],
				}),
			);

			router.push(`/interview/session`);
		} catch (err: any) {
			setError(err.message || "Failed to start interview");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="max-w-md mx-auto mt-12">
			<Card>
				<CardHeader>
					<h1 className="text-xl font-semibold">
						{type === "role"
							? "Role-based Interview"
							: "Job-based Interview"}
					</h1>
				</CardHeader>

				<CardContent className="space-y-4">
					{type === "role" && (
						<select
							className="w-full border rounded-md px-3 py-2 text-sm"
							value={role}
							onChange={(e) => setRole(e.target.value)}
						>
							<option value="">Select a role</option>
							{ROLES.map((r) => (
								<option key={r} value={r}>
									{r}
								</option>
							))}
						</select>
					)}

					{type === "job" && (
						<select
							className="w-full border rounded-md px-3 py-2 text-sm"
							value={jobId}
							onChange={(e) => setJobId(e.target.value)}
							disabled={loadingJobs}
						>
							<option value="">
								{loadingJobs ? "Loading jobs..." : "Select a job"}
							</option>

							{jobs.map((job) => (
								<option key={job._id} value={job._id}>
									{job.title} {job.company ? `— ${job.company}` : ""}
								</option>
							))}
						</select>
					)}

					{error && <p className="text-sm text-red-500">{error}</p>}

					<Button
						className="w-full"
						disabled={
							loading ||
							(type === "role" && !role) ||
							(type === "job" && !jobId)
						}
						onClick={handleStart}
					>
						{loading ? "Starting..." : "Start Interview"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
