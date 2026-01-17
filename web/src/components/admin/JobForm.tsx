"use client";

import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/api.client";
import { SkillInput } from "./SkillInput";

export function JobForm({
	mode,
	jobId,
	onSuccess,
}: {
	mode: "create" | "edit";
	jobId?: string;
	onSuccess?: () => void;
}) {
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState<any>({
		title: "",
		company: "",
		description: "",
		level: "beginner",
		requiredSkills: [],
		optionalSkills: [],
	});

	useEffect(() => {
		if (mode === "edit" && jobId) {
			clientFetch(`/api/admin/jobs/${jobId}`).then(setForm);
		}
	}, [mode, jobId]);

	const submit = async () => {
		if (!form.title || !form.company) {
			alert("Title and company are required");
			return;
		}

		if (form.requiredSkills.length === 0) {
			alert("Add at least one required skill");
			return;
		}

		setLoading(true);

		const url =
			mode === "create" ? "/api/admin/jobs" : `/api/admin/jobs/${jobId}`;

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
			{/* BASIC INFO */}
			<div className="space-y-4">
				<h3 className="text-sm font-medium text-muted-foreground">
					Basic Information
				</h3>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="space-y-1">
						<label className="text-sm font-medium">Job Title</label>
						<input
							className="w-full border rounded px-3 py-2"
							value={form.title}
							onChange={(e) =>
								setForm({ ...form, title: e.target.value })
							}
						/>
					</div>

					<div className="space-y-1">
						<label className="text-sm font-medium">Company</label>
						<input
							className="w-full border rounded px-3 py-2"
							value={form.company}
							onChange={(e) =>
								setForm({ ...form, company: e.target.value })
							}
						/>
					</div>
				</div>
			</div>

			{/* DESCRIPTION */}
			<div className="space-y-1">
				<label className="text-sm font-medium">Description</label>
				<textarea
					rows={4}
					className="w-full border rounded px-3 py-2"
					value={form.description}
					onChange={(e) =>
						setForm({ ...form, description: e.target.value })
					}
				/>
			</div>

			{/* REQUIRED SKILLS */}
			<div className="space-y-2">
				<h3 className="text-sm font-medium text-muted-foreground">
					Required Skills
				</h3>

				<SkillInput
					skills={form.requiredSkills}
					setSkills={(skills: any[]) =>
						setForm({ ...form, requiredSkills: skills })
					}
				/>
			</div>

			{/* OPTIONAL SKILLS */}
			<div className="space-y-2">
				<h3 className="text-sm font-medium text-muted-foreground">
					Optional Skills
				</h3>

				<input
					className="w-full border rounded px-3 py-2"
					placeholder="Comma separated skills (e.g. Docker, AWS)"
					value={form.optionalSkills.join(", ")}
					onChange={(e) =>
						setForm({
							...form,
							optionalSkills: e.target.value
								.split(",")
								.map((s) => s.trim())
								.filter(Boolean),
						})
					}
				/>
			</div>

			{/* META */}
			<div className="space-y-1">
				<label className="text-sm font-medium">Level</label>
				<select
					className="w-full border rounded px-3 py-2"
					value={form.level}
					onChange={(e) => setForm({ ...form, level: e.target.value })}
				>
					<option value="beginner">Beginner</option>
					<option value="intermediate">Intermediate</option>
					<option value="advanced">Advanced</option>
				</select>
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
							? "Create Job"
							: "Update Job"}
				</button>
			</div>
		</div>
	);
}
