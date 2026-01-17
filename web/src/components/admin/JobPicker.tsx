"use client";

import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/api.client";

export function JobPicker({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) {
	const [jobs, setJobs] = useState<any[]>([]);

	useEffect(() => {
		clientFetch("/api/admin/jobs").then(setJobs);
	}, []);

	return (
		<select value={value} onChange={(e) => onChange(e.target.value)}>
			<option value="">Select Job</option>
			{jobs.map((j) => (
				<option key={j._id} value={j._id}>
					{j.title}
				</option>
			))}
		</select>
	);
}
