import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function QuestionsCard({ questions }: { questions: any[] }) {
	const roleQuestions = questions.filter((q) => q.contextType === "ROLE");
	const jobQuestions = questions.filter((q) => q.contextType === "JOB");

	return (
		<Card>
			<CardHeader>
				<h2 className="text-xl font-medium">Interview Questions</h2>
			</CardHeader>

			<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{/* Role-based */}
				<div className="space-y-2">
					<p className="font-medium">Role-based Questions</p>
					<p className="text-sm text-muted-foreground">
						{roleQuestions.length} questions
					</p>
					<Link
						href="/admin/questions?type=role"
						className="underline text-sm"
					>
						Manage Role Questions
					</Link>
				</div>

				{/* Job-based */}
				<div className="space-y-2">
					<p className="font-medium">Job-based Questions</p>
					<p className="text-sm text-muted-foreground">
						{jobQuestions.length} questions
					</p>
					<Link
						href="/admin/questions?type=job"
						className="underline text-sm"
					>
						Manage Job Questions
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
