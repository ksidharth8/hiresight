import Link from "next/link";
import { serverFetch } from "@/lib/api.server";

export default async function ResumeListPage() {
	const resumes = await serverFetch("/api/resume");

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-semibold">My Resumes</h1>
				<Link href="/resume/upload" className="underline">
					Upload new
				</Link>
			</div>

			{resumes.length === 0 ? (
				<p className="text-muted-foreground">No resumes uploaded yet.</p>
			) : (
				<div className="space-y-3">
					{resumes.map((r: any) => (
						<Link
							key={r._id}
							href={`/resume/${r._id}`}
							className="block border rounded-lg p-4 hover:bg-muted transition"
						>
							<div className="flex justify-between">
								<div>
									<p className="font-medium">Resume</p>
									<p className="text-sm text-muted-foreground">
										Skills: {r.skills.slice(0, 5).join(", ")}
									</p>
								</div>
								<p className="font-semibold">{r.score}</p>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
