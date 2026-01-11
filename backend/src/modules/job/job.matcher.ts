export const matchJob = (resumeSkills: string[], jobSkills: string[]) => {
	const matched = jobSkills.filter((skill) => resumeSkills.includes(skill));

	const score = (matched.length / jobSkills.length) * 100;

	return {
		matchedSkills: matched,
		score: Math.round(score),
	};
};
