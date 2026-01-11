import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthShell from "@/components/layout/AuthShell";
import SignupForm from "@/components/auth/SignupForm";

export default async function SignupPage() {
	const cookieStore = await cookies();
	const hasToken = cookieStore.get("token");
	if (hasToken) redirect("/dashboard");

	return (
		<AuthShell>
			<SignupForm />
		</AuthShell>
	);
}
