import Link from "next/link";
import { serverFetch } from "@/lib/api.server";
import { Card } from "@/components/ui/card";

export default async function InterviewHistoryPage() {
	const interviews = await serverFetch("/api/interview");

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-semibold">Interview History</h1>
				<Link href="/interview/start" className="underline">
					Start New Interview
				</Link>
			</div>

			{interviews.length === 0 ? (
				<p className="text-muted-foreground">
					You haven't taken any interviews yet.
				</p>
			) : (
				<div className="space-y-3">
					{interviews.map((i: any) => {
						const title =
							i.contextType === "ROLE" ? i.role : i.jobId.title;

						const subtitle =
							i.contextType === "ROLE"
								? "Role-based interview"
								: "Job-based interview";

						return (
							<Link
								key={i._id}
								href={`/interview/${i._id}`}
								className="block"
							>
								<Card className="p-4 hover:bg-muted transition">
									<p className="font-medium">{title}</p>
									<p className="text-sm font-weight-[400]">
										Overall Score: {i.overallScore}
									</p>
									<p className="text-sm text-muted-foreground">
										{subtitle} •{" "}
										{new Date(i.createdAt).toLocaleString()}
									</p>
								</Card>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}
