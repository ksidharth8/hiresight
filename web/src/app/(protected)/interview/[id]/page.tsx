import { serverFetch } from "@/lib/api.server";
import { Card } from "@/components/ui/card";

interface QuestionItem {
	questionId: {
		_id: string;
		category: string;
		questionText: string;
		difficulty: number;
	};
	answerText: string;
	score?: number;
	feedback?: {
		correctness: number;
		depth: number;
		clarity: number;
		relevance: number;
		improvementNotes?: string;
	};
}

interface Props {
	params: { id: string };
}

export default async function InterviewDetailPage({ params }: Props) {
	const { id } = await params;
	const interview = await serverFetch(`/api/interview/${id}`);

	const title =
		interview.contextType === "ROLE"
			? interview.role
			: `${interview.jobId.title}${
					interview.jobId.company ? " — " + interview.jobId.company : ""
				}`;

	const subtitle =
		interview.contextType === "ROLE"
			? "Role-based Interview"
			: "Job-based Interview";

	return (
		<div className="max-w-3xl mx-auto space-y-8">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-semibold">{title}</h1>
				<p className="text-sm text-muted-foreground">
					{subtitle} • {new Date(interview.createdAt).toLocaleString()}
				</p>
			</div>

			{/* Overall Score */}
			<Card className="p-4">
				<p className="text-sm text-muted-foreground">
					Overall Interview Score
				</p>
				<p className="text-3xl font-bold">{interview.overallScore}/5</p>
			</Card>

			{/* Questions */}
			<div className="space-y-5">
				<h2 className="text-xl font-medium">Questions & Evaluation</h2>

				{interview.questions.map((q: QuestionItem, idx: number) => (
					<Card key={q.questionId._id} className="p-4 space-y-4">
						{/* Question */}
						<div>
							<p className="font-medium">
								Q{idx + 1}. {q.questionId.questionText}
							</p>
							<p className="text-xs text-muted-foreground mt-1">
								{q.questionId.category} • Difficulty{" "}
								{q.questionId.difficulty}
							</p>
						</div>

						{/* Answer */}
						<div>
							<p className="text-sm text-muted-foreground">
								Your Answer
							</p>
							<p className="text-sm mt-1">{q.answerText || "—"}</p>
						</div>

						{/* Score */}
						{q.score !== undefined && (
							<div>
								<p className="text-sm text-muted-foreground">Score</p>
								<p className="font-semibold">{q.score}/5</p>
							</div>
						)}

						{/* Feedback */}
						{q.feedback && (
							<div className="space-y-2">
								<p className="text-sm font-medium">Feedback</p>

								<div className="grid grid-cols-2 gap-3 text-sm">
									<div>
										Correctness: <b>{q.feedback.correctness}/5</b>
									</div>
									<div>
										Depth: <b>{q.feedback.depth}/5</b>
									</div>
									<div>
										Clarity: <b>{q.feedback.clarity}/5</b>
									</div>
									<div>
										Relevance: <b>{q.feedback.relevance}/5</b>
									</div>
								</div>

								{q.feedback.improvementNotes && (
									<p className="text-sm text-muted-foreground mt-2">
										<strong>Improvement:</strong>{" "}
										{q.feedback.improvementNotes}
									</p>
								)}
							</div>
						)}
					</Card>
				))}
			</div>
		</div>
	);
}
