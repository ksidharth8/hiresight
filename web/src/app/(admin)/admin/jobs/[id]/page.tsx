import { serverFetch } from "@/lib/api.server";
import JobClient from "./JobClient";

interface Props {
	params: { id: string };
}

export default async function JobDetailPage({ params }: Props) {
	const { id } = await params;
	const job = await serverFetch(`/api/admin/jobs/${id}`);

	return <JobClient job={job} />;
}
