export const scoreResume = (text: string, skills: string[]) => {
	let score = 0;

	// A. Skill coverage (40)
	const skillScore = Math.min(skills.length / 10, 1) * 40;
	score += skillScore;

	// B. Resume length (20)
	const len = text.length;
	if (len >= 1000 && len <= 3000) score += 20;
	else if (len > 3000) score += 10;
	else score += 5;

	// C. Section presence (20)
	const sections = ["experience", "education", "projects", "skills"];
	const lower = text.toLowerCase();
	const sectionHits = sections.filter((s) => lower.includes(s)).length;
	score += sectionHits * 5;

	// D. Experience keywords (20)
	const keywords = [
		"intern",
		"developer",
		"engineer",
		"internship",
		"project",
	];
	const keywordHits = keywords.filter((k) => lower.includes(k)).length;
	score += Math.min(keywordHits * 4, 20);

	return Math.round(score);
};
