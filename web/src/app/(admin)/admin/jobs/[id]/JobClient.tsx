"use client";

import { useState } from "react";
import { FormModal } from "@/components/admin/FormModal";
import { JobForm } from "@/components/admin/JobForm";
import { Badge } from "@/components/ui/badge";
import { clientFetch } from "@/lib/api.client";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";

export default function JobClient({ job }: { job: any }) {
	const [editOpen, setEditOpen] = useState(false);

	const handleDelete = async () => {
		await clientFetch(`/api/admin/jobs/${job._id}`, {
			method: "DELETE",
		});
		window.location.href = "/admin/jobs";
	};

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			{/* HEADER */}
			<div className="flex justify-between items-start">
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold">{job.title}</h1>
					<p className="text-muted-foreground">{job.company}</p>
				</div>

				<div className="flex items-center gap-2">
					<Badge variant="secondary">{job.level}</Badge>
					<div className="flex items-center gap-3">
						<button
							onClick={() => setEditOpen(true)}
							className="underline text-sm"
						>
							Edit
						</button>

						<ConfirmDelete
							title="Delete Job?"
							description="This will permanently delete this job and all related questions."
							onConfirm={handleDelete}
						/>
					</div>
				</div>
			</div>

			{/* DESCRIPTION */}
			<section className="space-y-2">
				<h2 className="text-sm font-medium text-muted-foreground">
					Job Description
				</h2>
				<p className="leading-relaxed">
					{job.description || "No description provided."}
				</p>
			</section>

			{/* REQUIRED SKILLS */}
			<section className="space-y-2">
				<h2 className="text-sm font-medium text-muted-foreground">
					Required Skills
				</h2>

				{job.requiredSkills.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No required skills defined.
					</p>
				) : (
					<div className="flex flex-wrap gap-2">
						{job.requiredSkills.map((s: any) => (
							<Badge key={s.name} variant="outline">
								{s.name} • weight {s.weight}
							</Badge>
						))}
					</div>
				)}
			</section>

			{/* OPTIONAL SKILLS */}
			<section className="space-y-2">
				<h2 className="text-sm font-medium text-muted-foreground">
					Optional Skills
				</h2>

				{job.optionalSkills.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No optional skills listed.
					</p>
				) : (
					<div className="flex flex-wrap gap-2">
						{job.optionalSkills.map((s: string) => (
							<Badge key={s} variant="secondary">
								{s}
							</Badge>
						))}
					</div>
				)}
			</section>

			{/* EDIT MODAL */}
			{editOpen && (
				<FormModal title="Edit Job" onClose={() => setEditOpen(false)}>
					<JobForm
						mode="edit"
						jobId={job._id}
						onSuccess={() => setEditOpen(false)}
					/>
				</FormModal>
			)}
		</div>
	);
}
