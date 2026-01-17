import { serverFetch } from "@/lib/api.server";
import Link from "next/link";

interface Props {
	params: Promise<{ resumeId: string }>;
}

export default async function JobMatchPage({ params }: Props) {
	const { resumeId } = await params;
	const matches = await serverFetch(`/api/jobs/match/${resumeId}`);

	return (
		<div className="max-w-5xl mx-auto space-y-6">
			<h1 className="text-2xl font-semibold">Job Matches</h1>

			{matches.length === 0 ? (
				<p className="text-muted-foreground">No matching jobs found.</p>
			) : (
				<div className="space-y-4">
					{matches.map((job: any) => (
						<Link
							key={job.jobId}
							href={`/jobs/${job.jobId}`}
							className="border rounded-lg p-4 flex justify-between"
						>
							<div>
								<p className="font-medium">
									{job.title} at {job.company}
								</p>
								{job.missingSkills?.length > 0 && (
									<p className="text-sm text-muted-foreground">
										Missing Skills: {job.missingSkills.join(", ")}
									</p>
								)}
							</div>
							<p className="font-semibold">{job.score}%</p>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
