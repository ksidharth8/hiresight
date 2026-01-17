"use client";

import { useSearchParams } from "next/navigation";
import { QuestionForm } from "@/components/admin/QuestionForm";

export default function NewQuestionPage() {
	const params = useSearchParams();
	const type = params.get("type");

	if (!type) return <p>Invalid question type</p>;

	return <QuestionForm mode="create" contextType={type as "role" | "job"} />;
}
