import { serverFetch } from "@/lib/api.server";
import QuestionsClient from "./QuestionsClient";

export default async function AdminQuestionsPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const params = await searchParams;

	const type = typeof params.type === "string" ? params.type : undefined;

	const jobId = typeof params.jobId === "string" ? params.jobId : undefined;

	let questions: any[] = [];
	let jobs: any[] = [];

	if (!type) {
		questions = await serverFetch("/api/admin/questions/all");
	}

	if (type === "role") {
		questions = await serverFetch("/api/admin/questions");
	}

	if (type === "job") {
		jobs = await serverFetch("/api/admin/jobs");

		if (jobId) {
			questions = await serverFetch(`/api/admin/questions/job/${jobId}`);
		}
	}

	return <QuestionsClient type={type} questions={questions} jobs={jobs} />;
}
