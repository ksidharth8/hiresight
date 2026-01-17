"use client";

import { useRouter } from "next/navigation";

export function JobSelector({ jobs }: any) {
	const router = useRouter();

	return (
		<select
			onChange={(e) =>
				router.push(`/admin/questions?type=job&jobId=${e.target.value}`)
			}
		>
			<option value="">Select Job</option>
			{jobs.map((j: any) => (
				<option key={j._id} value={j._id}>
					{j.title}
				</option>
			))}
		</select>
	);
}
