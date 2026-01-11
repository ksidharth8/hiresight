import Link from "next/link";
import { serverFetch } from "@/lib/api.server";

export default async function JobsPage() {
	const jobs = await serverFetch("/api/job");

	return (
		<div className="max-w-5xl mx-auto space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-semibold">Jobs</h1>
				<Link href="/jobs/match" className="underline">
					Match with my resume
				</Link>
			</div>

			{jobs.length === 0 ? (
				<p className="text-muted-foreground">No jobs available.</p>
			) : (
				<div className="grid gap-4">
					{jobs.map((job: any) => (
						<div
							key={job._id}
							className="border rounded-lg p-4 space-y-2"
						>
							<h2 className="font-medium">{job.title}</h2>
							<p className="text-sm text-muted-foreground">
								{job.company}
							</p>
							<p className="text-sm">{job.description}</p>
							<p className="text-sm text-muted-foreground">
								Skills: {job.requiredSkills.join(", ")}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
