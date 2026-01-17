"use client";

import { useState } from "react";
import { JobCard } from "@/components/admin/JobCard";
import { FormModal } from "@/components/admin/FormModal";
import { JobForm } from "@/components/admin/JobForm";

export default function JobsClient({ jobs }: { jobs: any[] }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="max-w-6xl mx-auto space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-semibold">Jobs</h1>
				<button onClick={() => setOpen(true)} className="underline text-sm">
					+ Add Job
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{jobs.map((job) => (
					<JobCard key={job._id} job={job} />
				))}
			</div>

			{open && (
				<FormModal title="Create Job" onClose={() => setOpen(false)}>
					<JobForm mode="create" onSuccess={() => setOpen(false)} />
				</FormModal>
			)}
		</div>
	);
}
