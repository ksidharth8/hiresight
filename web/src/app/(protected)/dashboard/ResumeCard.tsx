import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ResumeCard({ resume }: { resume: any }) {
	return (
		<Card>
			<CardHeader>
				<h2 className="text-xl font-medium">Resume</h2>
			</CardHeader>

			<CardContent>
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
								Skills: {resume.skills?.slice(0, 5).join(", ") || "—"}
							</p>
						</div>

						<div className="flex gap-4 flex-wrap text-sm">
							<Link href={`/resume/${resume._id}`} className="underline">
								View Resume
							</Link>
							<Link href="/resume" className="underline">
								View All
							</Link>
							<Link href="/resume/upload" className="underline">
								Upload New
							</Link>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
