"use client";

export function SkillInput({ skills, setSkills }: any) {
	const addSkill = () => setSkills([...skills, { name: "", weight: 3 }]);

	const update = (i: number, key: string, value: any) => {
		const copy = [...skills];
		copy[i][key] = value;
		setSkills(copy);
	};

	const remove = (i: number) =>
		setSkills(skills.filter((_: any, idx: number) => idx !== i));

	return (
		<div className="space-y-2">
			{skills.map((s: any, i: number) => (
				<div key={i} className="flex gap-2">
					<input
						placeholder="skill"
						value={s.name}
						onChange={(e) => update(i, "name", e.target.value)}
					/>
					<select
						value={s.weight}
						onChange={(e) => update(i, "weight", Number(e.target.value))}
					>
						{[1, 2, 3, 4, 5].map((w) => (
							<option key={w}>{w}</option>
						))}
					</select>
					<button onClick={() => remove(i)}>✕</button>
				</div>
			))}

			<button onClick={addSkill}>+ Add Skill</button>
		</div>
	);
}
