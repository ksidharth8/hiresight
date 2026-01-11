import { serverFetch } from "@/lib/api.server";

interface Props {
	params: Promise<{ resumeId: string }>;
}

export default async function JobMatchPage({ params }: Props) {
	const { resumeId } = await params;
	const matches = await serverFetch(`/api/job/match/${resumeId}`);

	return (
		<div className="max-w-5xl mx-auto space-y-6">
			<h1 className="text-2xl font-semibold">Job Matches</h1>

			{matches.length === 0 ? (
				<p className="text-muted-foreground">No matching jobs found.</p>
			) : (
				<div className="space-y-4">
					{matches.map((job: any) => (
						<div
							key={job.jobId}
							className="border rounded-lg p-4 space-y-2"
						>
							<div className="flex justify-between">
								<h2 className="font-medium">
									{job.title} at {job.company}
								</h2>
								<span className="font-semibold">{job.score}%</span>
							</div>

							<p className="text-sm text-muted-foreground">
								Missing skills:{" "}
								{job.missingSkills?.join(", ") || "None"}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
