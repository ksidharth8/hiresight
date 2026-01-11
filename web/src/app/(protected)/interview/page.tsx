import Link from "next/link";
import { serverFetch } from "@/lib/api.server";

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
					{interviews.map((i: any) => (
						<Link
							key={i._id}
							href={`/interview/${i._id}`}
							className="block border rounded-lg p-4 hover:bg-muted transition"
						>
							<p className="font-medium">{i.role}</p>
							<p className="text-sm text-muted-foreground">
								{new Date(i.createdAt).toLocaleString()}
							</p>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
