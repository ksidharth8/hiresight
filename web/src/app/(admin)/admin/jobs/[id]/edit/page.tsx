import { JobForm } from "@/components/admin/JobForm";

interface Props {
	params: { id: string };
}

export default async function EditJobPage({ params }: Props) {
	const { id } = await params;
	return <JobForm mode="edit" jobId={id} />;
}
