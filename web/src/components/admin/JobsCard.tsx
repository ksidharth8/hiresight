import Link from "next/link";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";

export default function JobsCard({ jobs }: { jobs: any[] }) {
	return (
		<Card>
			<CardHeader className="flex flex-row justify-between items-center">
				<h2 className="text-xl font-medium">Jobs</h2>
				<Link href="/admin/jobs" className="underline text-sm">
					Manage Jobs
				</Link>
			</CardHeader>

			<CardContent>
				{jobs.length === 0 ? (
					<p className="text-muted-foreground">No jobs added yet.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{jobs.map((job) => (
							<Link
								key={job._id}
								href={`/admin/jobs/${job._id}`}
								className="block border rounded-lg p-4 hover:bg-muted/50 transition"
							>
								<p className="font-medium">{job.title}</p>
								<p className="text-sm text-muted-foreground">
									Level: {job.level}
								</p>
								<p className="text-sm text-muted-foreground mt-1">
									Required skills: {job.requiredSkills.length}
								</p>
							</Link>
						))}
					</div>
				)}
			</CardContent>

			<CardFooter>
				{jobs.length > 4 && (
					<p className="text-sm text-muted-foreground">
						And {jobs.length - 4} more...
					</p>
				)}
			</CardFooter>
		</Card>
	);
}
