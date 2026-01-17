import { serverFetch } from "@/lib/api.server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props {
	params: { jobId: string };
}

export default async function JobDetailPage({ params }: Props) {
	const { jobId } = await params;

	const job = await serverFetch(`/api/jobs/${jobId}`);

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-semibold">{job.title}</h1>
				{job.company && (
					<p className="text-muted-foreground">{job.company}</p>
				)}
			</div>

			{/* Job Overview */}
			<Card>
				<CardHeader>
					<h2 className="text-lg font-medium">Job Overview</h2>
				</CardHeader>

				<CardContent className="space-y-4">
					<div>
						<p className="text-sm text-muted-foreground">Level</p>
						<p className="font-medium capitalize">{job.level}</p>
					</div>

					{job.description && (
						<div>
							<p className="text-sm text-muted-foreground">
								Description
							</p>
							<p className="leading-relaxed mt-1">{job.description}</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Required Skills */}
			<Card>
				<CardHeader>
					<h2 className="text-lg font-medium">Required Skills</h2>
				</CardHeader>

				<CardContent>
					<div className="space-y-3">
						{job.requiredSkills.map((skill: any, index: number) => (
							<div
								key={index}
								className="flex justify-between border rounded-lg p-3"
							>
								<p className="font-medium capitalize">{skill.name}</p>
								<p className="text-sm text-muted-foreground">
									Weight: {skill.weight}/5
								</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Optional Skills */}
			{job.optionalSkills?.length > 0 && (
				<Card>
					<CardHeader>
						<h2 className="text-lg font-medium">Optional Skills</h2>
					</CardHeader>

					<CardContent>
						<div className="flex flex-wrap gap-2">
							{job.optionalSkills.map((skill: string, index: number) => (
								<span
									key={index}
									className="px-3 py-1 border rounded-full text-sm"
								>
									{skill}
								</span>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Metadata */}
			<Card>
				<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
					<div>
						<p className="text-muted-foreground">Created at</p>
						<p>{new Date(job.createdAt).toLocaleDateString()}</p>
					</div>
					<div>
						<p className="text-muted-foreground">Last updated</p>
						<p>{new Date(job.updatedAt).toLocaleDateString()}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
