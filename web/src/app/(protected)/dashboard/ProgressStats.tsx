import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProgressStats({
	hasResume,
	matchCount,
	interviewCount,
}: {
	hasResume: boolean;
	matchCount: number;
	interviewCount: number;
}) {
	return (
		<Card>
			<CardHeader>
				<h2 className="text-xl font-medium">Progress Snapshot</h2>
			</CardHeader>

			<CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div>
					<p className="text-sm text-muted-foreground">Resume uploaded</p>
					<p className="text-2xl font-semibold">
						{hasResume ? "Yes" : "No"}
					</p>
				</div>

				<div>
					<p className="text-sm text-muted-foreground">
						Job matches available
					</p>
					<p className="text-2xl font-semibold">{matchCount}</p>
				</div>

				<div>
					<p className="text-sm text-muted-foreground">
						Interview practice
					</p>
					<p className="text-2xl font-semibold">{interviewCount}</p>
				</div>
			</CardContent>
		</Card>
	);
}
