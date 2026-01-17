import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function InterviewCard() {
	return (
		<Card>
			<CardHeader>
				<h2 className="text-xl font-medium">Interview Practice</h2>
			</CardHeader>

			<CardContent className="flex gap-6 flex-wrap text-sm">
				<Link href="/interview/start?type=role" className="underline">
					Role-based Interview
				</Link>

				<Link href="/interview/start?type=job" className="underline">
					Job-based Interview
				</Link>

				<Link href="/interview" className="underline">
					View Past Interviews
				</Link>
			</CardContent>
		</Card>
	);
}
