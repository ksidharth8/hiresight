"use client";

import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/api.client";
import { RoleSelector } from "@/components/admin/RoleSelector";
import { JobPicker } from "@/components/admin/JobPicker";

export function QuestionForm({
	mode,
	contextType,
	questionId,
	onSuccess,
}: {
	mode: "create" | "edit";
	contextType?: "role" | "job";
	questionId?: string;
	onSuccess?: () => void;
}) {
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState<any>({
		contextType: contextType?.toUpperCase(),
		role: "",
		jobId: "",
		category: "DSA",
		questionText: "",
		difficulty: 2,
	});

	useEffect(() => {
		if (mode === "edit" && questionId) {
			clientFetch(`/api/admin/questions/${questionId}`).then(setForm);
		}
	}, [mode, questionId]);

	const submit = async () => {
		if (!form.questionText.trim()) {
			alert("Question text is required");
			return;
		}

		setLoading(true);

		const url =
			mode === "create"
				? form.contextType === "ROLE"
					? "/api/admin/questions"
					: `/api/admin/questions/job/${form.jobId}`
				: `/api/admin/questions/${questionId}`;

		const method = mode === "create" ? "POST" : "PUT";

		await clientFetch(url, {
			method,
			body: JSON.stringify(form),
		});

		setLoading(false);
		onSuccess?.();
	};

	return (
		<div className="space-y-6">
			{/* CONTEXT */}
			<div className="space-y-2">
				<h3 className="text-sm font-medium text-muted-foreground">
					Question Context
				</h3>

				{form.contextType === "ROLE" && (
					<RoleSelector
						value={form.role}
						onChange={(role) => setForm({ ...form, role })}
					/>
				)}

				{form.contextType === "JOB" && (
					<JobPicker
						value={form.jobId}
						onChange={(jobId) => setForm({ ...form, jobId })}
					/>
				)}
			</div>

			{/* QUESTION */}
			<div className="space-y-1">
				<label className="text-sm font-medium">Question Text</label>
				<textarea
					rows={4}
					className="w-full border rounded px-3 py-2"
					value={form.questionText}
					onChange={(e) =>
						setForm({
							...form,
							questionText: e.target.value,
						})
					}
				/>
			</div>

			{/* META */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div className="space-y-1">
					<label className="text-sm font-medium">Category</label>
					<select
						className="w-full border rounded px-3 py-2"
						value={form.category}
						onChange={(e) =>
							setForm({
								...form,
								category: e.target.value,
							})
						}
					>
						{[
							"DSA",
							"Core-CS",
							"Role-Specific",
							"Behavioral",
							"System-Design",
						].map((c) => (
							<option key={c}>{c}</option>
						))}
					</select>
				</div>

				<div className="space-y-1">
					<label className="text-sm font-medium">Difficulty</label>
					<select
						className="w-full border rounded px-3 py-2"
						value={form.difficulty}
						onChange={(e) =>
							setForm({
								...form,
								difficulty: Number(e.target.value),
							})
						}
					>
						<option value={1}>Easy</option>
						<option value={2}>Medium</option>
						<option value={3}>Hard</option>
					</select>
				</div>
			</div>

			{/* ACTION */}
			<div className="flex justify-end">
				<button
					onClick={submit}
					disabled={loading}
					className="px-5 py-2 rounded bg-black text-white"
				>
					{loading
						? "Saving..."
						: mode === "create"
							? "Create Question"
							: "Update Question"}
				</button>
			</div>
		</div>
	);
}
