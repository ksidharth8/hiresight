import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function QuestionCard({ question }: any) {
	return (
		<Link href={`/admin/questions/${question._id}`}>
			<div className="border rounded-lg p-4 hover:bg-muted">
				<div className="flex justify-between">
					<Badge>{question.category}</Badge>
					<Badge variant="secondary">L{question.difficulty}</Badge>
				</div>

				<p className="mt-2 text-sm">
					{question.questionText.slice(0, 80)}...
				</p>

				<p className="text-xs text-muted-foreground mt-1">
					{question.contextType === "ROLE"
						? question.role
						: "Job Question"}
				</p>
			</div>
		</Link>
	);
}
