import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function JobMatchesCard({
	resume,
	matches,
}: {
	resume: any;
	matches: any[];
}) {
	return (
		<Card>
			<CardHeader className="flex flex-row justify-between items-center">
				<h2 className="text-xl font-medium">Job Matches</h2>
				{resume && (
					<div className="flex gap-4 flex-wrap text-sm">
						<Link
							href={`/jobs/match/${resume._id}`}
							className="underline text-sm"
						>
							All Matched Jobs
						</Link>
						<Link href={`/jobs`} className="underline text-sm">
							All Jobs
						</Link>
					</div>
				)}
			</CardHeader>

			<CardContent>
				{!resume ? (
					<p className="text-muted-foreground">
						Upload a resume to see job matches.
					</p>
				) : matches.length === 0 ? (
					<p className="text-muted-foreground">No matches found yet.</p>
				) : (
					<div className="space-y-3">
						{matches.slice(0, 3).map((job) => (
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
			</CardContent>
		</Card>
	);
}
