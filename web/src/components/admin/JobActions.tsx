"use client";

import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { deleteJob } from "./DeleteJob";

export function JobActions({ jobId }: { jobId: string }) {
	const handleDelete = async () => {
		await deleteJob(jobId);
		window.location.href = "/admin/jobs";
	};

	return (
		<ConfirmDelete
			title="Delete Job?"
			description="This will permanently delete this job and its related questions."
			onConfirm={handleDelete}
		/>
	);
}
