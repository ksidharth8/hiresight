import { serverFetch } from "@/lib/api.server";
import DeleteResumeButton from "@/components/resume/DeleteResumeButton";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function ResumeDetailPage({ params }: Props) {
	const { id } = await params;
	const resume = await serverFetch(`/api/resume/${id}`);

	return (
		<div className="max-w-3xl mx-auto space-y-6">
			<div className="flex justify-between items-start">
				<div>
					<h1 className="text-2xl font-semibold">Resume Analysis</h1>
					<p className="text-sm text-muted-foreground">
						Uploaded on {new Date(resume.createdAt).toLocaleDateString()}
					</p>
				</div>
				<DeleteResumeButton id={resume._id} />
			</div>

			<div className="border rounded-lg p-4 flex justify-between items-center">
				<div>
					<p className="text-lg font-medium">Score</p>
					<p className="text-3xl font-bold">{resume.score}</p>
				</div>
				<div>
					<a
						href={resume.resumeUrl}
						target="_blank"
						className="underline text-sm"
					>
						View PDF
					</a>
				</div>
			</div>

			<div className="border rounded-lg p-4">
				<p className="text-lg font-medium mb-2">Extracted Skills</p>
				{resume.skills.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No skills detected
					</p>
				) : (
					<div className="flex flex-wrap gap-2">
						{resume.skills.map((skill: string) => (
							<span
								key={skill}
								className="px-2 py-1 text-sm border rounded"
							>
								{skill}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
