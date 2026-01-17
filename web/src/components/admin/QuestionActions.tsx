"use client";

import { ConfirmDelete } from "./ConfirmDelete";
import { clientFetch } from "@/lib/api.client";

export function QuestionActions({ questionId }: { questionId: string }) {
	const del = async () => {
		await clientFetch(`/api/admin/questions/${questionId}`, {
			method: "DELETE",
		});
		window.location.href = "/admin/questions";
	};

	return <ConfirmDelete title="Delete Question?" onConfirm={del} />;
}
