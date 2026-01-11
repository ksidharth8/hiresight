import { redirect } from "next/navigation";
import Link from "next/link";
import { serverFetch } from "@/lib/api.server";

export default async function ResumeSelectPage() {
	const resumes = await serverFetch("/api/resume");

	if (resumes.length === 0) {
		redirect("/resume/upload");
	}

	if (resumes.length === 1) {
		redirect(`/jobs/match/${resumes[0].id}`);
	}

	return (
		<div className="max-w-xl mx-auto space-y-4">
			<h1 className="text-xl font-semibold">Select Resume</h1>

			{resumes.map((r: any) => (
				<Link
					key={r._id}
					href={`/jobs/match/${r._id}`}
					className="block border rounded p-4 hover:bg-muted"
				>
					<p className="font-medium">Resume</p>
					<p className="text-sm text-muted-foreground">
						Score: {r.score} | Skills: {r.skills.slice(0, 5).join(", ")}
					</p>
				</Link>
			))}
		</div>
	);
}
