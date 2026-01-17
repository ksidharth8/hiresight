import { serverFetch } from "@/lib/api.server";
import JobsClient from "./JobsClient";

export default async function AdminJobsPage() {
	const jobs = await serverFetch("/api/admin/jobs");

	return <JobsClient jobs={jobs} />;
}
