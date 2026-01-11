import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthShell from "@/components/layout/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
	const cookieStore = await cookies();
	const hasToken = cookieStore.get("token");
	if (hasToken) redirect("/dashboard");

	return (
		<AuthShell>
			<LoginForm />
		</AuthShell>
	);
}
