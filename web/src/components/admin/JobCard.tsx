import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function JobCard({ job }: any) {
	return (
		<Link href={`/admin/jobs/${job._id}`}>
			<div className="border rounded-lg p-4 hover:bg-muted transition">
				<div className="flex justify-between items-center">
					<h3 className="font-semibold">{job.title}</h3>
					<Badge>{job.level}</Badge>
				</div>

				<p className="text-sm text-muted-foreground">{job.company}</p>

				<p className="text-xs mt-2">
					{job.requiredSkills.length} required skills
				</p>
			</div>
		</Link>
	);
}
