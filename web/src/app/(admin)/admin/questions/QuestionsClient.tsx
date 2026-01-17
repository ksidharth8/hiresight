"use client";

import { useState } from "react";
import { QuestionCard } from "@/components/admin/QuestionCard";
import { JobSelector } from "@/components/admin/JobSelector";
import { FormModal } from "@/components/admin/FormModal";
import { QuestionForm } from "@/components/admin/QuestionForm";

export default function QuestionsClient({
	type,
	questions,
	jobs,
}: {
	type?: string;
	questions: any[];
	jobs: any[];
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="max-w-6xl mx-auto space-y-6">
			{/* HEADER */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-xl font-semibold">Questions</h1>
					<p className="text-sm text-muted-foreground">
						{type === "role"
							? "Role-based interview questions"
							: type === "job"
								? "Job-specific interview questions"
								: "All interview questions"}
					</p>
				</div>

				{/* ADD CTA */}
				{type && (
					<button
						onClick={() => setOpen(true)}
						className="underline text-sm"
					>
						+ Add Question
					</button>
				)}
			</div>

			{/* JOB FILTER */}
			{type === "job" && <JobSelector jobs={jobs} />}

			{/* QUESTIONS GRID */}
			{questions.length === 0 ? (
				<p className="text-sm text-muted-foreground">No questions found.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{questions.map((q) => (
						<QuestionCard key={q._id} question={q} />
					))}
				</div>
			)}

			{/* CREATE MODAL */}
			{open && (
				<FormModal
					title={`Create ${type === "role" ? "Role" : "Job"} Question`}
					onClose={() => setOpen(false)}
				>
					<QuestionForm
						mode="create"
						contextType={type as "role" | "job"}
						onSuccess={() => setOpen(false)}
					/>
				</FormModal>
			)}
		</div>
	);
}
