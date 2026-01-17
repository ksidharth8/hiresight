import { serverFetch } from "@/lib/api.server";
import JobsCard from "../../../components/admin/JobsCard";
import QuestionsCard from "../../../components/admin/QuestionsCard";

export default async function AdminDashboard() {
	const jobs = await serverFetch("/api/admin/jobs");
	const questions = await serverFetch("/api/admin/questions/all");

	return (
		<div className="max-w-6xl mx-auto space-y-10">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-semibold">Admin Dashboard</h1>
				<p className="text-sm text-muted-foreground">
					Manage jobs and interview questions
				</p>
			</div>

			<JobsCard jobs={jobs.slice(0, 4)} />

			<QuestionsCard questions={questions} />
		</div>
	);
}
