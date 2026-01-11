import { SKILLS } from "./skills.dictionary";

export const extractSkills = (text: string): string[] => {
	const lower = text.toLowerCase();

	return SKILLS.filter((skill) => lower.includes(skill.toLowerCase()));
};
