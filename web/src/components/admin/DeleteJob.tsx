import { clientFetch } from "@/lib/api.client";

export async function deleteJob(jobId: string) {
	await clientFetch(`/api/admin/jobs/${jobId}`, {
		method: "DELETE",
	});
}
