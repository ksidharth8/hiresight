import { serverFetch } from "@/lib/api.server";
import QuestionClient from "./QuestionClient";

interface Props {
	params: { id: string };
}

export default async function QuestionDetailPage({ params }: Props) {
	const { id } = await params;
	const question = await serverFetch(`/api/admin/questions/${id}`);

	return <QuestionClient question={question} />;
}
