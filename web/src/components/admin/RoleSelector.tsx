"use client";

const ROLES = [
	"Frontend Developer",
	"Backend Developer",
	"Fullstack Developer",
	"Software Engineer",
	"Cloud Engineer",
	"App Developer",
	"AI/ML Engineer",
] as const;

export function RoleSelector({
	value,
	onChange,
}: {
	value: string;
	onChange: (role: string) => void;
}) {
	return (
		<select value={value} onChange={(e) => onChange(e.target.value)}>
			<option value="">Select Role</option>
			{ROLES.map((role) => (
				<option key={role} value={role}>
					{role}
				</option>
			))}
		</select>
	);
}
