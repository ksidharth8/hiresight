"use client";

import { useState } from "react";
import { FormModal } from "@/components/admin/FormModal";
import { QuestionForm } from "@/components/admin/QuestionForm";
import { Badge } from "@/components/ui/badge";
import { clientFetch } from "@/lib/api.client";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";

export default function QuestionClient({ question }: { question: any }) {
	const [editOpen, setEditOpen] = useState(false);

	const handleDelete = async () => {
		await clientFetch(`/api/admin/questions/${question._id}`, {
			method: "DELETE",
		});
		window.location.href = "/admin/questions";
	};

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			{/* HEADER */}
			<div className="flex justify-between items-start">
				<div className="space-y-1">
					<h1 className="text-lg font-semibold">Interview Question</h1>
					<p className="text-sm text-muted-foreground">
						{question.contextType === "ROLE"
							? `Role: ${question.role}`
							: "Job-based Question"}
					</p>
				</div>

				<div className="flex items-center gap-2">
					<Badge variant="secondary">{question.category}</Badge>
					<Badge>Difficulty {question.difficulty}</Badge>
					<div className="flex items-center gap-3">
						<button
							onClick={() => setEditOpen(true)}
							className="underline text-sm"
						>
							Edit
						</button>

						<ConfirmDelete
							title="Delete Question?"
							description="This question will be permanently removed."
							onConfirm={handleDelete}
						/>
					</div>
				</div>
			</div>

			{/* QUESTION TEXT */}
			<section className="space-y-2">
				<h2 className="text-sm font-medium text-muted-foreground">
					Question
				</h2>
				<p className="leading-relaxed text-base">{question.questionText}</p>
			</section>

			{/* EXPECTED SKILLS */}
			<section className="space-y-2">
				<h2 className="text-sm font-medium text-muted-foreground">
					Expected Skills
				</h2>

				{question.expectedSkills?.length ? (
					<div className="flex flex-wrap gap-2">
						{question.expectedSkills.map((s: string) => (
							<Badge key={s} variant="outline">
								{s}
							</Badge>
						))}
					</div>
				) : (
					<p className="text-sm text-muted-foreground">
						No expected skills specified.
					</p>
				)}
			</section>

			{/* EDIT MODAL */}
			{editOpen && (
				<FormModal title="Edit Question" onClose={() => setEditOpen(false)}>
					<QuestionForm
						mode="edit"
						questionId={question._id}
						onSuccess={() => setEditOpen(false)}
					/>
				</FormModal>
			)}
		</div>
	);
}
