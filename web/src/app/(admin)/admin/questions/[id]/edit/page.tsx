import { QuestionForm } from "@/components/admin/QuestionForm";

interface Props {
	params: { id: string };
}

export default async function EditQuestionPage({ params }: Props) {
	const { id } = await params;

	return <QuestionForm mode="edit" questionId={id} />;
}
