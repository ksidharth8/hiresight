import ResumeCard from "./ResumeCard";
import JobMatchesCard from "./JobMatchesCard";
import InterviewCard from "./InterviewCard";
import ProgressStats from "./ProgressStats";
import { serverFetch } from "@/lib/api.server";

export default async function DashboardPage() {
	const resumes = await serverFetch("/api/resume");

	const bestResume =
		resumes?.length > 0
			? [...resumes].sort((a: any, b: any) => b.score - a.score)[0]
			: null;

	const matches = bestResume
		? await serverFetch(`/api/jobs/match/${bestResume._id}`)
		: [];

	const interview = await serverFetch("/api/interview");

	return (
		<div className="max-w-6xl mx-auto space-y-10">
			<header>
				<h1 className="text-2xl font-semibold">Dashboard</h1>
				<p className="text-sm text-muted-foreground">
					Your career progress at a glance
				</p>
			</header>

			<ResumeCard resume={bestResume} />

			<JobMatchesCard resume={bestResume} matches={matches || []} />

			<InterviewCard />

			<ProgressStats
				hasResume={!!bestResume}
				matchCount={matches?.length || 0}
				interviewCount={interview?.length || 0}
			/>
		</div>
	);
}
