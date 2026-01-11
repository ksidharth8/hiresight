import Link from "next/link";
import { serverFetch } from "@/lib/api.server";

export default async function DashboardPage() {
	const data = await serverFetch("/api/dashboard");

	const resume = data.resume;
	const matches = data.matches || [];

	return (
		<div className="max-w-6xl mx-auto space-y-10">
			<div>
				<h1 className="text-2xl font-semibold">Dashboard</h1>
				<p className="text-sm text-muted-foreground">
					Your career progress at a glance
				</p>
			</div>

			<section className="border rounded-lg p-6 space-y-4">
				<h2 className="text-xl font-medium">Resume</h2>

				{!resume ? (
					<div className="space-y-2">
						<p className="text-muted-foreground">
							You haven't uploaded a resume yet.
						</p>
						<Link href="/resume/upload" className="underline">
							Upload Resume
						</Link>
					</div>
				) : (
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<p className="text-sm text-muted-foreground">
								Resume score
							</p>
							<p className="text-3xl font-bold">{resume.score}</p>
							<p className="text-sm text-muted-foreground mt-1">
								Skills: {resume.skills.slice(0, 5).join(", ") || "—"}
							</p>
						</div>

						<div className="flex gap-4 flex-wrap">
							<Link href={`/resume/${resume.id}`} className="underline">
								View Resume
							</Link>
							<Link href="/resume" className="underline">
								View All Resumes
							</Link>
							<Link href="/resume/upload" className="underline">
								Upload New
							</Link>
						</div>
					</div>
				)}
			</section>

			<section className="border rounded-lg p-6 space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-medium">Job Matches</h2>
					{resume && (
						<Link
							href={`/jobs/match/${resume.id}`}
							className="underline text-sm"
						>
							View all
						</Link>
					)}
				</div>

				{!resume ? (
					<p className="text-muted-foreground">
						Upload a resume to see job matches.
					</p>
				) : matches.length === 0 ? (
					<p className="text-muted-foreground">No matches found yet.</p>
				) : (
					<div className="space-y-3">
						{matches.slice(0, 3).map((job: any) => (
							<div
								key={job.jobId}
								className="border rounded-lg p-4 flex justify-between"
							>
								<div>
									<p className="font-medium">
										{job.title} at {job.company}
									</p>
									{job.missingSkills?.length > 0 && (
										<p className="text-sm text-muted-foreground">
											Missing: {job.missingSkills.join(", ")}
										</p>
									)}
								</div>
								<p className="font-semibold">{job.score}%</p>
							</div>
						))}
					</div>
				)}
			</section>

			<section className="border rounded-lg p-6 space-y-4">
				<h2 className="text-xl font-medium">Interview Practice</h2>

				<div className="flex gap-4">
					<Link href="/interview/start" className="underline">
						Start Interview
					</Link>
					<Link href="/interview" className="underline">
						View Past Interviews
					</Link>
				</div>
			</section>

			<section className="border rounded-lg p-6 space-y-4">
				<h2 className="text-xl font-medium">Progress Snapshot</h2>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div>
						<p className="text-sm text-muted-foreground">
							Resume uploaded
						</p>
						<p className="text-2xl font-semibold">
							{resume ? "Yes" : "No"}
						</p>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">
							Job matches available
						</p>
						<p className="text-2xl font-semibold">{matches.length}</p>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">
							Interview practice
						</p>
						<p className="text-2xl font-semibold">Ready</p>
					</div>
				</div>
			</section>
		</div>
	);
}
