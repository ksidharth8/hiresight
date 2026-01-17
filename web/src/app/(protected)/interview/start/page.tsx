import { Suspense } from "react";
import InterviewStartClient from "./InterviewStartClient";

export default function Page() {
	return (
		<Suspense fallback={<div>Loading interview...</div>}>
			<InterviewStartClient />
		</Suspense>
	);
}
