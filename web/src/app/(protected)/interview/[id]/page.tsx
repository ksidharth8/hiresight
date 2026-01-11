import { serverFetch } from "@/lib/api.server";
import ReactMarkdown from "react-markdown";

interface Props {
	params: { id: string };
}

export default async function InterviewDetailPage({ params }: Props) {
	const { id } = await params;
	const interview = await serverFetch(`/api/interview/${id}`);

	return (
		<div className="max-w-3xl mx-auto space-y-8">
			<div>
				<h1 className="text-2xl font-semibold">{interview.role}</h1>
				<p className="text-sm text-muted-foreground">
					{new Date(interview.createdAt).toLocaleString()}
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="text-xl font-medium">Questions & Answers</h2>

				{interview.questions.map((q: string, idx: number) => (
					<div key={idx} className="border rounded-lg p-4 space-y-2">
						<p className="font-medium">
							Q{idx + 1}. {q}
						</p>
						<p className="text-sm text-muted-foreground">
							{interview.answers[idx] || "—"}
						</p>
					</div>
				))}
			</div>

			<div className="space-y-3">
				<h2 className="text-xl font-medium">Feedback</h2>

				<div className="prose dark:prose-invert max-w-none">
					<ReactMarkdown>{interview.feedback}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}
