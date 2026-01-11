import { SKILLS } from "./skills.dictionary.js";

export const extractSkills = (text: string): string[] => {
	const lower = text.toLowerCase();

	return SKILLS.filter((skill) => lower.includes(skill.toLowerCase()));
};
